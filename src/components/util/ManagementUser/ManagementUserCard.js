import React from 'react';
import '../../css/ManagementUserCard.css';
import Flash from '../../services/Flash';
import Request from '../../services/Request';

function ManagementUserCard(props) {
    const updateStatus = () => {
        let url = "http://localhost:8080/QuizWit/ManagementUser";
        let data = {
            userId: props.details.userId,
            status: props.details.isActive,
            operation: "UpdateUserStatus"
        }
        Request.post(url, data)
        .then((res) => {
            if(res.success)
                Flash.message(res.success, 'bg-success');
            else Flash.message(res.error, 'bg-danger');
            props.fetchUsers();
        })
    }
    return (
    <div className='management-user-card'>
        <label className='details'>
            <input type="radio" name="managementUser[]" className='mr-10' value={props.details.userId} />
            <span>
                <div className='flex-row ai-c jc-sb'>
                    <div className='flex-row ai-c jc-sb'>
                        <div className='username'><b>Username:</b> {props.details.username}</div>
                    </div>
                    <div className='flex-row jc-e'>
                        <label className="custom-toggle-btn">
                            <input type="checkbox" defaultChecked={props.details.isActive == 1 ? true : false} value={props.details.userId} onClick={updateStatus} />
                            <span>
                                <i className="fas fa-check"></i>
                            </span>
                        </label>
                    </div>
                </div>
            </span>
        </label>
    </div>
    )
}

export default ManagementUserCard