import React from 'react';
import EditorJS from '@editorjs/editorjs';
import {EDITOR_JS_TOOLS} from '../../util/Tool';
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
        const reactEditor = new EditorJS({
            holder: 'react-editor-js-for-question',
            tools: EDITOR_JS_TOOLS,
            placeholder: 'Type your question here...',
            onChange: () => {
                reactEditor.save().then((d) => {
                    this.setState({
                        question: d.blocks
                    })
                })
            },
            onReady: () => {
                document.getElementsByClassName('codex-editor__redactor')[0].style.paddingBottom = '0px';
                document.getElementById('react-editor-js-for-question').style.display = 'block';
                this.setState({
                    load: true
                })
                for(let i=0; i<4; i++)
                    this.createMcqOption();
            }
        });

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
                    <div className='question-container'>
                        <h3 className='template-headings'>Question</h3>
                    </div>
                }
                <div id='react-editor-js-for-question'></div>
                {
                    this.state.load &&
                    <>
                        <div className='mcq-options'>
                            <h3 className='template-headings'>MCQ Options</h3>
                            <div className='mcq-options-block'>
                            </div>
                            <div className='flex-row jc-e mt-10 pb-10'>
                                <button className='btn btn-secondary btn-small' onClick={this.createMcqOption}>Add option</button>
                            </div>
                        </div>
                        <input className='hidden' type="submit" id='submit-question-form' />
                    </>
                }
            </form>
        )
    }
}

export default MCQMultipleCorrectTemplate;