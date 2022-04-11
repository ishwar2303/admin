
import React from 'react';
import WrapperFooter from './util/WrapperFooter';
import WrapperHeader from "./util/WrapperHeader";
import Request from './services/Request';
import Flash from './services/Flash';
import Loader from './util/Loader';
import ManagementUserDialog from './util/ManagementUser/ManagementUserDialog';
import ConfirmationDialog from './util/ConfirmationDialog';
import UpdateRolesDialog from './util/ManagementUser/UpdateRolesDialog';
import ManagementUserStatus from './util/ManagementUser/ManagementUserStatus';

class ManagementUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            entity: '',
            createUser: false,
            updateRoles: false,
            assignedRoles: [],
            availableRoles: [],
            managementUsers: []
        }
    }

    fetchUsers = () => {
        this.setState({
            load: false
        }, () => {
            let url = "http://localhost:8080/QuizWit/ManagementUser";
            Request.get(url)
            .then((res) => {
                if(res.success) {
                    let users = res.users;
                    for(let i=0; i<users.length; i++) {
                        users[i]["serial"] = i+1;
                    }
                    this.setState({
                        managementUsers: users
                    }, () => {
                        this.setState({
                            load: true
                        });
                    }); 
                }
                else {
                    Flash.message(res.error, 'bg-danger');
                }
            })
        })
        
    }

    deleteUser = () => {
        let url = "http://localhost:8080/QuizWit/ManagementUser";
        let selectedUser = this.getSelectedUser();
        if(!selectedUser) {
            Flash.message("Please select a user", 'bg-primary');
            return;
        }
        let data = {
            operation: "DeleteUser",
            userId: selectedUser.userId
        }
        Request.post(url, data)
        .then((res) => {
            if(res.success) 
                Flash.message(res.success, 'bg-success');
            else Flash.message(res.error, 'bg-danger');
            this.fetchUsers();
            this.hideConfirmationDialog();
        })
    }

    getSelectedUser = () => {
        let managementUsers = document.getElementsByName("managementUser");
        let selectedUser = null;
        for(let i=0; i<managementUsers.length; i++) {
            if(managementUsers[i].checked) {
                selectedUser = managementUsers[i].value.split(',');
                selectedUser = {
                    userId: selectedUser[0],
                    username: selectedUser[1]
                }
                break;
            }
        }
        return selectedUser;
    }
    showCreateDialog = () => {
        this.setState({
            createUser: true
        }, () => {
            document.getElementsByClassName('management-user-dialog')[0].style.display = 'block';
            document.getElementById('route-overlay').style.display = 'block';
        });
    }
    showConfirmationDialog = () => {
        let selectedUser = this.getSelectedUser();
        if(!selectedUser) {
            Flash.message("Please select a user", 'bg-secondary');
            return;
        }
        else {
            this.setState({
                entity: selectedUser.username
            })
            document.getElementById('confirmation-dialog').style.display = 'block';
            document.getElementById('route-overlay').style.display = 'block';
        }
    }
    hideConfirmationDialog = () => {
        document.getElementById('confirmation-dialog').style.display = 'none';
        document.getElementById('route-overlay').style.display = 'none';
    }
    showUpdateUserRolesDialog = () => {
        let selectedUser = this.getSelectedUser();
        if(!selectedUser) {
            Flash.message("Please select a user", 'bg-primary');
            return;
        }
        this.setState({
            updateRoles: true
        }, () => {
            document.getElementById('route-overlay').style.display = 'block';
            let url = "http://localhost:8080/QuizWit/Roles?";
            Request.get(url + "roleType=AssignedAvailable&userId=" + selectedUser.userId)
            .then((res) => {
                if(res.success) {
                    this.setState({
                        assignedRoles: res.assignedRoles,
                        availableRoles: res.availableRoles
                    })
                }
                else {
                    Flash.message(res.error, 'bg-danger');
                }
            })
            
            document.getElementById('update-roles-dialog').style.display = 'block';
        })
    }

    destroyRolesDialog = () => {
        this.setState({
            updateRoles: false
        })
    }

    componentDidMount = () => {
        document.getElementById('route-overlay').style.display = 'none';
        this.fetchUsers();
    }

    render = () => {
        return (
            <>
                <WrapperHeader 
                    heading='Management Users'
                    component={ 
                        <div className='flex-row jc-e'>
                            <button onClick={this.showCreateDialog} className='btn btn-primary btn-small ml-10'>
                                <i className='fas fa-plus mr-5'></i>
                                Create
                            </button>
                            {
                                this.state.managementUsers.length > 0 ? 
                                <>
                                    <button className='btn btn-tertiary btn-small ml-10' onClick={this.showUpdateUserRolesDialog}>
                                        <i className='fas fa-pen mr-5'></i>
                                        Update Roles
                                    </button>
                                    <button className='btn btn-danger btn-small ml-10' onClick={this.showConfirmationDialog}>
                                        <i className='fas fa-trash mr-5'></i>
                                        Delete
                                    </button>
                                </>
                                : ''
                            }
                        </div>
                    }
                />
                <div className='content-loaded pt-10'>
                    <div>
                        <div className='users-container'>
                            {
                                !this.state.load &&
                                <Loader />
                            }
                            {
                                this.state.load && this.state.managementUsers.length > 0 &&
                                <>
                                    <div className='table-container'>
                                        <table>
                                            <thead>
                                                <tr className='flex'>
                                                    <th style={{width: "40px"}}></th>
                                                    <th className='text-left' style={{width: "50px"}}>S&nbsp;No.</th>
                                                    <th className='text-left flex-full' >Username</th>
                                                    <th className='text-left' style={{width: "150px"}}>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.managementUsers.map((d, k) => {
                                                        return <tr key={k}>
                                                            <td className='text-center'>
                                                                <div className='flex-row jc-c'>
                                                                    <label className='custom-radio'>
                                                                        <input type="radio" name="managementUser" value={d.userId + ',' + d.username}/>
                                                                        <span>
                                                                        <i className='fas fa-check'></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>{d.serial}</td>
                                                            <td>{d.username}</td>
                                                            <td>
                                                                <ManagementUserStatus 
                                                                    user={d}
                                                                />
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                                <tr></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            }
                            {
                                !this.state.managementUsers.length && 
                                <div className='primary'>
                                    <ul>
                                        <li>Create a management user.</li>
                                        <li>Assign roles to user.</li>
                                    </ul>
                                </div>
                            }

                                
                        </div>
                        {
                            this.state.createUser &&
                            <ManagementUserDialog fetchUsers={this.fetchUsers}/>
                        }
                        {
                            this.state.updateRoles &&
                            <UpdateRolesDialog 
                                availableRoles={this.state.availableRoles} 
                                assignedRoles={this.state.assignedRoles} 
                                getSelectedUser={this.getSelectedUser} 
                                destroyRolesDialog={this.destroyRolesDialog}
                            />
                        }
                        <ConfirmationDialog 
                            title='Are you sure?'
                            entity={'Username: ' + this.state.entity}
                            message='Management user will be permanently deleted.' 
                            type='danger' 
                            operation={this.deleteUser}
                            btn='Delete'
                            btnClass='btn-danger'
                        />
                    </div>
                </div>
                <WrapperFooter 

                />
            </>
        )
    }

}

export default ManagementUsers;