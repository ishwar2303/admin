import React from 'react';
import WrapperHeader from './util/WrapperHeader';
import WrapperFooter from './util/WrapperFooter';
import ChooseQuestionTemplate from './util/questions/ChooseQuestionTemplate';
import Flash from './services/Flash';
import TrueFalseTemplate from './util/questions/TrueFalseTemplate';

class AddQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionId: localStorage.getItem("SectionId"),
            sectionTitle: localStorage.getItem("SectionTitle"),
            trueFalseTemplate: false
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
            this.setState({
                trueFalseTemplate: true
            })
            control = true;
        }
        console.log(selectedTemplate)

        if(control) {
            this.closeTemplateDialog();
        }

    }
    componentDidMount() {

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
                </div>
            </div>
            <ChooseQuestionTemplate 
                operation={this.loadTemplate}
            />
            <WrapperFooter />
            </>
        )
    }
}

export default AddQuestion;