import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Request from './services/Request';
import Flash from './services/Flash';

import './css/Signin.css';

function Signin(props) {

    const resetForm = () => {
        document.getElementById('signin-form').reset();
    }

    const login = (e) => {
        e.preventDefault();
        let url = 'http://localhost:8080/QuizWit/Login';
        let data = $('#signin-form').serialize();

        let rememberMe = document.getElementById('remember-me');
        console.log(rememberMe)
        Request.post(url, data)
        .then((res) => {
            console.log(res)
            if(res.success) {
                if(rememberMe.checked) {
                    localStorage.setItem('quizwitAdminEmail', document.getElementById('admin-email').value);
                    localStorage.setItem('quizwitAdminPassword', document.getElementById('admin-password').value);
                }
                props.setAdmin(res.details);
                props.setLogin(true);
                // Flash.message(res.success, 'bg-success');
            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        })
    }

    return (
        <div className='signin-cover cover flex-row'>
            <div className='flex-full flex-col jc-c ai-e'>
                <div>
                    <h2 className='mb-20'>Administrator</h2>
                    <p>
                        Account owner that performs tasks requiring unrestricted access.
                        <br />
                        <br />
                        <Link to='' className='cover-btn'>Learn more on assigning roles</Link>
                    </p>
                    <br />
                    <br />
                    <br />
                    <h2 className='mb-20'>Management User</h2>
                    <p>
                        User within an account that performs tasks based on assigned roles.
                        <br />
                        <br />
                    </p>
                </div>
            </div>
            <div className='flex-full flex-col jc-c ai-s'>
                <form id='signin-form' className='form sign-in-form' onSubmit={login}>
                <div className='flex-row jc-c ai-c mb-20'>
                    <a href='http://localhost:3000'>
                        <img src='images/logo/logo.png' className='logo' alt='logo' />
                    </a>
                </div>
                <div className='header primary'>Sign In | Admin</div>
                <input type="hidden" name="user" value="1" />
                <div className='input-block'>
                    <div className='customized-radio-sticky'>
                        <label>Role</label>
                        <div>
                            <label className='flex-full'>
                                <input type='radio' name='user' value='1' />
                                <span>Administrator</span>
                            </label>
                            <label className='flex-full'>
                                <input type='radio' name='user' value='2' />
                                <span>Management User</span>
                            </label>
                        </div>
                        <div className='response'></div>
                    </div>
                </div>
                <div className='input-block ai-c'>
                    <div className='input-container-floating-bb'>
                        <input id='admin-email' type='text' name='email' required/>
                        <label className='flex-row'>Email/Username</label>
                        <div className='response'></div>
                    </div>
                </div>
                <div className='input-block'>
                    <div className='input-container-floating-bb'>
                        <input id='admin-password' type='password' name='password' required/>
                        <label>Password</label>
                        <div className='response'></div>
                    </div>
                </div>
                <div className='input-block flex-row ai-e'>
                    <label className="custom-toggle-btn">
                        <input type="checkbox" id='remember-me' />
                        <span>
                            <i className="fas fa-check"></i>
                        </span>
                    </label>
                    <p className='ml-10 gray'>Remember me</p>
                </div>
                <div className='flex-row jc-sb mt-20'>
                    <div className='btn btn-fade btn-small' onClick={resetForm}>Reset</div>
                    <button id="admin-registration-btn" className='btn btn-primary btn-small'>Sign In</button>
                </div>
                <div className='footer'>
                    Create an account ? <a className='primary' href='http://localhost:3000/signup'>Sign Up</a>
                    <br />
                    <br />
                    <div className='primary cursor-p'>
                        <i className='fas fa-key mr-5'></i> Forgot password
                    </div>
                </div>
                </form>
            </div>
        </div>
    );
}

export default Signin;
