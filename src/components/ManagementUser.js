import React from 'react'
import { useState, useEffect } from 'react'
import WrapperHeader from './util/WrapperHeader'
import WrapperFooter from './util/WrapperFooter'
import ManagementUserDialog from './util/ManagementUser/ManagementUserDialog'
import ManagementUserCard from './util/ManagementUser/ManagementUserCard'
import Request from './services/Request'
import Flash from './services/Flash'
import Loader from './util/Loader'
import ConfirmationDialog from './util/ConfirmationDialog'
import UpdateRolesDialog from './util/ManagementUser/UpdateRolesDialog'

function ManagementUser() {

    const [load, setLoad] = useState(false);
    const [users, setUsers] = useState([]);
    const [availableRoles, setAvailableRoles] = useState([]);
    const [assignedRoles, setAssignedRoles] = useState([]);

    const showCreateDialog = () => {
        document.getElementsByClassName('management-user-dialog')[0].style.display = 'block';
        document.getElementById('route-overlay').style.display = 'block';
    }

    const fetchUsers = () => {
        setLoad(false);
        setUsers([]);
        setTimeout(() => {
            let url = "http://localhost:8080/QuizWit/ManagementUser";
            Request.get(url)
            .then((res) => {
                let temp = res.users;
                let users = [];
                for(let i=0; i<temp.length; i += 2) {
                    let arr = [];
                    arr.push(temp[i]);
                    if(i+1 < temp.length)
                        arr.push(temp[i+1]);
                    else arr.push({})
                    users.push(arr);
                }
                setUsers(users);
                setLoad(true);
            })
        }, 500);
    }

    const getSelectedUser = () => {
        let managementUsers = document.getElementsByName("managementUser[]");
        let selectedUser = null;
        for(let i=0; i<managementUsers.length; i++) {
            if(managementUsers[i].checked) {
                selectedUser = managementUsers[i].value;
                break;
            }
        }
        return selectedUser;
    }
    const deleteUsers = () => {
        let url = "http://localhost:8080/QuizWit/ManagementUser";
        let selectedUser = getSelectedUser();
        if(!selectedUser) {
            Flash.message("Please select a user", 'bg-secondary');
            return;
        }
        let data = {
            operation: "DeleteUser",
            userId: selectedUser
        }
        Request.post(url, data)
        .then((res) => {
            if(res.success) 
                Flash.message(res.success, 'bg-success');
            else Flash.message(res.error, 'bg-danger');
            fetchUsers();
            hideConfirmationDialog();
        })
    }

    useEffect(() => {
        document.getElementById('route-overlay').style.display = 'none';
        fetchUsers();
    }, []);

    const showConfirmationDialog = () => {
        let selectedUser = getSelectedUser();
        if(!selectedUser) {
            Flash.message("Please select a user", 'bg-secondary');
            return;
        }
        document.getElementById('confirmation-dialog').style.display = 'block';
        document.getElementById('route-overlay').style.display = 'block';
    }
    const hideConfirmationDialog = () => {
        document.getElementById('confirmation-dialog').style.display = 'none';
        document.getElementById('route-overlay').style.display = 'none';
    }

    const showUpdateUserRolesDialog = () => {
        let selectedUser = getSelectedUser();
        if(!selectedUser) {
            Flash.message("Please select a user", 'bg-secondary');
            return;
        }
        document.getElementById('route-overlay').style.display = 'block';
        let url = "http://localhost:8080/QuizWit/Roles?";
        Request.get(url + "roleType=Assigned&userId=" + selectedUser)
        .then((res) => {
            console.log(res);
            if(res.success) {
                setAssignedRoles(res.roles);
            }
            else {
                Flash.message('Something went wrong while fetching assigned roles', 'bg-danger');
            }
        })
        Request.get(url + "roleType=Available&userId=" + selectedUser)
        .then((res) => {
            console.log(res);
            if(res.success) {
                setAvailableRoles(res.roles);
            }
            else {
                Flash.message('Something went wrong while fetching assigned roles', 'bg-danger');
            }
        })
        document.getElementById('update-roles-dialog').style.display = 'block';
    }

    return (
        <>
            <WrapperHeader 
                heading='Management Users'
                component={
                    <div className='flex-row jc-e'>
                        <button onClick={showCreateDialog} className='btn btn-primary btn-small ml-10'>
                            <i className='fas fa-plus mr-5'></i>
                            Create
                        </button>
                        {
                            users.length > 0 ? 
                            <>
                                <button className='btn btn-tertiary btn-small ml-10' onClick={showUpdateUserRolesDialog}>
                                    <i className='fas fa-pen mr-5'></i>
                                    Update Roles
                                </button>
                                <button className='btn btn-danger btn-small ml-10' onClick={showConfirmationDialog}>
                                    <i className='fas fa-trash mr-5'></i>
                                    Delete
                                </button>
                            </>
                            : ''
                        }
                    </div>
                }
            />
            <div className='content-loaded'>
                <div>
                    { !load && <Loader /> }
                    {
                        load &&
                        <div className='users-container pb-10 pt-10'>
                            {   
                                users.map((d, key) => {
                                    return <div>
                                        <ManagementUserCard key={d[0].userId} details={d[0]} fetchUsers={fetchUsers}/>
                                        {
                                            d[1].userId != null && 
                                            <ManagementUserCard key={d[1].userId} details={d[1]} fetchUsers={fetchUsers}/>
                                        }
                                        {
                                            d[1].userId == null &&
                                            <div></div>
                                        }
                                    </div>
                                    
                                })
                            }

                            {
                                !users.length && <div className='primary'>
                                    <ul>
                                        <li>Create a management user.</li>
                                        <li>Assign roles to user.</li>
                                    </ul>
                                </div>
                            }
                        </div>
                    }
                    <ManagementUserDialog fetchUsers={fetchUsers}/>
                    <ConfirmationDialog 
                        title='Are you sure?'
                        message='Management user will be permanently deleted.' 
                        type='danger' 
                        operation={deleteUsers}
                        btn='Delete'
                        btnClass='btn-danger'
                    />
                    <UpdateRolesDialog setAvailableRoles={setAvailableRoles} setAssignedRoles={setAssignedRoles} assignedRoles={assignedRoles} availableRoles={availableRoles} getSelectedUser={getSelectedUser} />
                </div>
            </div>
            <WrapperFooter />
        </>
    )
}

export default ManagementUser