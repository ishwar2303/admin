import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from 'react-markdown';
import "easymde/dist/easymde.min.css";
import Loader from '../../util/Loader';
import $ from 'jquery';
import Request from '../../services/Request';
import Flash from '../../services/Flash';

class TrueFalseTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            load: false
        }
    }

    addQuestion = (e) => {
        e.preventDefault();
        document.getElementById('question').defaultValue = localStorage.getItem('questionStringFromSimpleMde');
        let url = "http://localhost:8080/QuizWit/TrueFalseQuestion";
        let data = $('#question-form').serialize();
        Request.post(url,data)
        .then((res) => {
            this.populateResponse(res);
        })
    }

    resetForm = () => {

    }

    populateResponse = (res) => {
        console.log(res);
        let responseBlock = document.getElementById('question-form').getElementsByClassName('response');
        if(res.error) {
            Flash.message(res.error, 'bg-danger');
        }
        if(res.success) {
            this.resetForm();
            Flash.message(res.success, 'bg-success');
        }
        else {
            let log = res.errorLog;
            let icon = '<i class="fas fa-exclamation-circle mr-5"></i>';
            responseBlock[0].innerHTML = (log.question ? icon + log.question : '');
            // responseBlock[1].innerHTML = (log.description ? icon + log.description : '');

            // responseBlock[2].innerHTML = (log.difficultyLevel ? icon + log.difficultyLevel: '');
            // responseBlock[3].innerHTML = (log.visibility ? icon + log.visibility: '');
            // responseBlock[4].innerHTML = (log.sectionNavigation ? icon + log.sectionNavigation: '');
            // responseBlock[5].innerHTML = (log.startTime ? icon + log.startTime: '' );
            // responseBlock[6].innerHTML = (log.windowTime ? icon + log.windowTime: '' );
            // responseBlock[7].innerHTML = (log.numberOfAttempts ? icon + log.numberOfAttempts: '' );
            // responseBlock[8].innerHTML = (log.timerType ? icon + log.timerType: '' );
            // responseBlock[9].innerHTML = (log.timerDuration ? icon + log.timerDuration: '' );
            // responseBlock[10].innerHTML = (log.instructions ? icon + log.instructions: '' );
        }
    }

    componentDidMount = () => {
        this.setState({
            load: true
        })
        this.pickTimeFromSlots();
    }
    onChange = (defaultValue) => {
        localStorage.setItem('questionStringFromSimpleMde', defaultValue);
    }

    pickTimeFromSlots = () => {
        let slots = document.getElementsByName('timeDurationSlots');
        console.log(slots)
        for(let i=0; i<slots.length; i++) {
            slots[i].addEventListener('click', (e) => {
                document.getElementsByName('timeDuration')[0].defaultValue = e.target.defaultValue;
            })
        }
    }


    resetTimeSlots = () => {
        let slots = document.getElementsByName('timeDurationSlots');
        for(let i=0; i<slots.length; i++) {
            slots[i].checked = false;
        }
    }

    render() {
        return (
            <form id='question-form' className='pb-10' onSubmit={this.addQuestion}>
                {
                    !this.state.load &&
                    <Loader />
                }
                {
                    this.state.load &&
                    <>
                    <div className='question-container'>
                        <h3 className='template-headings'>Question</h3>
                    </div>
                    <SimpleMDE 
                        defaultValue={this.state.question}
                        onChange={this.onChange}
                        options={{
                            previewRender(plainText) {
                                return ReactDOMServer.renderToString(<ReactMarkdown>{plainText}</ReactMarkdown>);
                            }
                        }}
                    />
                    <div className="response flex-row jc-e"></div>
                    </>
                
                }
                <input className='hidden' type="number" name="categoryId" defaultValue={3} />
                <input className='hidden' type="number" name="sectionId" defaultValue={this.props.sectionId} />
                <textarea className='hidden' name="question" rows="10" id='question'></textarea>
                {
                    
                    <>
                        <div className='true-false-option'>
                            <h3 className='template-headings'>Select Answer</h3>
                            <div>
                                <label>
                                    <input type="radio" name='trueFalseAnswer' defaultValue="1" />
                                    <span>True</span>
                                </label>
                                <label>
                                    <input type="radio" name='trueFalseAnswer' defaultValue="0"/>
                                    <span>False</span>
                                </label>
                            </div>
                        </div>
                        
                        <div className="input-block">
                            <div className="input-custom">
                                <input type="number" name="score" defaultChecked={true} />
                                <label>Score</label>
                                <div className="response"></div>
                            </div>
                            <div className="input-custom">
                                <input type="number" name="negativeMarking" defaultChecked={true}/>
                                <label>Negative Marking</label>
                                <div className="response"></div>
                            </div>
                        </div>
                        <div className="input-block">
                            <div className="input-custom">
                                <textarea type="text" name="explanation" rows="6"></textarea>
                                <label>Explanation</label>
                                <div className="response"></div>
                            </div>
                        </div>
                        <div className='input-block'>
                            <div className="customized-radio-sticky">
                                <label>Choose time duration from slots</label>
                                <div>
                                    <label>
                                        <input type="radio" name="timeDurationSlots" defaultValue="0" />
                                        <span>No time limit</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="timeDurationSlots" defaultValue="10" />
                                        <span>10 Seconds</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="timeDurationSlots" defaultValue="20" />
                                        <span>20 Seconds</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="timeDurationSlots" defaultValue="30" />
                                        <span>30 Seconds</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="timeDurationSlots" defaultValue="60" />
                                        <span>1 Minute</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="timeDurationSlots" defaultValue="120" />
                                        <span>2 Minutes</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="timeDurationSlots" defaultValue="120" />
                                        <span>3 Minutes</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="timeDurationSlots" defaultValue="300" />
                                        <span>5 Minutes</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="input-block">
                            <div className="input-custom">
                                <input type="number" name="timeDuration" onInput={this.resetTimeSlots} defaultChecked={true} />
                                <label>Time Duration</label>
                                <div className="response"></div>
                            </div>
                        </div>
                        <input className='hidden' type="submit" id='submit-question-form' />
                    </>

                }
            </form>
        )
    }
}

export default TrueFalseTemplate;