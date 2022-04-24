import React from 'react';
import { useState, useEffect } from 'react';
import DashboardCard from './util/DashboardCard';
import WrapperHeader from './util/WrapperHeader';
import WrapperFooter from './util/WrapperFooter';
import Flash from './services/Flash';
import Request from './services/Request';

function Dashboard() {
    
    useEffect(() => {
        fetchDetails();
    }, [])

    const [managmentUsers, setManagementUsers] = useState(0);
    const [activeExam, setactiveExam] = useState(0);
    const [scheduledExam, setScheduledExam] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const fetchDetails = () => {
        let url = "http://localhost:8080/QuizWit/DashBoardCardData";
        Request.get(url)
        .then((res) => {
            if(res.success) {
                console.log(res);
                setManagementUsers(res.noOfUsers);
                setactiveExam(res.noOfActiveExams);
                setAttempts(res.totalAttempts);
                setScheduledExam(res.scheduledExam);
                
            }
            else {
                
                Flash.message(res.error, 'bg-danger');
            }
        }) 
    }

    return (
        <>
            <WrapperHeader 
                heading='Dashboard'
            />
            <div className='content-loaded'>
                <div>
                    <div className='dashboard-card-container pt-10'>
                        <DashboardCard title="Active Exams" value={activeExam} icon="fas fa-check" color="linear-gradient(45deg, rgb(102, 144, 105), rgb(88 180 95))" />
                        <DashboardCard title="Scheduled Exams" value={scheduledExam} icon="fas fa-calendar" color="linear-gradient(45deg, rgb(195, 83, 126),rgb(226 54 120))"/>
                        <DashboardCard title="Management Users" value={managmentUsers} icon="fas fa-users-cog" color="linear-gradient(45deg,rgb(91, 138, 170), rgb(63 155 218))" />
                        <DashboardCard title="Attempts" value={attempts} icon="fas fa-users" color="linear-gradient(45deg, rgb(184, 102, 102), rgb(230 76 76))" /> 
                    </div>
                </div>
            </div>
            <WrapperFooter />
        </>
    );
}

export default Dashboard;
