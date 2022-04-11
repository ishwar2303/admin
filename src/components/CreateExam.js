import React from 'react';
import { useState, useEffect } from 'react';
import WrapperHeader from './util/WrapperHeader';
import WrapperFooter from './util/WrapperFooter';
import ExamForm from './exam/ExamForm';
import Loader from './util/Loader';
function CreateExam() {
    const [load, setLoad] = useState(false);
    useEffect(() => {
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
                heading='Create Exam'
            />
            <div className='content-loaded'>
                <div>
                    { !load && <Loader /> }
                    { load && <ExamForm /> }
                </div>
            </div>
            <WrapperFooter 
                render={
                    <div className='flex-row jc-sb'>
                        <button className='btn btn-fade btn-small' onClick={resetForm}>Reset</button>
                        <p className='tertiary flex-row jc-c' style={{"width": "100%"}}>You can add sections in exam once the exam is created.</p>
                        <button className='btn btn-primary btn-small' onClick={submitForm}>Create</button>
                    </div>
                }
            />
        </>
    );
}

export default CreateExam;
