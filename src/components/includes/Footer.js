import React from 'react';
import { useState } from 'react';
import '../css/Footer.css'

function Footer() {
  const [toggle, setToggle] = useState(0);

  const toggleDivHorizontal = (id, t, openWidth, closeWidth) => {
    let el = document.getElementById(id);
    let width = t ? openWidth : closeWidth;
    el.style.transition = "all 800ms";
    el.style.width = width + 'px';
  }

  const linkSectionToggle = () => {
    let style = document.createElement('style');
    if(!toggle) {
      style.innerText = '.link-section{color: white;}';
    }
    else {
      style.innerText = '.link-section{color: rgb(0, 0, 0, 0.3);}';
    }
    document.head.appendChild(style);
  }

  const fetchNavbarStatus = () => {
    let status = localStorage.getItem('adminNavbarStatus');
    if(status != 'true' && status != 'false') {
      status = 'false';
      localStorage.setItem('adminNavbarStatus', status);
    }
    status = status == 'true' ? 1 : 0;
    setToggle(status);
    console.log('Fetched status: ', toggle);
  }

  const updateNavbarStatus = () => {
    let status = toggle ? 'true' : 'false';
    localStorage.setItem('adminNavbarStatus', status);
    console.log('Update Status: ', status);
  }


  const toggleNavbar = () => {
    // fetchNavbarStatus();
    setToggle(!toggle);
    // updateNavbarStatus();
    toggleDivHorizontal('navbar', toggle, 250, 50)
    linkSectionToggle();
  }

  return (
    <>
      <div className='main-footer-container'>
        <div className='navbar-toggle-btn' onClick={toggleNavbar}>
            <i className='fas fa-bars'></i>
        </div>
        <div className='main-footer'>
            &copy; 2022-2022 QuizWit All rights reserved. 
        </div>
      </div>
    </>
  );
}

export default Footer;
