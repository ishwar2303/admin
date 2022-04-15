
import React from 'react';
import Flash from '../../services/Flash';
import Request from '../../services/Request';

class ManagementUserStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.user.userId,
            userStatus: this.props.user.isActive == '1' ? 1 : 0
        }
    }

    updateStatus = (e) => {
        let url = "http://localhost:8080/QuizWit/ManagementUser";
        let data = {
            userId: this.state.userId,
            status: e.target.value == '1' ? 1 : 0,
            operation: "UpdateUserStatus"
        }
        Request.post(url, data)
        .then((res) => {
            if(res.success) {
                this.setState({
                    userStatus: !this.state.userStatus
                })
            }
            else Flash.message(res.error, 'bg-danger');

        })
    }

    render = () => {
        return (
            <>
                <div className='flex-row ai-c'>
                    <div>
                        <label className="custom-toggle-btn">
                            <input type="checkbox" checked={this.state.userStatus == 1 ? true : false} value={this.state.userStatus} onChange={this.updateStatus} />
                            <span>
                                <i className="fas fa-check"></i>
                            </span>
                        </label>
                    </div>
                    <div className='ml-5'  style={{fontSize: '13px'}}>
                        {this.state.userStatus == 1 ? <span className='success'><i className='fa fa-dot-circle-o mr-5'></i>Active</span> : <span className='danger'><i className='fa fa-dot-circle-o mr-5'></i>Inactive</span>}
                    </div>
                </div>
            </>
        )
    }

}

export default ManagementUserStatus;