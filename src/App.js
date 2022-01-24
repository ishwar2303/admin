import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import Header from './components/includes/Header';
import Navbar from './components/includes/Navbar';
import Dashboard from './components/Dashboard';
import Footer from './components/includes/Footer';
import Contact from './components/Contact';

function App() {
  return (
    <div className='fix-wrapper'>
      <Router>
        <Header />
        <div className='body-wrapper'>
          <Navbar />
          <div className='main-wrapper'>
            <div className='loader'>
              <Routes>
                <Route path='/' element={<Dashboard />}/>
                <Route path='/contact-us' element={<Contact />}/>
              </Routes>
            </div>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
