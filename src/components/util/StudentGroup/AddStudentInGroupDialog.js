import React from 'react';
import $ from 'jquery';
import Flash from '../../services/Flash';
import Request from '../../services/Request';
import '../../css/AddStudentInGroupDialog.css';

class AddStudentInGroupDialog extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            examId: this.props.examId
        }
    }

    addStudent = (e) => {
        e.preventDefault();
        let url = "http://localhost:8080/QuizWit/AddStudentInGroup";
        let data = $('#add-student-in-group-form').serialize();
        Request.post(url, data)
        .then((res) => {
            console.log(res);
            if(res.success) {
                this.props.fetchStudents();
                this.props.closeDialog();
                Flash.message(res.success, 'bg-success');
            }
            else if(res.error) {
                let responseBlock = document.getElementById('add-student-in-group-form').getElementsByClassName('response');
                let log = res.errorLog;
                let icon = '<i class="fas fa-exclamation-circle mr-5"></i>';
                responseBlock[0].innerHTML = (log.email ? icon + log.email : '');
                responseBlock[1].innerHTML = (log.confirmEmail ? icon + log.confirmEmail : '');
            }
        })
    }


    render = () => {
        return (
            <div id='add-student-group-dialog'>
                <div>
                    <h3 className='mb-20 primary'>Add Student In Group</h3>
                    <form action="" id="add-student-in-group-form" onSubmit={this.addStudent}>
                        <input type="hidden" name="examId" value={this.props.examId} />
                        <div className="input-block">
                            <div className="input-floating">
                                <input type="text" name="email" required />
                                <label>E-mail</label>
                                <div className='response'></div>
                            </div>
                        </div>
                        <div className="input-block">
                            <div className="input-floating">
                                <input type="password" name="confirmEmail" required />
                                <label>Confirm E-mail</label>
                                <div className='response'></div>
                            </div>
                        </div>
                        <div className='flex-row jc-sb'>
                            <div className='btn btn-fade btn-small' onClick={this.props.closeDialog}>Cancel</div>
                            <button className='btn btn-small btn-primary'>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddStudentInGroupDialog;