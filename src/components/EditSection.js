import React from 'react';
import WrapperFooter from './util/WrapperFooter';
import WrapperHeader from './util/WrapperHeader';
import EditSectionForm from './exam/EditSectionForm';
import Request from './services/Request';
class EditSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sectionDetails: {},
            sectionId: null,
            examTitle: localStorage.getItem('ExamTitle'),
            load: false
        }
    }


    fetchSectionDetails(sectionId) {
        let url = "http://localhost:8080/QuizWit/ViewSections?sectionId=";
        url += sectionId;
        Request.get(url)
        .then((res) => {
            if(res.success) {
                this.setState({
                    sectionDetails: res.sectionDetails
                })
            }
            console.log('state')
            console.log(this.state)
            this.setState({
                load: true
            })
        })
    }
    
    resetForm = () => {
        document.getElementById('reset-form-btn').click();
    }

    updateForm = () => {
        document.getElementById('update-form-btn').click();
    }

    componentDidMount = () => {
        let secId = localStorage.getItem('SectionId');
        if(secId && secId != '0') {
            try {
                secId = parseInt(secId);
                this.fetchSectionDetails(secId);
                this.setState({
                    sectionId: secId
                })
            }catch(e) {

            }
        }
    }

    render() {
        return (
            <>
            <WrapperHeader
                    heading={
                        <>  
                            <span className='secondary'>{this.state.examTitle}</span>
                            <span className='gray'> &gt; </span>
                            <span className='primary'>{this.state.sectionDetails.title}</span>
                            <span className='gray'> &gt; </span>
                            <span className='success'>Update Section</span>
                        </>
                    }
            />
            <div className='content-loaded'>
                <div>
                    { this.state.load && <EditSectionForm sectionId={this.state.sectionId} examId={this.state.sectionDetails.examId} sectionDetails={this.state.sectionDetails} /> }
                </div>
            </div>
            <WrapperFooter
                render={
                    <div className='flex-row jc-sb'>
                        <button className='btn btn-fade btn-small' onClick={this.resetForm}>Reset</button>
                        <button className='btn btn-primary btn-small' onClick={this.updateForm}>Update</button>
                    </div>
                }
            />
            </>
        )
    }
}

export default EditSection;