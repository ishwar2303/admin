import React from 'react';
import { useState, useEffect } from 'react';
import LoaderHeading from './util/LoaderHeading';
import ExamCard from './util/ExamCard';
import PageNavigateButton from './util/PageNavigateButton';
import ViewExamHeaderOptions from './util/ViewExamHeaderOptions';

function ViewExams() {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [demandPage, setDemandPage] = useState(1);
    const [serialNumber, setSerialNumber] = useState(1);

    const [fetchedData, setFetchedData] = useState([]);

    const getData = async (url) => {
        const response = await fetch(url, {
            method: 'GET'
        });
        return response.json(); 
    }

    const loadExams = () => {
        let URL = 'http://localhost:8080/UploadToS3/admins?page=';
        URL += demandPage;
        URL += '&limit=';
        let entityPerPage = localStorage.getItem('perPageExams');
        if(!entityPerPage) {
            localStorage.setItem('perPageExams', 2);
            entityPerPage = 2;
        }
        else entityPerPage = parseInt(entityPerPage);
        URL += entityPerPage;
        let refreshBtn = document.getElementById('refresh-btn');
        refreshBtn.innerHTML = '<i class="fas fa-sync fa-spin"></i>';
        
        getData(URL)
        .then(data => {
            refreshBtn.innerHTML = '<i class="fas fa-sync"></i>';
            setSerialNumber(1);
            let count = data.count;
            data = data.data;
            let prepareData = [];
            for(let i=0; i<data.length; i+=2) {
                let temp = [];
                temp.push(data[i]);
                if(i+1 < data.length)
                    temp.push(data[i+1]);
                prepareData.push(temp);
            }
            console.log(prepareData);
            setFetchedData(prepareData);

            let tp = Math.ceil(count/entityPerPage);
            setTotalPages(tp);
            console.log('Total Pages: ', tp);
            document.getElementById('current-page').innerText = demandPage + '/' + totalPages;
        });
    }

    const nextPage = () => {
        let dp = currentPage;
        dp = dp < totalPages ? dp + 1 : dp;
        setDemandPage(dp);
        setCurrentPage(dp);
    }

    const prevPage = () => {
        let dp = currentPage;
        dp = dp > 1 ? dp - 1 : dp;
        setDemandPage(dp);
        setCurrentPage(dp);
    }

    const pageNumberNavigate = () => {
        let pageElements = document.getElementsByName('pageNumber');
        if(pageElements) {
            for(let i=0; i<pageElements.length; i++) {
                if(pageElements[i].checked) {
                    currentPage = pageElements[i].value;
                    demandPage = currentPage;
                    break;
                }
            }
        }
        loadExams();
    }

    useEffect(() => {
        loadExams();
    }, []);

    useEffect(() => {
        loadExams();
    }, [demandPage, totalPages]);

    return (
    <>
        <LoaderHeading 
            description='Exams'
            component={
                <ViewExamHeaderOptions 
                    onclick={loadExams}
                />
            }
        />
        <div className='content-loaded'>
            <div>
                <div className='flex-col'>
                    {
                        fetchedData.map((d, key) => {
                            if(d.length == 2) {
                                return <div className='exam-card-row'>
                                    <ExamCard 
                                        key={d[0].adminId}
                                        firstName={d[0].firstName}
                                        lastName={d[0].lastName}
                                        email={d[0].email}
                                        contact={d[0].contact}
                                    />
                                    <ExamCard 
                                        key={d[1].adminId}
                                        firstName={d[1].firstName}
                                        lastName={d[1].lastName}
                                        email={d[1].email}
                                        contact={d[1].contact}
                                    />
                                </div>
                            }
                            else {
                                return <div className='exam-card-row'>
                                    <ExamCard 
                                        key={d[0].adminId}
                                        firstName={d[0].firstName}
                                        lastName={d[0].lastName}
                                        email={d[0].email}
                                        contact={d[0].contact}
                                    />
                                    <div></div>
                                </div>
                            }
                            return 
                        })
                    }
                </div>
                <div className='exam-page-navigation-btns-padding'></div>
                <div className='flex-row jc-sb exam-page-navigation-btns'>
                    <button id="prev-btn" className='btn btn-dark btn-small' onClick={prevPage} >Previous</button>
                    <button id="next-btn" className='btn btn-primary btn-small' onClick={nextPage}>Next</button>
                </div>
                {/* <div className='page-navigate-btn-container'>
                    {
                        pages.map((d, key) => {
                            return <PageNavigateButton
                                key={key}
                                number={d}
                                onclick={loadExams}
                            />
                        })
                    }
                </div> */}
            
            </div>
        </div>
    </>
    );
}

export default ViewExams;
