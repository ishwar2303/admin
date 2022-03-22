import React from 'react'
import '../css/ConfirmationDialog.css';
function ConfirmationDialog(props) {
    const hideDialog = () => {
        document.getElementById('confirmation-dialog').style.display = 'none';
    }
    return (
        <div id='confirmation-dialog' className='confirmation-dialog'>
            <div className='flex-col flex-full jc-sb'>
                <div>
                    <h4 className='primary'>Confirmation Dialog</h4>
                    <p className={props.type}>{props.message}</p>
                </div>
                <div className='flex-full flex-col jc-e'>
                    <div className='flex-row jc-sb'>
                        <button className='btn btn-fade btn-small' onClick={hideDialog}>Cancel</button>
                        <button className={'btn btn-primary btn-small ' + props.btnClass} onClick={props.operation}>{props.btn}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationDialog