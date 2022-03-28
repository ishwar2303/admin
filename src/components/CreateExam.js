import React from 'react';
import { useState, useEffect } from 'react';
import WrapperHeader from './util/WrapperHeader';
import WrapperFooter from './util/WrapperFooter';
import ExamForm from './exam/ExamForm';
import Loader from './util/Loader';
function CreateExam() {
    const [load, setLoad] = useState(false);
    useEffect(() => {
        setLoad(true);
    }, []);

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
                    <p className='primary flex-row jc-c' style={{"width": "100%"}}>You can add sections in exam once the exam is created.</p>
                }
            />
        </>
    );
}

export default CreateExam;
