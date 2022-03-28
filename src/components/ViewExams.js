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
            console.log(res);
            if(res.success) {
                console.log(res.examDetails);
                setLoad(true);
                let details = res.examDetails;
                setTotalPages(res.totalPages);
                for(let i=0; i<details.length; i++) {
                    details[i]["serialNo"] = i+1;
                }
                setExamDetails(details);
                console.log(details);
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

    useEffect(() => {
        fetchDetails();
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
                            <button  className='btn btn-primary btn-small ml-10'>
                                <i className='fas fa-plus mr-5'></i>
                                Add Section
                            </button>
                            <button className='btn btn-tertiary btn-small ml-10' >
                                <i className='fas fa-pen mr-5'></i>
                                Edit
                            </button>
                            <button className='btn btn-danger btn-small ml-10' >
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
                                            visibility={d.private == 1 ? "Private" : "Public"}
                                            startTime={d.startTime}
                                            status={d.isActive == 1 ? "Active" : "Inactive"}
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
        <WrapperFooter
            heading=''
            render={
                <div className='flex-row jc-sb flex-full'>
                    <button id="prev-btn" className='btn btn-dark btn-small' onClick={prevPage}>Previous</button>
                    <button id="next-btn" className='btn btn-primary btn-small' onClick={nextPage}>Next</button>
                </div>
            }
        />
    </>
    );
}

export default ViewExams;
