import React from 'react';
import { useState } from 'react';
import '../css/Footer.css'

function Footer() {
  const [toggle, setToggle] = useState(0);

  async function toggleDivHorizontal(id, t, openWidth, closeWidth)  {
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
      style.innerText = '.link-section{color: rgb(0, 0, 0, 0.4);}';
    }
    document.head.appendChild(style);
  }

  const toggleNavbar = () => {
    setToggle(!toggle);
    toggleDivHorizontal('navbar', toggle, 250, 50)
    .then((v) => {linkSectionToggle()});
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
