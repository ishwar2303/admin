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

class MCQMultipleCorrectTemplateEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionDetails: this.props.questionDetails,
            load: false
        }
    }
    setQuestionTimer = () => {
        let url = "http://localhost:8080/QuizWit/SetQuestionTimer?sectionId=";
        url += this.props.questionDetails.sectionId;
        Request.get(url)
        .then((res) => {
            console.log(res);
            if(res.success) {
                this.setState({
                    setQuestionTimer: res.setQuestionTimer
                }, () => {
                    if(this.state.setQuestionTimer) {
                        document.getElementById('set-question-timer').style.display = 'block';
                    }
                });

            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        })
    }
    updateQuestion = (e) => {
        e.preventDefault();
        console.log('submitted');
        console.log(JSON.stringify(this.state.question))

        let mcqOptionAnswerCheckboxInput = document.getElementsByName('mcqOptionAnswerCheckboxInput');
        let correctAnswer = [];

        if(mcqOptionAnswerCheckboxInput.length >=0) {
            for(let i=0; i<mcqOptionAnswerCheckboxInput.length; i++) {
                if(mcqOptionAnswerCheckboxInput[i].checked) {
                    correctAnswer.push(i+1);
                }
            }
            if(!correctAnswer.length) {
                Flash.message('Please select correct option', 'bg-primary');
                return;
            }
            else {
                document.getElementsByName('mcqOptionAnswer')[0].value = correctAnswer.toString();
            }
        }
        else {
            Flash.message('Add atleast 2 options', 'bg-primary');
            return;
        }

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
            responseBlock[1].innerHTML = (log.mcqOption ? icon + log.mcqOption : '');
            responseBlock[2].innerHTML = (log.mcqOptionAnswers ? icon + log.mcqOptionAnswers : '');
            responseBlock[3].innerHTML = (log.score ? icon + log.score: '');
            responseBlock[4].innerHTML = (log.negativeMarking ? icon + log.negativeMarking: '');

            let optionsError = log.optionsError;
            let optionResponseBlock = document.getElementsByClassName('mcq-option-response');
            for(let i=0; i<optionResponseBlock.length; i++) {
                optionResponseBlock[i].innerHTML = (optionsError[i] ? icon + optionsError[i] : '');
            }

            responseBlock[5].innerHTML = (log.timeDuration ? icon + log.timeDuration: '');
        }
    }

    checkAnswerOption = (optionId) => {
        let mcqAnswers = this.state.questionDetails.mcqAnswers;
        for(let i=0; i<mcqAnswers.length; i++) {
            if(mcqAnswers[i].optionId == optionId)
                return true;
        }
        return false;
    }

    componentDidMount = () => {
        this.setState({
            load: true
        })
        this.pickTimeFromSlots();
        let mcqOptions = this.state.questionDetails.mcqOptions;
        for(let i=0; i<mcqOptions.length; i++) { 
            this.createMcqOption(mcqOptions[i].option, this.checkAnswerOption(mcqOptions[i].optionId));
        }
        localStorage.setItem('questionStringFromSimpleMde', '');
        this.setQuestionTimer();
    }

    pickTimeFromSlots = () => {
        let slots = document.getElementsByName('timeDurationSlots');
        for(let i=0; i<slots.length; i++) {
            slots[i].addEventListener('click', (e) => {
                document.getElementsByName('timeDuration')[0].value = e.target.defaultValue;
                document.getElementById('time-duration').innerText = (new TimeToString(e.target.value)).convert();
            })
        }
    }

    convertTime = (e) => {
        let el = e.target;
        let value = el.value;
        let response = el.nextElementSibling;
        let convertedTime = (new TimeToString(parseInt(value))).convert();
        response.innerHTML = convertedTime;
    }

    resetForm = () => {
        this.setState({
            question: ""
        })
        this.setState({
            questionDetails: {}
        })
        this.props.fetchQuestion();
        localStorage.setItem('questionStringFromSimpleMde', '');
        let responseBlock = document.getElementById('question-form').getElementsByClassName('response');
        for(let i=0; i<responseBlock.length; i++)
            responseBlock[i].innerHTML = '';
        
        let optionResponseBlock = document.getElementsByClassName('mcq-option-response');
        for(let i=0; i<optionResponseBlock.length; i++)
            optionResponseBlock[i].innerHTML = '';
        
        let convertedTimeResponse = document.getElementsByClassName('converted-time');
        for(let i=0; i<convertedTimeResponse.length; i++)
            convertedTimeResponse[i].innerHTML = '';
    }
    onChange = (defaultValue) => {
        localStorage.setItem('questionStringFromSimpleMde', defaultValue);
        document.getElementById('question').value = defaultValue;
    }
    
    resetTimeSlots = () => {
        let slots = document.getElementsByName('timeDurationSlots');
        for(let i=0; i<slots.length; i++) {
            slots[i].checked = false;
        }
    }
    createMcqOptionBlank = () => {
        this.createMcqOption('', false);
    }
    createMcqOption = (optionText, answer) => {
        let div = document.createElement('div');
        div.className = 'mcq-option-container';
        let container1 = document.createElement('div');
        container1.className = 'flex-row';
        let response = document.createElement('div');
        response.className = 'mcq-option-response';
        let div1 = document.createElement('div');
        let input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = answer;
        input.name = 'mcqOptionAnswerCheckboxInput';
        div1.appendChild(input);
        let div2 = document.createElement('div');
        div2.className = 'flex-full';
        let textarea = document.createElement('textarea');
        textarea.name = 'mcqOption[]';
        textarea.value = optionText;
        textarea.placeholder = 'Type your option here...';
        div2.appendChild(textarea);
        let div3 = document.createElement('div');
        let i = document.createElement('i');
        i.className = 'fas fa-trash';
        i.addEventListener('click', () => {
            let res = true;
            if(res) {
                div.remove();
            }
        })
        div3.appendChild(i);
        container1.appendChild(div1);
        container1.appendChild(div2);
        container1.appendChild(div3);
        div.appendChild(container1);
        div.appendChild(response);
        let parent = document.getElementsByClassName('mcq-options-block')[0];
        parent.appendChild(div);
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
                <input className='hidden' type="text" name="mcqOptionAnswer" />
                <input className='hidden' type="number" name="categoryId" defaultValue={2} />
                <input className='hidden' type="number" name="questionId" defaultValue={this.state.questionDetails.questionId} />
                <textarea className='hidden' name="question" rows="10" id='question' value={this.state.questionDetails.question}></textarea>
                {
                    <>
                        <div className='mcq-options'>
                            <h3 className='template-headings'>MCQ Options</h3>
                            <div className='mcq-options-block'>
                            </div>
                            <div className='flex-row jc-sb mt-10 pb-10'>
                                <div>
                                    <div className='response'></div>
                                    <div className='response'></div>
                                </div>
                                <label className='btn btn-secondary btn-small' onClick={this.createMcqOptionBlank}>Add option</label>
                            </div>
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
                        <div id='set-question-timer'>
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
                        </div>
                        <div className='hidden' id='reset-question-form' onClick={this.resetForm}>reset</div>
                        <input className='hidden' type="submit" id='submit-question-form' />
                        
                    </>
                }
            </form>
        )
    }
}

export default MCQMultipleCorrectTemplateEdit;