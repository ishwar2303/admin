import React from 'react';
import { useState, useEffect } from 'react';
import WrapperHeader from './util/WrapperHeader';
import WrapperFooter from './util/WrapperFooter';
import EditExamForm from './exam/EditExamForm';
import Loader from './util/Loader';
import Flash from './services/Flash';
import Request from './services/Request';


function EditExam() {
    const [load, setLoad] = useState(false);
    const [examId, setExamId] = useState(0);
    const [examTitle, setExamTitle] = useState('');
    useEffect(() => {
        let tempExamId = localStorage.getItem('ExamId');
        let tempExamTitle = localStorage.getItem('ExamTitle');
        setExamId(tempExamId);
        setExamTitle(tempExamTitle);
        document.getElementById('route-overlay').style.display = 'none';
        setLoad(true);
    }, []);

    const submitForm = () => {
        document.getElementById('submit-form-btn').click();
    }

    const resetForm = () => {
        document.getElementById('reset-form-btn').click();
    }

    return (
        <>
            <WrapperHeader 
                    heading={
                        <>
                            <span className='secondary'>{examTitle}</span>
                            <span className='gray'> &gt; </span>
                            <span className='success'>Update Exam</span>
                        </>
                    }
            />
            <div className='content-loaded'>
                <div>
                    { !load && <Loader /> }
                    { load && <EditExamForm examId={examId} /> }
                </div>
            </div>
            <WrapperFooter 
                render={
                    <div className='flex-row jc-sb'>
                        <button className='btn btn-fade btn-small' onClick={resetForm}>Reset</button>
                        <button className='btn btn-primary btn-small' onClick={submitForm}>Update</button>
                    </div>
                }
            />
        </>
    )
}

export default EditExam