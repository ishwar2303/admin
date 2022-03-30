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
                    heading={examTitle + ' > Edit Exam'}
            />
            <div className='content-loaded'>
                <div>
                    { !load && <Loader /> }
                    { load && <EditExamForm examId={examId} /> }
                </div>
            </div>
            <WrapperFooter 
            />
        </>
    )
}

export default EditExam