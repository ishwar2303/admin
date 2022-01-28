import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import Header from './components/includes/Header';
import Navbar from './components/includes/Navbar';
import Dashboard from './components/Dashboard';
import Footer from './components/includes/Footer';
import Contact from './components/Contact';
import CreateExam from './components/CreateExam';
import AccessDenied from './components/AccessDenied';
import ViewExams from './components/ViewExams';

function App() {
  var access = true;
  return (
    <div className='fix-wrapper'>
      {
        access &&
        <Router>
          <Header />
          <div className='body-wrapper'>
            <Navbar />
            <div className='main-wrapper'>
              <div className='loader'>
                <Routes>
                  <Route path='/' element={<Dashboard />}/>
                  <Route path='/create-exam' element={<CreateExam />}/>
                  <Route path='/view-exams' element={<ViewExams />}/>
                  <Route path='/contact-us' element={<Contact />}/>
                </Routes>
              </div>
            </div>
          </div>
          <Footer />
        </Router>
      }
      {
        !access &&
        <AccessDenied />
      }
    </div>
  );
}

export default App;
