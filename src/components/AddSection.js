import React from 'react'
import { useState, useEffect } from 'react';
import WrapperHeader from './util/WrapperHeader';
import WrapperFooter from './util/WrapperFooter';
import ExamForm from './exam/ExamForm';
import Loader from './util/Loader';
import SectionForm from './exam/SectionForm';


function AddSection() {
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
                        <span className='primary'>{examTitle}</span>
                        <span className='gray'> &gt; </span>
                        <span>Add Section</span>
                    </>
                }

            />
            <div className='content-loaded'>
                <div>
                    { !load && <Loader /> }
                    { load && <SectionForm examId={examId}/> }
                </div>
            </div>
            <WrapperFooter 
                render={

                    <div className='flex-row jc-sb'>
                        <button className='btn btn-fade btn-small' onClick={resetForm}>Reset</button>
                        <p className='tertiary flex-row jc-c' style={{"width": "100%"}}>You can add questions in section once the section is created.</p>
                        <button className='btn btn-primary btn-small' onClick={submitForm}>Add</button>
                    </div>
                }
            />
        </>
    );
}

export default AddSection