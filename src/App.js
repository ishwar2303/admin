import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Request from './components/services/Request';
import './App.css';
import './css/Input.css';

import Header from './components/includes/Header';
import Navbar from './components/includes/Navbar';
import Dashboard from './components/Dashboard';
import Footer from './components/includes/Footer';
import ProgramEditor from './components/AceEditor';
import ViewExams from './components/ViewExams';
import Settings from './components/Settings';
import Signin from './components/Signin';
import CreateExam from './components/CreateExam';
import WorkingOfTimer from './components/WorkingOfTimer';
import AddSection from './components/AddSection';
import EditExam from './components/EditExam';
import EditSection from './components/EditSection';
import AddQuestion from './components/AddQuestion';
import ViewQuestion from './components/ViewQuestion';
import ManagementUsers from './components/ManagementUsers';
import ChangePasswordDialog from './components/includes/ChangePasswordDialog';
import Profile from './components/Profile';

function App() {

  const[login, setLogin] = useState(false);
  const[admin, setAdmin] = useState({});
  const[changePassword, setChangePassword] = useState(false);
  useEffect(() => {
    let url = 'http://localhost:8080/QuizWit/LoginAdmin';
    let adminEmail = localStorage.getItem('quizwitAdminEmail');
    let adminPassword = localStorage.getItem('quizwitAdminPassword');
    let data = {user: 1};
    if(adminEmail != '' && adminPassword != '') {
      data = {
        email: adminEmail,
        password: adminPassword,
        user: 1
      };
    }
    Request.post(url, data)
    .then((res) => {
      console.log(res);
        if(res.success) {
            setAdmin(res.details);
            setLogin(true);
        }
    })
  }, [])

  return (
    <div className='fix-wrapper'>
        <Router>
          {
            login &&
            <>
              <Header 
                setLogin={setLogin}
                admin={admin}
                changePassword={setChangePassword}
              />
              <div className='body-wrapper'>
                <Navbar />
                <div className='main-wrapper'>
                  <div className='route-loader'>
                    <Routes>
                      <Route path='/' element={<Dashboard />} setLogin={setLogin}/>
                      <Route path='/create-exam' element={<CreateExam />} setLogin={setLogin}/>
                      <Route path='/edit-exam' element={<EditExam />} setLogin={setLogin}/>
                      <Route path='/add-section' element={<AddSection />} setLogin={setLogin}/>
                      <Route path='/edit-section' element={<EditSection />} setLogin={setLogin}/>
                      <Route path='/add-question' element={<AddQuestion />}  setLogin={setLogin}/>
                      <Route path='/view-exams' element={<ViewExams />} setLogin={setLogin}/>
                      <Route path='/view-question' element={<ViewQuestion />}  setLogin={setLogin}/>
                      <Route path='/settings' element={<Settings />} setLogin={setLogin}/>
                      <Route path='/ace-editor' element={<ProgramEditor />} setLogin={setLogin}/>
                      <Route path='/timer' element={<WorkingOfTimer />} setLogin={setLogin}/>
                      <Route path='/management-users' element={<ManagementUsers />} setLogin={setLogin} />
                      <Route path='/profile' element={<Profile />} setLogin={setLogin} />
                    </Routes>
                    <div id='route-overlay'></div>
                    {
                      changePassword &&
                      <ChangePasswordDialog 
                        changePassword={setChangePassword}
                        setLogin={setLogin}
                      />
                    }
                  </div>
                </div>
              </div>
              <Footer />
            </>
          }
          {
            !login &&
            <Signin 
              setLogin={setLogin}
              setAdmin={setAdmin}
            />}
        </Router>
    </div>
  );
}

export default App;
