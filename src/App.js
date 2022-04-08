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
import ManagementUser from './components/ManagementUser';
import AddSection from './components/AddSection';
import EditExam from './components/EditExam';
import EditSection from './components/EditSection';
import AddQuestion from './components/AddQuestion';
import ViewQuestion from './components/ViewQuestion';
import ConvertTimeToString from './components/ConvertTimeToString';

function App() {

  const[login, setLogin] = useState(false);
  const[admin, setAdmin] = useState({});

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
              />
              <div className='body-wrapper'>
                <Navbar />
                <div className='main-wrapper'>
                  <div className='route-loader'>
                    <Routes>
                      <Route path='/' element={<Dashboard />}/>
                      <Route path='/create-exam' element={<CreateExam />}/>
                      <Route path='/edit-exam' element={<EditExam />}/>
                      <Route path='/add-section' element={<AddSection />}/>
                      <Route path='/edit-section' element={<EditSection />}/>
                      <Route path='/add-question' element={<AddQuestion />} />
                      <Route path='/view-exams' element={<ViewExams />}/>
                      <Route path='/view-question' element={<ViewQuestion />} />
                      <Route path='/settings' element={<Settings />}/>
                      <Route path='/ace-editor' element={<ProgramEditor />}/>
                      <Route path='/timer' element={<WorkingOfTimer />}/>
                      <Route path='/management-users' element={<ManagementUser />} />
                      <Route path='/convert-time-to-string' element={<ConvertTimeToString />} />
                      
                    </Routes>
                    <div id='route-overlay'></div>
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
