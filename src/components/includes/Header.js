import React from 'react';
import { useState } from 'react';
import '../css/Header.css'
import MenuBar from './MenuBar';

function Header(props) {

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
            <div className='webapp'>
                <a href='http://localhost:3000'>
                    <img src='images/logo/logo.png' className='logo' />
                </a>
            </div>
            <div className='flex-row ai-c'>
                <div id="username">{props.admin.fullName}</div>
                <div className='ml-10 mr-10'>|</div>
                <div className='userphoto-container' onClick={toggleMenubar}>
                    {
                      props.admin.path && 
                      <img src='' alt='Profile photo' />
                    }
                    {
                      !props.admin.path &&
                      <i className='fas fa-user-circle'></i>
                    }
                    <MenuBar 
                      setLogin={props.setLogin}
                      userType={props.admin.userType}
                      changePassword={props.changePassword}
                    />
                </div>
            </div>
          </div>
      </div>
  );
}

export default Header;
