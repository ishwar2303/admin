import React from 'react';
import Flash from '../../services/Flash';
import Request from '../../services/Request';
import '../../css/UpdateExamStatusErrorDialog.css';

class UpdateExamStatusErrorDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: this.props.errors
        };
    }

    closeDialog = () => {
        this.props.updateErrors([]);
        document.getElementById('route-overlay').style.display = 'none';
    }

    componentDidMount = () => {
        document.getElementById('route-overlay').style.display = 'block';
    }

    render = () => {
        return (
            <>
                <div id='update-exam-status-error-dialog'>
                    <div className='flex-col jc-sb flex-full'> 
                        <h3 className='primary mb-10'>You must fullfill all the requirements to activate exam.</h3>
                        <div className='errors-container'>
                            <ul style={{listStyle: "decimal"}}>
                                {
                                    this.state.errors.map((d, k) => {
                                        return <li key={k}><i className='fas fa-dot-circle mr-5'></i> {d}</li>
                                    })
                                }
                            </ul>
                        </div>

                        <div className='flex-row jc-e btn-container'>
                            <button className='btn btn-fade btn-small' onClick={this.closeDialog}>Close</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default UpdateExamStatusErrorDialog;