

import React from 'react';
import DashboardCard from './util/DashboardCard';
import WrapperHeader from './util/WrapperHeader';
import WrapperFooter from './util/WrapperFooter';
import Flash from './services/Flash';
import Request from './services/Request';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                noOfUsers: 0,
                noOfActiveExams: 0,
                activeUsers: 0,
                endedExam: 0,
                totalExams: 0,
                totalAttempts: 0,
                scheduledExam: 0
            }
        };
    }

    fetchDetails = () => {
        let url = "http://localhost:8080/QuizWit/DashBoardCardData";
        Request.get(url)
        .then((res) => {
            if(res.success) {
                console.log(res);
                this.setState({
                    data: {
                        noOfUsers: res.noOfUsers,
                        totalAttempts: res.totalAttempts,
                        scheduledExam: res.scheduledExam,
                        noOfActiveExams: res.noOfActiveExams,
                        totalExams: res.totalExams,
                        endedExam: res.endedExams,
                        activeUsers: res.noOfActiveUsers,
                        

                    }
                });
            }
            else {
                
                Flash.message(res.error, 'bg-danger');
            }
        }) 
    }

    componentDidMount = () => {
        this.fetchDetails();
    }

    render = () => {
        return (
            <>
                <WrapperHeader 
                    heading='Dashboard'
                />
                <div className='content-loaded'>
                    <div>
                        <div className='dashboard-card-container pt-10'>
                            <DashboardCard title="Total Exams" value={this.state.data.totalExams} icon="fas fa-check" color="linear-gradient(45deg,rgb(91, 138, 170), rgb(63 155 218))" />
                            <DashboardCard title="Active Exams" value={this.state.data.noOfActiveExams} icon="fas fa-check" color="linear-gradient(45deg, rgb(102, 144, 105), rgb(88 180 95))" />
                            <DashboardCard title="Scheduled Exams" value={this.state.data.scheduledExam} icon="fas fa-calendar" color="linear-gradient(45deg, rgb(195, 83, 126),rgb(226 54 120))"/>
                            <DashboardCard title="Ended Exams" value={this.state.data.endedExam} icon="fas fa-calendar" color="linear-gradient(45deg, rgb(184, 102, 102), rgb(230 76 76))"/>
                        </div>
                        <div className='dashboard-card-container pt-10'>
                            <DashboardCard title="Management Users" value={this.state.data.noOfUsers} icon="fas fa-users-cog" color="linear-gradient(45deg,rgb(91, 138, 170), rgb(63 155 218))" />
                            <DashboardCard title="Active Users" value={this.state.data.activeUsers} icon="fas fa-check" color="linear-gradient(45deg, rgb(102, 144, 105), rgb(88 180 95))" />
                            <DashboardCard title="Attempts" value={this.state.data.totalAttempts} icon="fas fa-users" color="linear-gradient(45deg, rgb(195, 83, 126),rgb(226 54 120)" /> 
                        </div>
                    </div>
                </div>
                <WrapperFooter />
            </>
        );
    }
}


export default Dashboard;
