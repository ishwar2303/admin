import React from 'react';
import { Link } from 'react-router-dom';
import '../css/menubar.css'
import MenuLink from '../util/MenuLink';

function MenuBar() {
  return (
      <div id="menubar" className='menubar'>
          <div className='links'>
              <MenuLink 
                route='/profile'
                description='Profile'
                icon='fas fa-user-circle'
                class=''
              />
              <MenuLink 
                route='/backup'
                description='Backup'
                icon='fas fa-sync-alt'
                class=''
              />
              <div>
                  <div>
                      <i className='fas fa-lock'></i>
                  </div>
                  <div>Change Password</div>
              </div>
              <div>
                  <div>
                      <i className='fas fa-sign-out-alt'></i>
                  </div>
                  <div>Logout</div>
              </div>
          </div>
      </div>
  );
}

export default MenuBar;
