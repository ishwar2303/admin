import React from 'react';
import $ from 'jquery';
import '../../css/ManagementUserDialog.css';
import Request from '../../services/Request';
import Flash from '../../services/Flash';

function ManagementUserDialog(props) {
    const hideCreateDialog = () => {
        document.getElementsByClassName('management-user-dialog')[0].style.display = 'none';
        document.getElementById('route-overlay').style.display = 'none';
        resetForm();
    }
    const resetForm = () => {
        document.getElementById('add-management-user-form').reset();
        let responseBlock = document.getElementById('add-management-user-form').getElementsByClassName('response');
        for(let i=0; i<responseBlock.length; i++) {
            responseBlock[i].innerHTML = '';
        }
    }
    const createUser = (e) => {
        let url = "http://localhost:8080/QuizWit/ManagementUser";
        e.preventDefault();
        let data = $('#add-management-user-form').serialize();
        Request.post(url, data)
        .then((res) => {
            populateResponse(res);
        })
    }
    const populateResponse = (res) => {
        let responseBlock = document.getElementById('add-management-user-form').getElementsByClassName('response');
        if(res.error) {
            Flash.message(res.error, 'bg-danger');
        }
        if(res.success) {
            document.getElementById('route-overlay').style.display = 'none';
            Flash.message(res.success, 'bg-success');
            document.getElementsByClassName('management-user-dialog')[0].style.display = 'none';
            resetForm();
            props.fetchUsers();
        }
        else {
            let log = res.errorLog;
            let icon = '<i class="fas fa-exclamation-circle mr-5"></i>';
            responseBlock[0].innerHTML = (log.username ? icon + log.username: '');
            responseBlock[1].innerHTML = (log.password ? icon + log.password: '');
            responseBlock[2].innerHTML = (log.confirmPassword ? icon + log.confirmPassword: '');
        }

    }

    return (
        <div className='management-user-dialog'>
            <div>
                <h3 className='mb-20 primary'>Create Management User</h3>
                <form action="" id="add-management-user-form" onSubmit={createUser}>
                    <input type="hidden" name="operation" value="CreateUser" />
                    <div className="input-block">
                        <div className="input-floating">
                            <input type="text" name="username" defaultValue='' required />
                            <label>Username</label>
                            <div className='response'></div>
                        </div>
                    </div>
                    <div className="input-block">
                        <div className="input-floating">
                            <input type="password" name="password" defaultValue='' required />
                            <label>Password</label>
                            <div className='response'></div>
                        </div>
                    </div>
                    <div className="input-block">
                        <div className="input-floating">
                            <input type="password" name="confirmPassword" defaultValue='' required />
                            <label>Confirm Password</label>
                            <div className='response'></div>
                        </div>
                    </div>
                    <div className='flex-row jc-sb'>
                        <div className='btn btn-fade btn-small' onClick={hideCreateDialog}>Cancel</div>
                        <button className='btn btn-small btn-primary'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ManagementUserDialog