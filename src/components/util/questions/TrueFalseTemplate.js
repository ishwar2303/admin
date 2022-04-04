import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from 'react-markdown';
import "easymde/dist/easymde.min.css";
import Loader from '../../util/Loader';
class TrueFalseTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            load: true
        }
    }

    addQuestion = (e) => {
        e.preventDefault();
        document.getElementById('question').defaultValue = localStorage.getItem('questionStringFromSimpleMde');
    }

    componentDidMount = () => {
    }
    onChange = (defaultValue) => {
        localStorage.setItem('questionStringFromSimpleMde', defaultValue);
    }
    pickTimeFromSlots = () => {
        let slots = document.getElementsByName('timeDurationSlots');
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
                    </>
                
                }
                <input className='hidden' type="number" name="sectionId" defaultValue={this.props.sectionId} />
                <textarea className='hidden' name="question" rows="10" id='question'></textarea>
                {
                    this.state.load &&
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
                                <div className="response"></div>
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