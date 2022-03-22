import React from 'react'
import '../../css/UpdateRolesDialog.css';
import Flash from '../../services/Flash';
import Request from '../../services/Request';

function UpdateRolesDialog(props) {

    const hideDialog = () => {
        document.getElementById('update-roles-dialog').style.display = 'none';
    }

    const createRoleOption = (data) => {
        let label = document.createElement('label');
        label.className = 'select-option';
        let span = document.createElement('span');
        span.innerText = data.roleCode;
        let input = document.createElement('input');
        input.type = 'checkbox';
        input.value = data.roleId;
        label.appendChild(input);
        label.appendChild(span);
        return label;
    }

    const checkAllGrant = () => {
        let checkbox = document.getElementById('check-all-grant');
        let available = document.getElementsByClassName('available-roles-container')[0];
        let roles = available.getElementsByTagName('label');
        for(let i=0; i<roles.length; i++) {
            let input = roles[i].getElementsByTagName('input')[0];
            input.checked = checkbox.checked;
        }
    }
    const checkAllRevoke = () => {
        let checkbox = document.getElementById('check-all-revoke');
        let assigned = document.getElementsByClassName('assigned-roles-container')[0];
        let roles = assigned.getElementsByTagName('label');
        for(let i=0; i<roles.length; i++) {
            let input = roles[i].getElementsByTagName('input')[0];
            input.checked = checkbox.checked;
        }
    }

    const grantRoles = () => {
        document.getElementById('check-all-grant').checked = false;
        let available = document.getElementsByClassName('available-roles-container')[0];
        let assigned = document.getElementsByClassName('assigned-roles-container')[0];
        let roles = available.getElementsByTagName('label');
        let grant = [];
        let temp = [];
        for(let i=0; i<roles.length; i++) {
            let input = roles[i].getElementsByTagName('input')[0];
            let code  = roles[i].getElementsByTagName('span')[0].innerText;
            if(input.checked) {
                grant.push({
                    roleCode: code,
                    roleId: input.value
                })
            }
            else {
                temp.push({
                    roleCode: code,
                    roleId: input.value
                })
            }
        }
        available.innerHTML = '';
        for(let i=0; i<temp.length; i++) {
            available.appendChild(createRoleOption(temp[i]));
        }
        for(let i=0; i<grant.length; i++) {
            assigned.appendChild(createRoleOption(grant[i]));
        }
    }
    const revokeRoles = () => {
        document.getElementById('check-all-revoke').checked = false;
        let available = document.getElementsByClassName('available-roles-container')[0];
        let assigned = document.getElementsByClassName('assigned-roles-container')[0];
        let roles = assigned.getElementsByTagName('label');
        let revoke = [];
        let temp = [];
        for(let i=0; i<roles.length; i++) {
            let input = roles[i].getElementsByTagName('input')[0];
            let code  = roles[i].getElementsByTagName('span')[0].innerText;
            if(input.checked) {
                revoke.push({
                    roleCode: code,
                    roleId: input.value
                })
            }
            else {
                temp.push({
                    roleCode: code,
                    roleId: input.value
                })
            }
        }
        assigned.innerHTML = '';
        for(let i=0; i<temp.length; i++) {
            assigned.appendChild(createRoleOption(temp[i]));
        }
        for(let i=0; i<revoke.length; i++) {
            available.appendChild(createRoleOption(revoke[i]));
        }
    }

    const updateUserRoles = () => {
        let assigned = document.getElementsByClassName('assigned-roles-container')[0];
        let roles = assigned.getElementsByTagName('label');
        let rolesString = "";
        for(let i=0; i<roles.length; i++) {
            let input = roles[i].getElementsByTagName('input')[0];
            rolesString += input.value;
            if(i != roles.length - 1)
                rolesString += ",";
        }
        let url = "http://localhost:8080/QuizWit/Roles";
        Request.post(url, {rolesString: rolesString, userId: props.getSelectedUser()})
        .then((res) => {
            if(res.success) {
                document.getElementById('update-roles-dialog').style.display = 'none';
                Flash.message(res.success, 'bg-success');
            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        })
    }
    return (
        <div id="update-roles-dialog">
            <h4 className='primary'>Update Roles of Management User</h4>
            <p className='mt-10 mb-10'>Select the roles and use arrow buttons to grant or revoke roles</p>
            <div className="flex-row mb-10 role-type">
                <div className="flex-full secondary">Available Roles
                    <input type="checkbox" id="check-all-grant" className='ml-20' onChange={checkAllGrant}/>
                </div>
                <div className='mr-20'></div>
                <div className='mr-20'></div>
                <div className="flex-full ml-20 success">Assigned Roles
                    <input type="checkbox" id="check-all-revoke" className='ml-20' onChange={checkAllRevoke} />
                </div>
            </div>
            <div className="flex-row">
                <div className="flex-col flex-full available-roles-container">
                    {
                        props.availableRoles.map((d, key) => {
                            return <label className='select-option' key={key}>
                                <input type="checkbox" value={d.roleId} defaultChecked={false}/>
                                <span>{d.code}</span>
                            </label>;
                        })
                    }
                </div>
                <div className="flex-col btn-container mr-20 ml-20">
                    <button onClick={grantRoles}><i className="fas fa-angle-right"></i><i className="fas fa-angle-right"></i></button>
                    <button onClick={revokeRoles}><i className="fas fa-angle-left"></i><i className="fas fa-angle-left"></i></button>
                </div>
                <div className="flex-col flex-full assigned-roles-container">
                    {
                        props.assignedRoles.map((d, key) => {
                            return <label className='select-option' key={key}>
                                <input type="checkbox" value={d.roleId} defaultChecked={false}/>
                                <span>{d.code}</span>
                            </label>;
                        })
                    }
                </div>
            </div>
            <div className='flex-row jc-sb mt-20'>
                <button className='btn btn-fade btn-small' onClick={hideDialog}>Cancel</button>
                <button className='btn btn-primary btn-small' onClick={updateUserRoles}>Confirm</button>
            </div>
        </div>
    )
}

export default UpdateRolesDialog