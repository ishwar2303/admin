import React from 'react';
import '../../css/Sections.css';
import Flash from '../../services/Flash';
import ConfirmationDialog from '../ConfirmationDialog';
import Request from '../../services/Request';

class Sections extends React.Component {
    constructor(props) {
        super(props);
    }
    closeDialog() {
        document.getElementById('sections-dialog').style.display = 'none';
        document.getElementById('route-overlay').style.display = 'none';
    }
    editSection(e) {
        if(e.target.id) {
            localStorage.setItem("SectionId", e.target.id);
            let a = document.createElement('a');
            a.href = 'edit-section';
            a.click();
        }
    }
    showConfirmationDialog(e) {
        if(e.target.id) {
            localStorage.setItem("SectionId", e.target.id);
            document.getElementById('confirmation-dialog').style.display = 'block';
        }
    }

    deleteSection() {
        let url = "http://localhost:8080/QuizWit/DeleteSection?sectionId=";
        url += localStorage.getItem("SectionId");
        console.log(url);
        Request.get(url)
        .then((res) => {
            if(res.success) {
                document.getElementById('confirmation-dialog').style.display = 'none';
                Flash.message(res.success, 'bg-success');
                console.log('Section deleted successfully');
                this.props.fetchSections();

            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        })
    }
    render() {
        return (
            <>
                <div id='sections-dialog'>
                    <div>
                        <div className='flex=-col flex-full jc-sb'>
                            <div id='exam-name-section-reference'> {this.props.examTitle}</div>
                            {
                                this.props.sections.length != 0 ? 
                                <>
                                    <h3 className='secondary mb-10'>Sections</h3>
                                    <div className="table-container">
                                        <table>
                                        <thead>
                                            <tr>
                                                <th>S No.</th>
                                                <th>Title</th>
                                                <th>Questions</th>
                                                <th>Section Timer</th>
                                                <th>Duration</th>
                                                <th>Question Navigation</th>
                                                <th>Shuffle Questions</th>
                                                <th style={{"textAlign":"center"}}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.sections.map((d, k) => {
                                                    return (
                                                        <>
                                                            <tr key={k}>
                                                                <td>{d.serialNo}</td>
                                                                <td>{d.title}</td>
                                                                <td>{d.questions}</td>
                                                                <td>{d.setSectionTimer == '1' ? <span className='success'>On</span> : <span className='danger'>Off</span>}</td>
                                                                <td>{d.timeDuration}</td>
                                                                <td>{d.questionNavigation == '1' ? <span className='success'>On</span> : <span className='danger'>Off</span>}</td>
                                                                <td>{d.shuffleQuestions == '1' ? <span className='success'>On</span> : <span className='danger'>Off</span>}</td>
                                                                <td>
                                                                    <div className='action-btn-container'>
                                                                        <button className='bg-primary' id={d.sectionId} onClick={this.editSection}>
                                                                            <i className='fas fa-pen'></i>
                                                                        </button>
                                                                        <button className='bg-danger' id={d.sectionId} onClick={this.showConfirmationDialog}>
                                                                            <i className='fas fa-trash'></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        </table>
                                    </div>
                                </>
                                : ''
                            }
                            {
                                this.props.sections.length == 0 ? <div className='danger'>Exam doesn't contain any section</div> : ''
                            }
                        </div>
                        <div className='flex-row jc-s'>
                            <button className='btn btn-fade btn-small' onClick={this.closeDialog}>Close</button>
                        </div>
                    </div>
                </div>
                <ConfirmationDialog 
                    message='Delete section' 
                    type='danger' 
                    btn='Delete'
                    btnClass='btn-danger'
                    operation={this.deleteSection}/>
            </>
        );
    }
}

export default Sections;