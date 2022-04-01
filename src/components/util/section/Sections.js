import React from 'react';
import '../../css/Sections.css';

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
                                                                        <button className='bg-danger'>
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
            </>
        );
    }
}

export default Sections;