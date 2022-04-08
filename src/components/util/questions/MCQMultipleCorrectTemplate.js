import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from 'react-markdown';
import "easymde/dist/easymde.min.css";
import Loader from '../../util/Loader';
import $ from 'jquery';
import Request from '../../services/Request';
import Flash from '../../services/Flash';
import TimeToString from '../../services/TimeToString';

class MCQMultipleCorrectTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            load: false
        }
    }
    addQuestion = (e) => {
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
        let question = localStorage.getItem('questionStringFromSimpleMde');
        document.getElementById('question').defaultValue = question;
        this.setState({
            question: question
        })
        let url = "http://localhost:8080/QuizWit/MultipleChoiceQuestionMultipleCorrect";
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
    componentDidMount = () => {
        this.setState({
            load: true
        })
        this.pickTimeFromSlots();
        for(let i=0; i<2; i++)  
            this.createMcqOption();
        localStorage.setItem('questionStringFromSimpleMde', '');
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

    resetForm = () => {
        this.setState({
            question: "",
        })
        document.getElementById('question-form').reset();
        localStorage.setItem('questionStringFromSimpleMde', '');
        let responseBlock = document.getElementById('question-form').getElementsByClassName('response');
        for(let i=0; i<responseBlock.length; i++)
            responseBlock[i].innerHTML = '';
        
        let optionResponseBlock = document.getElementsByClassName('mcq-option-response');
        for(let i=0; i<optionResponseBlock.length; i++)
            optionResponseBlock[i].innerHTML = '';
    }
    onChange = (defaultValue) => {
        localStorage.setItem('questionStringFromSimpleMde', defaultValue);
    }
    
    resetTimeSlots = () => {
        let slots = document.getElementsByName('timeDurationSlots');
        for(let i=0; i<slots.length; i++) {
            slots[i].checked = false;
        }
    }

    createMcqOption = () => {
        let div = document.createElement('div');
        div.className = 'mcq-option-container';
        let container1 = document.createElement('div');
        container1.className = 'flex-row';
        let response = document.createElement('div');
        response.className = 'mcq-option-response';
        let div1 = document.createElement('div');
        let input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'mcqOptionAnswerCheckboxInput';
        div1.appendChild(input);
        let div2 = document.createElement('div');
        div2.className = 'flex-full';
        let textarea = document.createElement('textarea');
        textarea.name = 'mcqOption[]'
        textarea.placeholder = 'Type your option here...'
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
                <input className='hidden' type="number" name="categoryId" defaultValue={2} />
                <input className='hidden' type="number" name="sectionId" defaultValue={this.props.sectionId} />
                <input className='hidden' type="text" name="mcqOptionAnswer" />
                <textarea className='hidden' name="question" rows="10" id='question'></textarea>
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
                                <label className='btn btn-secondary btn-small' onClick={this.createMcqOption}>Add option</label>
                            </div>
                        </div><div className="input-block">
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
                                        <input type="radio" name="timeDurationSlots" defaultValue="180" />
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
                                <input type="number" name="timeDuration" defaultValue={this.state.timeDuration} onInput={this.resetTimeSlots} onChange={this.convertTime} />
                                <div className='primary converted-time' id='time-duration'></div>
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

export default MCQMultipleCorrectTemplate;