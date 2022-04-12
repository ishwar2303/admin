import React from 'react';
import Request from '../services/Request';
import Flash from '../services/Flash';
import $ from 'jquery'
import TimeToString from '../services/TimeToString';

class EditSectionForm extends React.Component {
    
    constructor(props) {
        super(props);
        let tt = 0;
        if(this.props.sectionDetails.setQuestionTimer == '1')
            tt = 2;
        
        else if(this.props.sectionDetails.setSectionTimer == '1')
            tt = 1;
        let duration = null;
        if(tt == 1)
            duration = this.props.sectionDetails.timeDuration;
        this.state = {
            questionNavigation: this.props.sectionDetails.questionNavigation,
            shuffleQuestions: this.props.sectionDetails.shuffleQuestions,
            timerType: tt,
            timeDuration: duration
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
        let form = document.getElementById('update-section-form');
        form.reset();
    }

    updateSection = (e) => {
        e.preventDefault();
        let url = "http://localhost:8080/QuizWit/UpdateSectionDetails";

        let data = $('#update-section-form').serialize();

        Request.post(url, data)
        .then((res) => {
            console.log(res);
            this.populateResponse(res);
        })
        
        console.log('submitted');
    }

    populateResponse = (res) => {
        let responseBlock = document.getElementById('update-section-form').getElementsByClassName('response');
        if(res.error) {
            Flash.message(res.error, 'bg-danger');
        }
        if(res.success) {
            localStorage.setItem('SectionUpdated', this.props.examId);
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
            responseBlock[3].innerHTML = (log.shuffleQuestions ? icon + log.shuffleQuestions: '');
            responseBlock[4].innerHTML = (log.timerType ? icon + log.timerType: '' );
            responseBlock[5].innerHTML = (log.timerDuration ? icon + log.timerDuration: '' );
        }
    }
    resetTimeSlots = () => {
        let slots = document.getElementsByName('timeDurationSlots');
        for(let i=0; i<slots.length; i++) {
            slots[i].checked = false;
        }
    }
    convertTime = (e) => {
        let el = e.target;
        let value = el.value;
        let response = el.nextElementSibling;
        let convertedTime = (new TimeToString(parseInt(value))).convert();
        response.innerHTML = convertedTime;
    }


    pickTimeFromSlots = () => {
        let slots = document.getElementsByName('timeDurationSlots');
        for(let i=0; i<slots.length; i++) {
            slots[i].addEventListener('click', (e) => {
                document.getElementsByName('timeDuration')[0].value = e.target.value;
                document.getElementById('time-duration').innerText = (new TimeToString(e.target.value)).convert();
            })
        }
    }
    resetTimeSlots = () => {
        let slots = document.getElementsByName('timeDurationSlots');
        for(let i=0; i<slots.length; i++) {
            slots[i].checked = false;
        }
    }
    fetchSetSectionTimer = () => {
        let url = "http://localhost:8080/QuizWit/SetSectionTimer?examId=";
        url += this.props.examId;
        Request.get(url)
        .then((res) => {
            console.log(res);
            if(res.success) {
                
                if(res.setSectionTimer) 
                    document.getElementById('set-section-timer').style.display = 'block';
                else document.getElementById('set-section-timer').style.display = 'none';
            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        })
    }
    componentDidMount() {
        if(this.state.timerType == 1)
            this.viewTimerDurationBlock();
        this.pickTimeFromSlots();
        this.fetchSetSectionTimer();
    }

    render() {
        return (
            <>
            <form action="" className='pb-10' id="update-section-form" onSubmit={this.updateSection}>
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
                <div id='set-section-timer'>
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
                    <div id='time-duration-block' className='flex-col'>
                        <div className='input-block'>
                            <div className="customized-radio-sticky">
                                <label>Choose time duration from slots</label>
                                <div>
                                    <label>
                                        <input type="radio" name="timeDurationSlots" value="900" checked={this.state.timeDurationSlots == '900' ? true : false} onChange={this.handleChange}/>
                                        <span>15 Minutes</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="timeDurationSlots" value="1800" checked={this.state.timeDurationSlots == '1800' ? true : false} onChange={this.handleChange}/>
                                        <span>30 Minutes</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="timeDurationSlots" value="2700"  checked={this.state.timeDurationSlots == '2700' ? true : false} onChange={this.handleChange}/>
                                        <span>45 Minutes</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="timeDurationSlots" value="3600" checked={this.state.timeDurationSlots == '3600' ? true : false} onChange={this.handleChange}/>
                                        <span>1 Hour</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="timeDurationSlots" value="7200" checked={this.state.timeDurationSlots == '7200' ? true : false} onChange={this.handleChange}/>
                                        <span>2 Hours</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="timeDurationSlots" value="10800" checked={this.state.timeDurationSlots == '10800' ? true : false} onChange={this.handleChange}/>
                                        <span>3 Hours</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="input-block">
                            <div className="input-custom">
                                <input type="number" name="timeDuration" defaultValue={this.state.timeDuration} onInput={this.resetTimeSlots} onChange={this.convertTime} />
                                <div className='primary converted-time' id='time-duration'>{(new TimeToString(this.state.timeDuration)).convert()}</div>
                                <label>Time Duration</label>
                                <div className="response"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-row jc-sb'>
                    <div id='reset-form-btn'  className='btn btn-fade btn-small hidden' onClick={this.resetForm}>Reset</div>
                    <button id='update-form-btn' className='btn btn-primary btn-small hidden'>Update</button>
                </div>
            </form>
            </>
        )
    }
}

export default EditSectionForm;