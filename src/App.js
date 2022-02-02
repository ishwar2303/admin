import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Request from './components/services/Request';
import './App.css';

import Header from './components/includes/Header';
import Navbar from './components/includes/Navbar';
import Dashboard from './components/Dashboard';
import Footer from './components/includes/Footer';
import Contact from './components/Contact';
import CreateExam from './components/CreateExam';
import ViewExams from './components/ViewExams';
import Settings from './components/Settings';
import Signin from './components/Signin';

function App() {

  const[login, setLogin] = useState(false);
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
      {
        login &&
        <Router>
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
                  <Route path='/create-exam' element={<CreateExam />}/>
                  <Route path='/view-exams' element={<ViewExams />}/>
                  <Route path='/settings' element={<Settings />}/>
                  <Route path='/contact-us' element={<Contact />}/>
                </Routes>
              </div>
            </div>
          </div>
          <Footer />
        </Router>
      }
      {
        !login &&
        <Signin 
          setLogin={setLogin}
          setAdmin={setAdmin}
        />
      }
    </div>
  );
}

export default App;
