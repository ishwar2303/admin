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
        let tempExamId = localStorage.getItem('examId');
        let tempExamTitle = localStorage.getItem('examTitle');
        setExamId(tempExamId);
        setExamTitle(tempExamTitle);
        document.getElementById('route-overlay').style.display = 'none';
        setLoad(true);
    }, []);

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
                    <p className='primary flex-row jc-c' style={{"width": "100%"}}>You can add questions in section once the section is created.</p>
                }
            />
        </>
    );
}

export default AddSection