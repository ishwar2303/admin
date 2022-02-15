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
import Profile from './components/Profile';
import CreateExam from './components/CreateExam';
import ReactEditor from './components/ReactEditor';
import WorkingOfTimer from './components/WorkingOfTimer';

function App() {

  const[login, setLogin] = useState(true);
  const[admin, setAdmin] = useState({});

  useEffect(() => {
    let url = 'http://localhost:8080/QuizWit/Login';
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
        console.log(res)
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
                  <div className='loader'>
                    <Routes>
                      <Route path='/' element={<Dashboard />}/>
                      <Route path='/profile' element={<Profile admin={admin} />}/>
                      <Route path='/create-exam' element={<CreateExam />}/>
                      <Route path='/view-exams' element={<ViewExams />}/>
                      <Route path='/settings' element={<Settings />}/>
                      <Route path='/ace-editor' element={<ProgramEditor />}/>
                      <Route path='/react-editor' element={<ReactEditor />}/>
                      <Route path='/timer' element={<WorkingOfTimer />}/>
                    </Routes>
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
