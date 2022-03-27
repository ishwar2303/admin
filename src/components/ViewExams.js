import React from 'react';
import { useState, useEffect } from 'react';
import LoaderHeading from './util/LoaderHeading';
import ExamCard from './util/ExamCard';
import PageNavigateButton from './util/PageNavigateButton';
import ViewExamHeaderOptions from './util/ViewExamHeaderOptions';
import ExamTableRow from './util/exams/ExamTableRow';
import WrapperFooter from './util/WrapperFooter';
import WrapperHeader from './util/WrapperHeader';

function ViewExams() {
    
    return (
    <>
        <WrapperHeader 
            heading='Exams'
        />
        <div className='content-loaded'>
            <div>
                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>Exam Title</th>
                                <th>Visibility</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ExamTableRow 
                                serialNo="1"
                                title="General Aptitude"
                                visibility="Private"
                                startTime="23 march, 2022"
                                endTime="24 march, 2022"
                                status="Active"
                            />
                            <ExamTableRow 
                                serialNo="1"
                                title="General Aptitude"
                                visibility="Private"
                                startTime="23 march, 2022"
                                endTime="24 march, 2022"
                                status="Active"
                            />
                            <ExamTableRow 
                                serialNo="1"
                                title="General Aptitude"
                                visibility="Private"
                                startTime="23 march, 2022"
                                endTime="24 march, 2022"
                                status="Active"
                            />
                            <ExamTableRow 
                                serialNo="1"
                                title="General Aptitude"
                                visibility="Private"
                                startTime="23 march, 2022"
                                endTime="24 march, 2022"
                                status="Active"
                            />
                            <ExamTableRow 
                                serialNo="1"
                                title="General Aptitude"
                                visibility="Private"
                                startTime="23 march, 2022"
                                endTime="24 march, 2022"
                                status="Active"
                            />
                            <ExamTableRow 
                                serialNo="1"
                                title="General Aptitude"
                                visibility="Private"
                                startTime="23 march, 2022"
                                endTime="24 march, 2022"
                                status="Active"
                            />
                            <ExamTableRow 
                                serialNo="1"
                                title="General Aptitude"
                                visibility="Private"
                                startTime="23 march, 2022"
                                endTime="24 march, 2022"
                                status="Active"
                            />
                            <ExamTableRow 
                                serialNo="1"
                                title="General Aptitude"
                                visibility="Private"
                                startTime="23 march, 2022"
                                endTime="24 march, 2022"
                                status="Active"
                            />
                        </tbody>
                    </table>
                </div>
                <div className='exam-page-navigation-btns-padding'></div>
            </div>
        </div>
        <WrapperFooter
            heading=''
            render={
                <div className='flex-row jc-sb flex-full'>
                    <button id="prev-btn" className='btn btn-dark btn-small'>Previous</button>
                    <button id="next-btn" className='btn btn-primary btn-small'>Next</button>
                </div>
            }
        />
    </>
    );
}

export default ViewExams;
