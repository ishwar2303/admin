import React from 'react';
import WrapperHeader from './util/WrapperHeader';
import WrapperFooter from './util/WrapperFooter';
import ChooseQuestionTemplate from './util/questions/ChooseQuestionTemplate';
import Flash from './services/Flash';
import TrueFalseTemplate from './util/questions/TrueFalseTemplate';
import DatabaseQueryTemplate from './util/questions/DatabaseQueryTemplate';
import MCQSingleCorrectTemplate from './util/questions/MCQSingleCorrectTemplate';
import MCQMultipleCorrectTemplate from './util/questions/MCQMultipleCorrectTemplate';
import ProgrammingTemplate from './util/questions/ProgrammingTemplate';
import './css/AddQuestion.css';

class AddQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionId: localStorage.getItem("SectionId"),
            sectionTitle: localStorage.getItem("SectionTitle"),
            trueFalseTemplate: true,
            mcqSingleCorrect: false,
            mcqMultipleCorrect: false,
            databaseQuery: false,
            programming: false,
            selectedTemplateName: 'True or False'
        }
    }
    showTemplateDialog() {
        document.getElementById('choose-question-template').style.display = 'block';
        document.getElementById('route-overlay').style.display = 'block';
    }
    closeTemplateDialog() {
        document.getElementById('choose-question-template').style.display = 'none';
        document.getElementById('route-overlay').style.display = 'none';
    }
    loadTemplate = () => {
        let templates = document.getElementsByName('questionTemplateType');
        let selectedTemplate = null;
        for(let i=0; i<templates.length; i++) {
            if(templates[i].checked) {
                selectedTemplate = templates[i].value;
                break;
            }
        }

        if(!selectedTemplate) {
            Flash.message('Please select a question template', 'bg-primary');
            return;
        }
        let control = false;
        if(selectedTemplate == 'TF') {
            this.updateTemplateState(true,false,false,false,false)
            control = true;
            this.setState({
                selectedTemplateName: 'True or False'
            })
        }
        else if(selectedTemplate == 'DATABASE') {
            this.updateTemplateState(false,false,false,true,false)
            control = true;
            this.setState({
                selectedTemplateName: 'Database Query'
            })
        }
        else if(selectedTemplate == 'PROGRAMMING') {
            this.updateTemplateState(false,false,false,false,true)
            control = true;
            this.setState({
                selectedTemplateName: 'Programming | Coding'
            })
        }
        else if(selectedTemplate == 'MCQ SC') {
            this.updateTemplateState(false,true,false,false,false)
            control = true;
            this.setState({
                selectedTemplateName: 'Multiple Choice Question | Single Correct'
            })
        }
        else if(selectedTemplate == 'MCQ MC') {
            this.updateTemplateState(false,false,true,false,false)
            control = true;
            this.setState({
                selectedTemplateName: 'Multiple Choice Question | Multiple Correct'
            })
        }
        

        if(control) {
            this.closeTemplateDialog();
        }

    }

    updateTemplateState = (a, b, c, d, e) => {
        this.setState({
            trueFalseTemplate: a,
            mcqSingleCorrect: b,
            mcqMultipleCorrect: c,
            databaseQuery: d,
            programming: e
        })
    }

    resetQuestionForm = () => {
        console.log('reset')
        document.getElementById('question-form').reset();
    }

    submitQuestionForm = () => {
        document.getElementById('submit-question-form').click();
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <>
            <WrapperHeader 
                heading={
                    <>
                        <span className='primary'>{this.state.sectionTitle}</span>
                        <span className='gray'> &gt; </span>
                        <span>Add Question</span>
                        <span className='gray'> &gt; </span>
                        <span className='success'>{this.state.selectedTemplateName}</span>
                    </>
                }
                component={
                    <button className='btn btn-primary btn-small' onClick={this.showTemplateDialog}><i className='fas fa-question mr-5'></i>Template</button>
                }
            />
            <div className='content-loaded'>
                <div>
                    {
                        this.state.trueFalseTemplate && <TrueFalseTemplate />
                    }
                    {
                        this.state.databaseQuery && <DatabaseQueryTemplate />
                    }
                    {
                        this.state.mcqMultipleCorrect && <MCQMultipleCorrectTemplate />
                    }
                    {
                        this.state.mcqSingleCorrect && <MCQSingleCorrectTemplate />
                    }
                    {
                        this.state.programming && <ProgrammingTemplate />
                    }
                </div>
            </div>
            <ChooseQuestionTemplate 
                operation={this.loadTemplate}
            />
            <WrapperFooter 
                render={
                    <div className='flex-row jc-sb'>
                        <button id='reset-question-form-btn' className='btn btn-fade btn-small' onClick={this.resetQuestionForm}>Reset</button>
                        {
                            this.state.mcqSingleCorrect &&
                            <p className='tertiary'><sup>*</sup>To select the correct answer click on radio button.</p>
                        }
                        {
                            this.state.mcqMultipleCorrect &&
                            <p className='tertiary'><sup>*</sup>To select the correct answers select checkbox.</p>
                        }
                        <button id='add-question-form-btn' className='btn btn-primary btn-small' onClick={this.submitQuestionForm}>Add</button>
                    </div>
                }
            />
            </>
        )
    }
}

export default AddQuestion;