import React from 'react';
import { useState } from 'react';
import '../css/Header.css'
import MenuBar from './MenuBar';

function Header() {

  const [toggle, setToggle] = useState(1);

  const toggleDivVertical = (id, t, openHeight, closeHeight) => {
    let el = document.getElementById(id);
    let height = t ? openHeight : closeHeight;
    el.style.transition = "all 700ms";
    el.style.height = height + 'px';
  } 
  const toggleMenubar = () => {
    setToggle(!toggle);
    toggleDivVertical('menubar', toggle, 250, 0);
  }

  return (
      <div className='main-header'>
          <div className='flex-row jc-sb ai-c'>
            <div className='webapp'>QuizWit.com</div>
            <div className='flex-row ai-c'>
                <div id="username">Ishwar Baisla</div>
                <div className='ml-10 mr-10'>|</div>
                <div className='userphoto-container' onClick={toggleMenubar}>
                    <i className='fas fa-user-circle'></i>
                    <MenuBar />
                </div>
            </div>
          </div>
      </div>
  );
}

export default Header;
