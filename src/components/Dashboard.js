import React from 'react';
import DashboardCard from './util/DashboardCard';
import WrapperHeader from './util/WrapperHeader';
import WrapperFooter from './util/WrapperFooter';

function Dashboard() {
    return (
        <>
            <WrapperHeader 
                heading='Dashboard'
            />
            <div className='content-loaded'>
                <div>
                    <div className='dashboard-card-container'>
                        <DashboardCard title="Active Exams" value="3" icon="fas fa-check" color="linear-gradient(45deg, rgb(102, 144, 105), rgb(88 180 95))" />
                        <DashboardCard title="Scheduled Exams" value="4" icon="fas fa-calendar" color="linear-gradient(45deg, rgb(195, 83, 126),rgb(226 54 120))"/>
                        <DashboardCard title="Management Users" value="5" icon="fas fa-users-cog" color="linear-gradient(45deg,rgb(91, 138, 170), rgb(63 155 218))" />
                        <DashboardCard title="Attempts" value="257" icon="fas fa-users" color="linear-gradient(45deg, rgb(184, 102, 102), rgb(230 76 76))" /> 
                    </div>
                </div>
            </div>
            <WrapperFooter />
        </>
    );
}

export default Dashboard;
