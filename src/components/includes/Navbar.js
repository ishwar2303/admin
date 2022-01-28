import React from 'react';
import { useState } from 'react';
import NavLink from '../util/NavLink';

import '../css/Navbar.css'

function Navbar() {


    return (
        <>
            <div className='navbar-container'>
                <div id="navbar" className='navbar'>
                    <div id="navbar-link-container" className='links'>
                        <NavLink 
                            description='Dashboard'
                            route='/'
                            icon='fas fa-tachometer-alt'
                            class='navbar-inactive-link'
                        />
                        <div className='link-section'>Exam</div>
                        <NavLink 
                            description='Create'
                            route='/create-exam'
                            icon='fas fa-plus-square'
                            class='navbar-active-link'
                        />
                        <NavLink 
                            description='View'
                            route='/view-exams'
                            icon='fas fa-box'
                            class='navbar-inactive-link'
                        />
                        <div className='link-section'>General</div>
                        <NavLink 
                            description='Settings'
                            route='/settings'
                            icon='fas fa-cog'
                            class='navbar-inactive-link'
                        />
                        <NavLink 
                            description='Contact Us'
                            route='/contact-us'
                            icon='fas fa-phone'
                            class='navbar-inactive-link'
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
