import React from 'react';
import EditorJS from '@editorjs/editorjs';
import {EDITOR_JS_TOOLS} from '../../util/Tool';
import Loader from '../../util/Loader';
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
        console.log('submitted');
        console.log(JSON.stringify(this.state.question))
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
            }
        });
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
                        <div className='true-false-option'>
                            <h3 className='template-headings'>Select Answer</h3>
                            <div>
                                <label>
                                    <input type="radio" name='trueFalseAnswer' value="1" />
                                    <span>True</span>
                                </label>
                                <label>
                                    <input type="radio" name='trueFalseAnswer' value="0"/>
                                    <span>False</span>
                                </label>
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