import React from 'react';
import Flash from '../../services/Flash';
import Request from '../../services/Request';

class UpdateExamStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            examStatus: this.props.status
        };
    }

    updateStatus = () => {
        let url = "http://localhost:8080/QuizWit/UpdateExamStatus";
        let status = this.state.examStatus == '1' ? 0 : 1;
        let data = {
            examId: this.props.examId,
            status
        }
        Request.post(url, data)
        .then((res) => {
            console.log(res);
            if(res.success) {
                this.setState({
                    examStatus: status
                })
            }
            else {
                this.props.updateErrors([]);
                this.props.updateErrors(res.errorLog);
            }
        })
        
    }

    componentDidMount = () => {
        console.log(this.props);
    }

    render = () => {
        return (
            <>
            <div key={"ID" + this.props.examId} className='flex-row ai-c' style={{width: "150px"}}>
                <label className="custom-toggle-btn mr-5">
                    <input id={this.props.examId} type="checkbox" value={this.state.examStatus} checked={this.state.examStatus == '1' ? true : false} value={"stateVariable" + this.props.examId} onChange={this.updateStatus}/>
                    <span>
                        <i className="fas fa-check"></i>
                    </span>
                </label>
                <div className='mr-10' style={{fontSize: '13px'}}>
                {this.state.examStatus == '1' ? <span className='success'><i className='fa fa-dot-circle-o mr-5'></i>Active</span> : <span className='danger'><i className='fa fa-dot-circle-o mr-5'></i>Inactive</span>}
                </div>
            </div>
            </>
        );
    }
}

export default UpdateExamStatus;