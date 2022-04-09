import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from 'react-markdown';
import "easymde/dist/easymde.min.css";
import Loader from '../../Loader';
import $ from 'jquery';
import Request from '../../../services/Request';
import Flash from '../../../services/Flash';
import TimeToString from '../../../services/TimeToString';

class TrueFalseTemplateEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionDetails: this.props.questionDetails,
            trueFalseAnswer: this.props.questionDetails.answerDetails.answer,
            load: false
        }
        localStorage.setItem("questionStringFromSimpleMde", this.state.questionDetails.question);
    }

    handleChange = e => {
        const { name, value } = e.target;
    
        this.setState({
            [name]: value
        });
    }


    updateQuestion = (e) => {
        e.preventDefault();
        console.log('update true false question');
        let url = "http://localhost:8080/QuizWit/UpdateQuestion";
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
            this.props.fetchQuestion();
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
        localStorage.setItem('questionStringFromSimpleMde', '');
    }
    onChange = (defaultValue) => {
        localStorage.setItem('questionStringFromSimpleMde', defaultValue);
        document.getElementById('question').value = defaultValue;
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

    resetForm = () => {
        console.log('reset called')
        this.setState({
            question: this.state.questionDetails.question,
            trueFalseAnswer: this.state.questionDetails.answerDetails.answer
        })
        document.getElementById('question-form').reset();
        let responseBlock = document.getElementById('question-form').getElementsByClassName('response');
        for(let i=0; i<responseBlock.length; i++)
            responseBlock[i].innerHTML = '';
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


    render() {
        return (
            <form id='question-form' className='pb-10' onSubmit={this.updateQuestion}>
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
                        value={this.state.questionDetails.question}
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
                <input className='hidden' type="number" name="questionId" defaultValue={this.state.questionDetails.questionId} />
                <textarea className='hidden' name="question" rows="10" id='question' value={this.state.questionDetails.question}></textarea>
                {
                    
                    <>
                        <div className='true-false-option'>
                            <h3 className='template-headings'>Select Answer</h3>
                            <div>
                                <label>
                                    <input type="radio" name='trueFalseAnswer' value="1" checked={this.state.trueFalseAnswer == '1' ? true : false} onChange={this.handleChange} />
                                    <span>True</span>
                                </label>
                                <label>
                                    <input type="radio" name='trueFalseAnswer' value="0" checked={this.state.trueFalseAnswer == '0' ? true : false} onChange={this.handleChange} />
                                    <span>False</span>
                                </label>
                            </div>
                            <div className="response"></div>
                        </div>

                        
                        <div className="input-block">
                            <div className="input-custom">
                                <input type="number" name="score" defaultValue={parseInt(this.state.questionDetails.score)} />
                                <label>Score</label>
                                <div className="response"></div>
                            </div>
                            <div className="input-custom">
                                <input type="number" name="negativeMarking" defaultValue={parseInt(this.state.questionDetails.negative)}/>
                                <label>Negative Marking</label>
                                <div className="response"></div>
                            </div>
                        </div>
                        <div className="input-block">
                            <div className="input-custom">
                                <textarea type="text" name="explanation" rows="6" defaultValue={this.state.questionDetails.explanation}></textarea>
                                <label>Explanation</label>  
                            </div>
                        </div>
                        <div className='input-block'>
                            <div className="customized-radio-sticky">
                                <label>Choose time duration from slots</label>
                                <div>
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
                                <input type="number" name="timeDuration" defaultValue={parseInt(this.state.questionDetails.timeDuration)} onInput={this.resetTimeSlots} onChange={this.convertTime} />
                                <div className='primary converted-time' id='time-duration'>{(new TimeToString(this.state.questionDetails.timeDuration)).convert()}</div>
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

export default TrueFalseTemplateEdit;