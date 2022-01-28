import React from 'react';
import ExamForm from './exam/ExamForm';
import LoaderHeading from './util/LoaderHeading';
function CreateExam() {
  return (
        <>
            <LoaderHeading 
                description='Create Exam'
            />
            <div className='content-loaded'>
                <div>
                    <ExamForm />
                </div>
            </div>
        </>
    );
}

export default CreateExam;
