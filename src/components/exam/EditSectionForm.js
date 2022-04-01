import React from 'react';
import Request from '../services/Request';
import Flash from '../services/Flash';
import $ from 'jquery'

class EditSectionForm extends React.Component {
    
    constructor(props) {
        super(props);
        let tt = 1;
        if(this.props.sectionDetails.setQuestionTimer == '1') {
            tt = 2;
        }
        this.state = {
            questionNavigation: this.props.sectionDetails.questionNavigation,
            shuffleQuestions: this.props.sectionDetails.shuffleQuestions,
            timerType: tt
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
    
        this.setState({
            [name]: value
        });
    };

    viewTimerDurationBlock = () => {
        document.getElementById('time-duration-block').style.display = 'flex';
    }

    hideTimerDurationBlock = () => {
        document.getElementById('time-duration-block').style.display = 'none';
    }

    resetForm = () => {
        let form = document.getElementById('create-section-form');
        form.reset();
    }

    updateSection = (e) => {
        e.preventDefault();
        let url = "http://localhost:8080/QuizWit/updateSection";

        let data = $('#create-section-form').serialize();

        Request.post(url, data)
        .then((res) => {
            console.log(res);
            this.populateResponse(res);
        })
        
        console.log('submitted');
    }

    populateResponse = (res) => {
        let responseBlock = document.getElementById('create-section-form').getElementsByClassName('response');
        if(res.error) {
            Flash.message(res.error, 'bg-danger');
        }
        if(res.success) {
            this.resetForm();
            Flash.message(res.success, 'bg-success');
            document.getElementById('view-exam-nav-link').click();
        }
        else {
            let log = res.errorLog;
            let icon = '<i class="fas fa-exclamation-circle mr-5"></i>';
            if(log.examId) {
                Flash.message(log.examId, 'bg-danger');
            }
            responseBlock[0].innerHTML = (log.title ? icon + log.title : '');
            responseBlock[1].innerHTML = (log.description ? icon + log.description : '');

            responseBlock[2].innerHTML = (log.questionNavigation ? icon + log.questionNavigation: '');
            responseBlock[3].innerHTML = (log.timerType ? icon + log.timerType: '' );
            responseBlock[4].innerHTML = (log.timerDuration ? icon + log.timerDuration: '' );
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
            <form action="" className='pb-10' id="create-section-form" onSubmit={this.updateSection}>
                <input type="hidden" defaultValue={this.props.sectionId} name="sectionId"/>
                <div className="input-block">
                    <div className="input-custom">
                        <input type="text" name="title" defaultValue={this.props.sectionDetails.title} />
                        <label>Title</label>
                        <div className="response"></div>
                    </div>
                </div>
                <div className="input-block">
                    <div className="input-custom">
                        <textarea type="text" name="description" rows="6" defaultValue={this.props.sectionDetails.description}></textarea>
                        <label>Description</label>
                        <div className="response"></div>
                    </div>
                </div>
                <div className="input-block">
                    <div className="customized-radio-sticky">
                        <label>Question Navigation</label>
                        <div>
                            <label>
                                <input type="radio" name="questionNavigation" value="1" checked={this.state.questionNavigation == '1' ? true : false} onChange={this.handleChange} />
                                <span>On</span>
                            </label>
                            <label>
                                <input type="radio" name="questionNavigation" value="0" checked={this.state.questionNavigation == '0' ? true : false} onChange={this.handleChange} />
                                <span>Off</span>
                            </label>
                        </div>
                        <div className="response"></div>
                    </div>
                    <div className="customized-radio-sticky">
                        <label>Shuffle Question</label>
                        <div>
                            <label>
                                <input type="radio" name="shuffleQuestions" value="1" checked={this.state.shuffleQuestions == '1' ? true : false} onChange={this.handleChange} />
                                <span>On</span>
                            </label>
                            <label>
                                <input type="radio" name="shuffleQuestions" value="0" checked={this.state.shuffleQuestions == '0' ? true : false} onChange={this.handleChange} />
                                <span>Off</span>
                            </label>
                        </div>
                        <div className="response"></div>
                    </div>
                </div>
                <div className='input-block'>
                    <div className="customized-radio-sticky">
                        <label>Timer Type</label>
                        <div>
                            <label onClick={this.viewTimerDurationBlock}>
                                <input type="radio" name="timerType" value="1" checked={this.state.timerType == '1' ? true : false} onChange={this.handleChange} />
                                <span>Single timer for entire section</span>
                            </label>
                            <label onClick={this.hideTimerDurationBlock}>
                                <input type="radio" name="timerType" value="2" checked={this.state.timerType == '2' ? true : false} onChange={this.handleChange} />
                                <span>Question wise timer</span>
                            </label>
                        </div>
                        <div className="response"></div>
                    </div>
                </div>
                <div className='input-block' id='time-duration-block'>
                    <div className="customized-radio-sticky">
                        <label>Time Duration</label>
                        <div>
                            <label>
                                <input type="radio" name="timeDuration" value="0" />
                                <span>No time limit</span>
                            </label>
                            <label>
                                <input type="radio" name="timeDuration" value="900" />
                                <span>15 Minutes</span>
                            </label>
                            <label>
                                <input type="radio" name="timeDuration" value="1800" />
                                <span>30 Minutes</span>
                            </label>
                            <label>
                                <input type="radio" name="timeDuration" value="2700" />
                                <span>45 Minutes</span>
                            </label>
                            <label>
                                <input type="radio" name="timeDuration" value="3600" />
                                <span>1 Hour</span>
                            </label>
                            <label>
                                <input type="radio" name="timeDuration" value="7200" />
                                <span>2 Hours</span>
                            </label>
                            <label>
                                <input type="radio" name="timeDuration" value="10800" />
                                <span>3 Hours</span>
                            </label>
                        </div>
                        <div className="response"></div>
                    </div>
                </div>
                <div className='flex-row jc-sb'>
                    <div className='btn btn-fade btn-small' onClick={this.resetForm}>Reset</div>
                    <button className='btn btn-primary btn-small'>Add</button>
                </div>
            </form>
            </>
        )
    }
}

export default EditSectionForm;