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
        let question = localStorage.getItem('questionStringFromSimpleMde');
        document.getElementById('question').defaultValue = question;
        this.setState({
            question: question
        })
        let url = "http://localhost:8080/QuizWit/TrueFalseQuestion";
        let data = $('#question-form').serialize();
        Request.post(url,data)
        .then((res) => {
            this.populateResponse(res);
        })
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
            responseBlock[1].innerHTML = (log.answer ? icon + log.answer : '');

            responseBlock[2].innerHTML = (log.score ? icon + log.score: '');
            responseBlock[3].innerHTML = (log.negativeMarking ? icon + log.negativeMarking: '');
            responseBlock[4].innerHTML = (log.timeDuration ? icon + log.timeDuration: '');
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
        for(let i=0; i<slots.length; i++) {
            slots[i].addEventListener('click', (e) => {
                document.getElementsByName('timeDuration')[0].value = e.target.value;
            })
        }
    }


    resetForm = () => {
        this.setState({
            question: ""
        })
        document.getElementById('question-form').reset();
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
                        value={this.state.question}
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
                            <div className="response"></div>
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
                                <input type="number" name="timeDuration" onInput={this.resetTimeSlots} />
                                <label>Time Duration</label>
                                <div className="response"></div>
                            </div>
                        </div>
                        <div className='hidden' id='reset-question-form' onClick={this.resetForm}>reset</div>
                        <input className='hidden' type="submit" id='submit-question-form' />
                        
                    </>

                }
            </form>
        )
    }
}

export default TrueFalseTemplate;