import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from 'react-markdown';
import "easymde/dist/easymde.min.css";
import Loader from '../../util/Loader';
import Flash from '../../services/Flash';

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

        let mcqOptionAnswer = document.getElementsByName('mcqOptionAnswer');
        let correctAnswer = [];
        for(let i=0; i<mcqOptionAnswer.length; i++) {
            if(mcqOptionAnswer[i].checked) {
                correctAnswer.push(i+1);
            }
        }
        if(!correctAnswer.length) {
            Flash.message('Please select correct option', 'bg-primary');
            return;
        }
        console.log(correctAnswer);
    }
    componentDidMount = () => {
        this.setState({
            load: true
        })
        this.pickTimeFromSlots();
        for(let i=0; i<2; i++)  
            this.createMcqOption();
    }

    pickTimeFromSlots = () => {
        let slots = document.getElementsByName('timeDurationSlots');
        for(let i=0; i<slots.length; i++) {
            slots[i].addEventListener('click', (e) => {
                document.getElementsByName('timeDuration')[0].defaultValue = e.target.defaultValue;
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

    createMcqOption = () => {
        let div = document.createElement('div');
        div.className = 'mcq-option-container';
        let div1 = document.createElement('div');
        let input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'mcqOptionAnswer';
        div1.appendChild(input);
        let div2 = document.createElement('div');
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
        div.appendChild(div1);
        div.appendChild(div2);
        div.appendChild(div3);
        let parent = document.getElementsByClassName('mcq-options-block')[0];
        parent.appendChild(div);
    }

    render() {
        return (
            <form id='question-form' onSubmit={this.addQuestion}>
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
                    </>
                }
                <input className='hidden' type="number" name="categoryId" defaultValue={2} />
                <input className='hidden' type="number" name="sectionId" defaultValue={this.props.sectionId} />
                <textarea className='hidden' name="question" rows="10" id='question'></textarea>
                {
                    <>
                        <div className='mcq-options'>
                            <h3 className='template-headings'>MCQ Options</h3>
                            <div className='mcq-options-block'>
                            </div>
                            <div className='flex-row jc-e mt-10 pb-10'>
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
                        <div className='hidden' id='reset-question-form' onClick={this.resetForm}>reset</div>
                        <input className='hidden' type="submit" id='submit-question-form' />
                        
                    </>
                }
            </form>
        )
    }
}

export default MCQMultipleCorrectTemplate;