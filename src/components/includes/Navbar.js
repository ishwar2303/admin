import React from 'react';
import { useState } from 'react';
import NavLinkCustom from '../util/NavLinkCustom';
import '../css/Navbar.css'

function Navbar() {


    return (
        <>
            <div className='navbar-container'>
                <div id="navbar" className='navbar'>
                    <div id="navbar-link-container" className='links'>
                        <NavLinkCustom 
                            description='Dashboard'
                            route='/'
                            icon='fas fa-tachometer-alt'
                        />
                        <NavLinkCustom 
                            description='Management Users'
                            route='/management-users'
                            icon='fas fa-users-cog'
                        />
                        <div className='link-section'>Exam</div>
                        <NavLinkCustom 
                            description='Create Exam'
                            route='/create-exam'
                            icon='fas fa-plus-square'
                        />
                        <NavLinkCustom 
                            description='View Exams'
                            route='/view-exams'
                            icon='fas fa-box'
                            id='view-exam-nav-link'
                        />
                        <div className='link-section'>General</div>
                        <NavLinkCustom 
                            description='Settings'
                            route='/settings'
                            icon='fas fa-cog'
                        />
                        {/* <NavLinkCustom 
                            description='Program Editor'
                            route='/ace-editor'
                            icon='fas fa-code'
                        />
                        <NavLinkCustom 
                            description='Question Editor'
                            route='/react-editor'
                            icon='fas fa-question'
                        /> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
