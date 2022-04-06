import React from 'react';
import '../../css/Sections.css';
import Flash from '../../services/Flash';
import ConfirmationDialog from '../ConfirmationDialog';
import Request from '../../services/Request';

class Sections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: this.props.sections,
            deleteSectionTitle: ''
        }
    }
    closeDialog() {
        document.getElementById('sections-dialog').style.display = 'none';
        document.getElementById('route-overlay').style.display = 'none';
    }

    setSection(e) {
        if(e.target.id) {
            let temp = e.target.id;
            temp = temp.split(",");
            localStorage.setItem("SectionId", temp[0]);
            let name = '';
            for(let i=1; i<temp.length; i++) {
                name += temp[i]
                if(i != temp.length - 1)
                    name += ','
            }
            localStorage.setItem("SectionTitle", name);
            this.setState({
                deleteSectionTitle: localStorage.getItem("SectionTitle")
            })
            return true;
        }
        else return false;
    }

    redirectToLink(link) {
        let a = document.createElement('a');
        a.href = link;
        a.target = '_blank';
        a.click();
    }

    editSection = (e) => {
        if(this.setSection(e)) {
            this.redirectToLink('edit-section');
        }
    }
    addQuestion = (e) => {
        if(this.setSection(e)) {
            this.redirectToLink('add-question');
        }
    }
    viewQuestions = (e) => {
        if(this.setSection(e)) {
            this.redirectToLink('view-question');
        }
    }
    showConfirmationDialog = (e) => {
        if(this.setSection(e)) {
            document.getElementById('confirmation-dialog').style.display = 'block';
        }
    }
    getSelectedExam = () => {
        let exams = document.getElementsByName('examId');
        let examNames = document.getElementsByClassName('exam-title-value');
        for(let i=0; i<exams.length; i++) {
            if(exams[i].checked)
                return {
                    examId: exams[i].value,
                    examTitle: examNames[i].innerText
                }
        }
        return null;
    }

    addSection() {
        document.getElementById('add-section-btn').click();
    }

    fetchSections = () => {
        let obj = this.getSelectedExam();
        if(obj) {
            document.getElementById('route-overlay').style.display = 'block';
            let url = "http://localhost:8080/QuizWit/ViewSections?examId=";
            url += obj.examId;
            console.log(url);
            Request.get(url)
            .then((res) => {
                console.log(res);
                if(res.success) {
                    let details = res.sectionDetails;
                    for(let i=0; i<details.length; i++)
                        details[i]["serialNo"] = i+1;
                    this.setState({
                        sections: details
                    })
                    document.getElementById('route-overlay').style.display = 'none';
                    if(details.length == 0) {
                        Flash.message("Exam doesn't contain any section to show", "bg-primary");
                        document.getElementById('route-overlay').style.display = 'none';
                        document.getElementById('sections-dialog').style.display = 'none';
                    }
                    else {
                        document.getElementById('route-overlay').style.display = 'block';
                        document.getElementById('sections-dialog').style.display = 'flex';
                    }
                }
            })
        }
        else {
            // Flash.message('Select an exam', 'bg-secondary');
            return false;
        }
    }
    deleteSection = () => {
        let url = "http://localhost:8080/QuizWit/DeleteSection?sectionId=";
        url += localStorage.getItem("SectionId");
        console.log(url);
        Request.get(url)
        .then((res) => {
            if(res.success) {
                document.getElementById('confirmation-dialog').style.display = 'none';
                Flash.message(res.success, 'bg-success');
                console.log('delete');
                this.fetchSections();
            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        })
    }
    componentDidMount() {
        this.fetchSections();
    }
    render() {
        return (
            <>
                <div id='sections-dialog'>
                    <div>
                        <div className='flex-col flex-full jc-sb'>
                            <h3 className='secondary mb-10 flex-row jc-sb' id='exam-name-section-reference'>
                                <div>
                                    <span className='secondary'>{this.props.examTitle} </span>
                                    <span className='gray'> &gt; </span>
                                    <span className='primary'>Sections</span>
                                </div>
                                <div>
                                    <i className='fas fa-sync bg-refresh-icon' onClick={this.fetchSections}></i>
                                </div>
                            </h3>
                            {
                                this.props.sections.length != 0 ? 
                                <>
                                    <div className="table-container">
                                        <table>
                                        <thead>
                                            <tr>
                                                <th>S No.</th>
                                                <th style={{width: '300px'}}>Title</th>
                                                <th style={{width: '100px'}} className='text-left'>Duration</th>
                                                <th className='text-center'>Questions</th>
                                                <th className='text-center'>Section<br/>Timer</th>
                                                <th className='text-center'>Question<br/>Navigation</th>
                                                <th className='text-center'>Shuffle<br/>Questions</th>
                                                <th style={{"textAlign":"center"}}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.sections.map((d, k) => {
                                                    return (
                                                        <>
                                                            <tr key={k}>
                                                                <td>{d.serialNo}</td>
                                                                <td>{d.title}</td>
                                                                <td className='text-left'>{d.timeDuration}</td>
                                                                <td className='text-center'>{d.questions}</td>
                                                                <td className='text-center'>{d.setSectionTimer == '1' ? <span className='success'>On</span> : <span className='danger'>Off</span>}</td>
                                                                <td className='text-center'>{d.questionNavigation == '1' ? <span className='success'>On</span> : <span className='danger'>Off</span>}</td>
                                                                <td className='text-center'>{d.shuffleQuestions == '1' ? <span className='success'>On</span> : <span className='danger'>Off</span>}</td>
                                                                <td>
                                                                    <div className='action-btn-container'>
                                                                         <i className='fas fa-plus bg-tertiary' id={d.sectionId + "," + d.title} onClick={this.addQuestion}></i>
                                                                         <i className='fas fa-box  bg-secondary' id={d.sectionId + "," + d.title} onClick={this.viewQuestions}></i>
                                                                         <i className='fas fa-pen bg-primary' id={d.sectionId + "," + d.title} onClick={this.editSection}></i>
                                                                        <i className='fas fa-trash bg-danger' id={d.sectionId + "," + d.title} onClick={this.showConfirmationDialog}></i>

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
                                this.state.sections.length == 0 ? <div className='danger'>Exam doesn't contain any section</div> : ''
                            }
                        </div>
                        <div className='flex-row jc-sb'>
                            <button className='btn btn-fade btn-small' onClick={this.closeDialog}>Close</button>
                            <div className='flex-row'>
                            <p style={{fontSize: "14px"}} className='tertiary'>Click on <i className='fas fa-plus'></i> icon to add questions in that section.</p>
                            &nbsp;<span className='gray'>|</span>&nbsp;
                            <p style={{fontSize: "14px"}} className='secondary'>Click on <i className='fas fa-box'></i> icon to view questions in that section.</p>
                            </div>
                            <button className='btn btn-primary btn-small' onClick={this.addSection}>Add</button>
                        </div>
                        <div className='table-border'></div>
                    </div>
                </div>
                <ConfirmationDialog 
                    title='Are you sure?'
                    entity={this.state.deleteSectionTitle}
                    message='The section will be permanently deleted.' 
                    type='' 
                    btn='Delete'
                    btnClass='btn-danger'
                    operation={this.deleteSection}/>
            </>
        );
    }
}

export default Sections;