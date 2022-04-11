import React from 'react';
import { useState, useEffect } from 'react';
import ExamTableRow from './util/exams/ExamTableRow';
import WrapperFooter from './util/WrapperFooter';
import WrapperHeader from './util/WrapperHeader';
import Request from './services/Request';
import Flash from './services/Flash';
import Loader from './util/Loader';
import ConfirmationDialogWithInput from './util/ConfirmationDialogWithInput';
import Sections from './util/section/Sections';
import TimeToString from './services/TimeToString';
import DateTime from './services/DateTime';

function ViewExams() {
    const getCurrentPageFromCookie = () => {
        let cp = localStorage.getItem("CreatedExam");
        if(cp != null) {
            return 1;
        }
        return localStorage.getItem('ViewExamPage') != null ? parseInt(localStorage.getItem('ViewExamPage')) : 1;
    
    }
    const [load, setLoad] = useState(false);
    const [load2, setLoad2] = useState(true);
    const [examDetails, setExamDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(getCurrentPageFromCookie());
    const [totalPages, setTotalPages] = useState(0);
    const [sectionDetails, setSectionDetails] = useState([]);
    const [examTitle ,setExamTitle] = useState('');

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
            console.log(url)
            if(res.success) {
                console.log(res);
                setLoad(true);
                let details = res.examDetails;
                setTotalPages(res.totalPages);
                setCurrentPage(res.currentPage);
                for(let i=0; i<details.length; i++) {
                    details[i]["serialNo"] = i+1;
                    let tts = new TimeToString(parseInt(details[i].timeDuration));
                    details[i].timeDuration = tts.convert();
                    details[i].startTime = (new DateTime(details[i].startTime)).convertToView();
                    details[i].timestamp = (new DateTime(details[i].timestamp)).convertToView();
                }
                setExamDetails(details);
                loadSection();
                loadAddedSection();
                loadUpdatedSection();
                localStorage.removeItem("CreatedExam");
            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        }) 
    }

    const nextPage = () => {
        if(currentPage < totalPages) {
            localStorage.setItem("ViewExamPage", currentPage + 1);
            setCurrentPage(currentPage + 1);
        }
    }

    const prevPage = () => {
        if(currentPage > 1) {
            localStorage.setItem("ViewExamPage", currentPage - 1);
            setCurrentPage(currentPage - 1);
        }
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
            document.getElementById('confirmation-dialog-with-input').style.display = 'flex';
        }
        else {
            Flash.message('Select an exam', 'bg-primary');
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
                Flash.message('Please write DELETE ME in input box to delete exam', 'bg-primary');
            }
        }
        else {
            Flash.message('Select an exam', 'bg-primary');
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
            localStorage.setItem('ExamId', obj.examId);
            localStorage.setItem('ExamTitle', obj.examTitle);
            return true;
        }
        else {
            Flash.message('Select an exam', 'bg-primary');
            return false;
        }
    }

    const fetchSections = () => {
        let obj = getSelectedExam();
        if(obj) {
            setLoad2(false);
            document.getElementById('route-overlay').style.display = 'block';
            let url = "http://localhost:8080/QuizWit/ViewSections?examId=";
            url += obj.examId;
            Request.get(url)
            .then((res) => {
                if(res.success) {
                    let details = res.sectionDetails;
                    for(let i=0; i<details.length; i++)
                        details[i]["serialNo"] = i+1;
                    setSectionDetails(details);
                    setLoad2(true);
                    document.getElementById('route-overlay').style.display = 'none';
                    if(details.length == 0) {
                        Flash.message("Exam doesn't contain any section to show", "bg-primary");
                    }
                    else {
                        document.getElementById('route-overlay').style.display = 'block';
                        document.getElementById('sections-dialog').style.display = 'flex';
                    }
                }
            })
        }
        else {
            Flash.message('Select an exam', 'bg-secondary');
            return false;
        }
    }

    const viewSections = () => {
        let obj = getSelectedExam();
        if(obj) {
            setExamTitle(obj.examTitle);
            localStorage.setItem('ViewSectionExamTitle', obj.examTitle);
            localStorage.setItem('ViewSectionExamId', obj.examId);
            fetchSections();
        }
        else {
            Flash.message('Select an exam', 'bg-primary');
        }
    }

    const loadAddedSection = () => {
        let ce = localStorage.getItem("SectionAdded");
        if(ce) {
            let ei = document.getElementsByName('examId');

            let control = false;
            for(let i=0; i<ei.length; i++) {
                if(ei[i].value == ce) {
                    ei[i].checked = true;
                    control = true;
                    break;
                }
            }
            if(control) {
                viewSections();
                localStorage.setItem("SectionAdded", null);
                return true;
            }
            return false;
        }
        return false;
    }

    const loadSection = () => {
        let ce = localStorage.getItem("ViewSectionExamId");
        if(ce) {
            let ei = document.getElementsByName('examId');

            let control = false;
            for(let i=0; i<ei.length; i++) {
                if(ei[i].value == ce) {
                    ei[i].checked = true;
                    control = true;
                    break;
                }
            }
            if(control)
                viewSections();
        }
    }

    const loadUpdatedSection = () => {
        let ce = localStorage.getItem("SectionUpdated");
        if(ce) {
            let ei = document.getElementsByName('examId');

            let control = false;
            for(let i=0; i<ei.length; i++) {
                if(ei[i].value == ce) {
                    ei[i].checked = true;
                    control = true;
                    break;
                }
            }
            if(control)
                viewSections();
            localStorage.setItem("SectionUpdated", null);
        }
    }


    const createExam = () => {
        document.getElementById('create-exam-nav-link').click();
    }

    useEffect(() => {
        document.getElementById('route-overlay').style.display = 'none';
        let height = document.getElementsByClassName('content-loaded')[0].offsetHeight;
        document.getElementById('table-space-for-exams').style.height = height + 'px';
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
                            <button id='add-section-btn' className='btn btn-tertiary btn-small ml-10' onClick={addSection}>
                                <i className='fas fa-plus mr-5'></i>
                                Add Section
                            </button>
                            <button className='btn btn-secondary btn-small ml-10' onClick={viewSections}>
                                <i className='fas fa-box mr-5'></i>
                                View Sections
                            </button>
                            <button className='btn btn-primary btn-small ml-10' onClick={editExam}>
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
                    {
                        examDetails.length == 0 &&
                        <div>
                            <button className='btn btn-primary btn-small' onClick={createExam}>
                                <i className='fas fa-plus mr-5'></i>
                                Create Exam
                            </button>
                        </div>
                    }
                </div>
            }
        />
        <div className='content-loaded'>
            <div  id='table-space-for-exams'>
                {
                    load && !examDetails.length && <div className='primary'>
                        <ul style={{"listStyle":"decimal", "marginLeft":"20px"}}>
                            <li>Create a Exam.</li>
                            <li>Add Section in exam.</li>
                            <li>Choose question from templates.</li>
                            <li>Add Question in sections.</li>
                        </ul>
                    </div>
                }
                { !load && <Loader /> }
                { load && examDetails.length > 0 &&
                    <div className='flex-row flex-full' style={{position: "relative", height: "100%"}}>
                        <div className='table-container table-container-select pt-10 pb-10 flex-full' style={{width: "100px", overflow: "auto"}}>
                            <table style={{width: "1500px"}}>
                                <thead>
                                    <tr>
                                        <th style={{width: "40px"}}></th>
                                        <th className='text-left' style={{width: "50px"}}>S&nbsp;No.</th>
                                        <th className='text-left' style={{width: "300px"}}>Exam&nbsp;Title</th>
                                        <th className='text-left' style={{width: "100px"}}>Visibility</th>
                                        <th className='text-left'>Start&nbsp;Time</th>
                                        <th className='text-center'>Section&nbsp;Navigation</th>
                                        <th className='text-center'>Exam Timer</th>
                                        <th className='text-left'>Time&nbsp;Duration</th>
                                        <th className='text-left' style={{width: "150px"}}>Status</th>
                                        <th className='text-left'>Created&nbsp;On</th>
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
                                                sectionNavigation={d.sectionNavigation}
                                                examTimer={d.setEntireExamTimer}
                                                timeDuration={d.timeDuration}
                                                fetchDetails={fetchDetails}
                                            />
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        </div>
        <ConfirmationDialogWithInput 
            operation={deleteExam}
        />
        {
            load2 && <Sections 
                        sections={sectionDetails} 
                        examTitle={examTitle} 
                        />
        }
        {
            !load2 && <Loader />
        }
        <WrapperFooter
            render={
                examDetails.length > 0 && 
                <div className='flex-row jc-c flex-full'>
                    {
                        <button id="prev-btn" className='btn-small' onClick={prevPage} disabled={currentPage > 1 ? false : true}>
                            <i className={'fas fa-angle-left ' + (currentPage > 1 ? '' : ' disabled-btn')}></i>
                        </button>
                    }
                    {
                        currentPage == 1 &&
                        <div></div>
                    }

                    <div className='btn-small ml-10'>{currentPage + '/' + totalPages}</div>
                    {
                        <button id="next-btn" className='btn-small ml-10' onClick={nextPage} disabled={currentPage < totalPages ? false : true}>
                            <i className={'fas fa-angle-right ' + (currentPage < totalPages ? '' : ' disabled-btn')}></i>
                        </button>

                    }
                    {
                        currentPage == totalPages &&
                        <div></div>
                    }
                </div>
            }
        />
    </>
    );
}

export default ViewExams;
