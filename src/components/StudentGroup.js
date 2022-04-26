import React from 'react';
import $ from 'jquery';
import Flash from './services/Flash';
import Request from './services/Request';
import AddStudentInGroupDialog from './util/StudentGroup/AddStudentInGroupDialog';
import WrapperHeader from './util/WrapperHeader';
import WrapperFooter from './util/WrapperFooter';
import ConfirmationDialog from './util/ConfirmationDialog';

class StudentGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            examId: localStorage.getItem('ExamId'),
            examTitle: localStorage.getItem('ExamTitle'),
            group: [],
            addStudentState: false
        }
    }

    showAddStudentDialog = () => {
        document.getElementById('route-overlay').style.display = 'block';
        this.setState({
            addStudentState: true
        });
    }

    closeAddStudentDialog = () => {
        this.setState({
            addStudentState: false
        }, () => {
            document.getElementById('route-overlay').style.display = 'none';
        });
    }

    fetchStudents = () => {
        let url = "http://localhost:8080/QuizWit/FetchStudentGroup?examId=";
        url += this.state.examId;
        Request.get(url)
        .then((res) => {
            if(res.success) {
                let details = res.group;
                for(let i=0; i<details.length; i++) {
                    details[i]["serialNo"] = i + 1;
                }
                this.setState({
                    group: details
                });
            }
            else if(res.error) {
                let responseBlock = document.getElementById('create-exam-form').getElementsByClassName('response');
                let log = res.errorLog;
                let icon = '<i class="fas fa-exclamation-circle mr-5"></i>';
                responseBlock[0].innerHTML = (log.email ? icon + log.email : '');
                responseBlock[1].innerHTML = (log.confirmEmail ? icon + log.confirmEmail : '');
            }
        })
    }

    showDeleteDialog = () => {
        let control = false;
        let el = document.getElementsByName('groupId');
        for(let i=0; i<el.length; i++) {
            if(el[i].checked) {
                control = true;
                break;
            }
        }
        if(control) {
            document.getElementById('confirmation-dialog').style.display = 'block';
            document.getElementById('route-overlay').style.display = 'block';
        }
        else {
            Flash.message('Select student', 'bg-primary');
        }
    }

    selectUnselect = (e) => {
        let el = e.target;
        let els = document.getElementsByName('groupId');
        for(let i=0; i<els.length; i++) {
            els[i].checked = el.checked
        }
    }

    deleteStudents = () => {
        let data = {
            groupId: []
        };
        let control = false;
        let el = document.getElementsByName('groupId');
        for(let i=0; i<el.length; i++) {
            if(el[i].checked) {
                data.groupId.push(el[i].value)
                control = true;
            }
        }
        data.groupId = data.groupId.toString();
        console.log(data);
        if(control) {
            let url = "http://localhost:8080/QuizWit/DeleteStudentsInGroup";
            Request.post(url, data)
            .then((res) => {
                if(res.success) {
                    this.fetchStudents();
                    document.getElementById('confirmation-dialog').style.display = 'none';
                    document.getElementById('route-overlay').style.display = 'none';
                }
                else {
                    Flash.message(res.error, 'bg-danger');
                }
            });
        }
        else {
            Flash.message('Select student', 'bg-primary');
        }
    }

    closeDialog = () => {
        document.getElementById('add-student-group-dialog').style.display = 'none';
        document.getElementById('route-overlay').style.display = 'none';
    }

    componentDidMount = () => {
        this.fetchStudents();
    }

    render = () => {
        return (
            <>
                <WrapperHeader 
                    heading={
                        <>
                            <span className='secondary'>{this.state.examTitle}</span>
                            <span className='gray'> &gt; </span>
                            <span className='primary'>Student Group</span>
                        </>
                    }
                    component={
                        <div>
                            <button className='btn btn-primary btn-small' onClick={this.showAddStudentDialog}>
                                <i className='fas fa-plus mr-5'></i>
                                Add Student
                            </button>
                            {
                                this.state.group.length > 0 &&
                                <button className='btn btn-danger btn-small ml-10' onClick={this.showDeleteDialog}>
                                    <i className='fas fa-trash mr-5'></i>
                                    Delete
                                </button>
                            }
                        </div>
                    }
                />
                <div className='content-loaded'>
                    <div>
                        {
                            this.state.group.length > 0 &&
                            <div className="table-container">
                                <table className='mt-10'>
                                <thead>
                                    <tr>
                                        <th style={{width: "40px"}} className='text-center'>
                                            <div className='flex-row jc-c ai-c'>
                                                <label className='custom-radio'>
                                                    <input id="selectAllGroupId" type="checkbox" onClick={this.selectUnselect} />
                                                    <span>
                                                    <i className='fas fa-check'></i>
                                                    </span>
                                                </label>
                                            </div>
                                        </th>
                                        <th style={{width: "80px"}} className='text-left'>S No.</th>
                                        <th className='text-left'>E-mail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.group.map((d, k) => {
                                            return (<tr key={k}>
                                                    <td>
                                                        <div className='flex-row jc-c ai-c'>
                                                            <label className='custom-radio'>
                                                                <input type="checkbox" name="groupId" value={d.groupId}/>
                                                                <span>
                                                                <i className='fas fa-check'></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className='text-left'>{d.serialNo}</td>
                                                    <td className='text-left'>{d.email}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                </table>
                            </div>
                        }
                        {
                            this.state.group.length == 0 &&
                            <div className='danger'>Group doesn't contain any student</div>
                        }
                        {
                            this.state.addStudentState &&
                            <AddStudentInGroupDialog 
                                closeDialog={this.closeAddStudentDialog}
                                fetchStudents={this.fetchStudents}
                                examId={this.state.examId}
                            />
                        }
                        <ConfirmationDialog 
                            title='Are you sure?'
                            message='Selected students will be permanently deleted.' 
                            type='danger' 
                            operation={this.deleteStudents}
                            btn='Delete'
                            btnClass='btn-danger'
                        />
                    </div>
                </div>
                <WrapperFooter 
                    render={
                        <div className='flex-row jc-c ai-c'>
                            <p className='tertiary'>Students which belongs to this exam group can only appear for the private exam.</p>
                        </div>
                    }
                />
            </>
        );
    }
}

export default StudentGroup;