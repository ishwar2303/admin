import React from 'react';
import { useState, useEffect } from 'react';
import LoaderHeading from './util/LoaderHeading';
import ExamCard from './util/ExamCard';
import PageNavigateButton from './util/PageNavigateButton';
import ViewExamHeaderOptions from './util/ViewExamHeaderOptions';
import ExamTableRow from './util/exams/ExamTableRow';
import WrapperFooter from './util/WrapperFooter';
import WrapperHeader from './util/WrapperHeader';
import Request from './services/Request';
import Flash from './services/Flash';
import Loader from './util/Loader';
import ConfirmationDialogWithInput from './util/ConfirmationDialogWithInput';

function ViewExams() {
    const [load, setLoad] = useState(false);
    const [examDetails, setExamDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchDetails = () => {
        setLoad(false);
        let url = "http://localhost:8080/QuizWit/ViewExams?page=";
        url += currentPage;
        let limit = 5;
        let temp = localStorage.getItem("perPageExams");
        if(temp == null) {
            localStorage.setItem("perPageExams", 5);

        }
        else {
            try {
                parseInt(temp);
            } catch(e) {
                Flash.message("bg-danger", "Render exams per page in view exams must be a number");
                return;
            }
            limit = temp;
        }
        url += "&limit=" + limit;
        Request.get(url)
        .then((res) => {
            if(res.success) {
                setLoad(true);
                let details = res.examDetails;
                setTotalPages(res.totalPages);
                setCurrentPage(res.currentPage);
                for(let i=0; i<details.length; i++) {
                    details[i]["serialNo"] = i+1;
                }
                setExamDetails(details);
            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        }) 
    }

    const nextPage = () => {
        if(currentPage < totalPages)
        setCurrentPage(currentPage + 1);
    }

    const prevPage = () => {
        if(currentPage > 1)
            setCurrentPage(currentPage - 1);
    }

    const getSelectedExam = () => {
        let exams = document.getElementsByName('examId');
        let examNames = document.getElementsByClassName('exam-title-value');
        for(let i=0; i<exams.length; i++) {
            if(exams[i].checked)
                return {
                    examId: exams[i].value,
                    examTitle: examNames[i].innerText
                }
        }
        return null;
    }

    const showDeleteExamDialog = () => {
        let deleteMeInput = document.getElementById('delete-me');
        let permanentlyDeleteInput = document.getElementById('permanently-delete');
        deleteMeInput.value = '';
        permanentlyDeleteInput.checked = false;
        let obj = getSelectedExam();
        if(obj) {
            document.getElementById('delete-exam-title').innerText = obj.examTitle;
            document.getElementById('route-overlay').style.display = 'block';
            document.getElementById('confirmation-dialog-with-input').style.display = 'block';
        }
        else {
            Flash.message('Select an exam', 'bg-secondary');
        }
    }

    const hideDeleteExamDialog = () => {
        document.getElementById('confirmation-dialog-with-input').style.display = 'none';
        document.getElementById('route-overlay').style.display = 'none';
    }


    const deleteExam = () => {
        let obj = getSelectedExam();
        let deleteMeInput = document.getElementById('delete-me');
        let permanentlyDeleteInput = document.getElementById('permanently-delete');
        let permanentlyDelete = permanentlyDeleteInput.checked ? 1 : 0;
        if(obj) {
            let examId = obj.examId;
            let data = {
                examId,
                permanentlyDelete
            }
            if(deleteMeInput.value == 'DELETE ME') {
                let url = "http://localhost:8080/QuizWit/DeleteExam";
                Request.post(url, data)
                .then((res) => {
                    if(res.success) {
                        Flash.message(res.success, 'bg-success');
                        hideDeleteExamDialog();
                        fetchDetails();
                    }
                    else {
                        Flash.message(res.error, 'bg-danger');
                    }
                })
            }
            else {
                Flash.message('Please write DELETE ME in input box to delete exam', 'bg-secondary');
            }
        }
        else {
            Flash.message('Select an exam', 'bg-secondary');
        }
         
    }

    const addSection = () => {
        if(setExam()) {
            let a = document.createElement('a');
            a.href = 'add-section';
            a.click();
        }
    }

    const editExam = () => {
        if(setExam()) {
            let a = document.createElement('a');
            a.href = 'edit-exam';
            a.click();
        }
    }

    const setExam = () => {
        let obj = getSelectedExam();
        if(obj) {
            localStorage.setItem('examId', obj.examId);
            localStorage.setItem('examTitle', obj.examTitle);
            return true;
        }
        else {
            Flash.message('Select an exam', 'bg-secondary');
            return false;
        }
    }
    useEffect(() => {
        document.getElementById('route-overlay').style.display = 'none';
    }, []);

    useEffect(() => {
        fetchDetails();
    }, [currentPage])
    return (
    <>
        <WrapperHeader 
            heading='Exams'
            component={
                <div className='flex-row jc-e'>
                    {
                        examDetails.length > 0 ? 
                        <>
                            <button  className='btn btn-primary btn-small ml-10' onClick={addSection}>
                                <i className='fas fa-plus mr-5'></i>
                                Add Section
                            </button>
                            <button className='btn btn-tertiary btn-small ml-10' onClick={editExam}>
                                <i className='fas fa-pen mr-5'></i>
                                Edit
                            </button>
                            <button className='btn btn-danger btn-small ml-10' onClick={showDeleteExamDialog}>
                                <i className='fas fa-trash mr-5'></i>
                                Delete
                            </button>
                        </>
                        : ''
                    }
                </div>
            }
        />
        <div className='content-loaded'>
            <div>
                { !load && <Loader /> }
                { load && 
                    <div className='table-container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>S No.</th>
                                    <th>Exam Title</th>
                                    <th>Visibility</th>
                                    <th>Start Time</th>
                                    <th>Status</th>
                                    <th>Created On</th>
                                    <th className='select-exam-radio-container'>Select</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    examDetails.map((d, k) => {
                                        return <ExamTableRow 
                                            examId={d.examId}
                                            serialNo={d.serialNo}
                                            title={d.title}
                                            visibility={d.private}
                                            startTime={d.startTime}
                                            status={d.isActive}
                                            createdOn={d.timestamp}
                                            fetchDetails={fetchDetails}
                                        />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
                <div className='exam-page-navigation-btns-padding'></div>
            </div>
        </div>
        <ConfirmationDialogWithInput 
            operation={deleteExam}
        />
        <WrapperFooter
            heading=''
            render={
                <div className='flex-row jc-sb flex-full'>
                    <button id="prev-btn" className='btn btn-dark btn-small' onClick={prevPage}>Previous</button>
                    <div className='btn btn-dark btn-small ml-10'>{currentPage + '/' + totalPages}</div>
                    <button id="next-btn" className='btn btn-primary btn-small' onClick={nextPage}>Next</button>
                </div>
            }
        />
    </>
    );
}

export default ViewExams;
