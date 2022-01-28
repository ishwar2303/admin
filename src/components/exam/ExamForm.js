
import React from 'react';
import $ from 'jquery'
function ExamForm() {

    const resetForm = () => {
        document.getElementById('exam-form').reset();
    }
    const showTimer = () => {
        document.getElementById('exam-timer').style.display = 'block';
    }
    const hideTimer = () => {
        document.getElementById('exam-timer').style.display = 'none';
    }
    const submitForm = (e) => {
        e.preventDefault();
        let formData = $('#exam-form').serialize();
        console.log(formData);
        let URL = 'http://localhost:8080/MajorProject/SubmitForm';
        $.ajax({
            url: URL,
            type: 'POST',
            data: formData,
            success: (msg) => {
                console.log('request fulfilled');
            },
            complete: (res) => {
                console.log(res.responseText);
            }
        })
    }
    return (
        <form id='exam-form' onSubmit={submitForm}>
            <div className='input-block'>
                <div className='input-container-bb'>
                    <input type='text' name='examTitle' />
                    <label>Exam Title</label>
                </div>
            </div>
            <div className='input-block'>
                <div className='input-container-bb'>
                    <textarea type='text' name='examDescription' rows='6'></textarea>
                    <label>Exam Title</label>
                </div>
            </div>

            <div className='input-block'>
                <div className='customized-radio-sticky'>
                    <label>Difficulty Level</label>
                    <div>
                        <label>
                            <input type='radio' name='difficultyLevel' value='1' />
                            <span>Easy</span>
                        </label>
                        <label>
                            <input type='radio' name='difficultyLevel' value='2' />
                            <span>Medium</span>
                        </label>
                        <label>
                            <input type='radio' name='difficultyLevel' value='3' />
                            <span>Advance</span>
                        </label>
                    </div>
                </div>
                <div className='customized-radio-sticky'>
                    <label>Visibility</label>
                    <div>
                        <label>
                            <input type='radio' name='visibility' value='private' />
                            <span>Private</span>
                        </label>
                        <label>
                            <input type='radio' name='visibility' value='public' />
                            <span>Public</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className='input-block'>
                <div className='customized-radio-sticky'>
                    <label>Auto Proctored</label>
                    <div>
                        <label>
                            <input type='radio' name='autoProctored' value='1' />
                            <span>Yes</span>
                        </label>
                        <label>
                            <input type='radio' name='autoProctored' value='0' />
                            <span>No</span>
                        </label>
                    </div>
                </div>
                
                <div className='customized-radio-sticky'>
                    <label>Section Navigation</label>
                    <div>
                        <label>
                            <input type='radio' name='sectionNavigation' value='1' />
                            <span>Yes</span>
                        </label>
                        <label>
                            <input type='radio' name='sectionNavigation' value='0' />
                            <span>No</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className='input-block'>
                <div className='customized-radio-sticky'>
                    <label>Timer Type</label>
                    <div>
                        <label onClick={showTimer}>
                            <input type='radio' name='timer' value='exam' />
                            <span>Exam Timer</span>
                        </label>
                        <label onClick={hideTimer}>
                            <input type='radio' name='timer' value='section' />
                            <span>Section Timer</span>
                        </label>
                    </div>
                </div>
                <div className='input-container-bb'>
                    <input type='number' name='numberOfAttempts' />
                    <label>Number of Attempts</label>
                </div>
            </div>
            <div id='exam-timer' className='input-block hidden'>
                <div className='customized-radio-sticky'>
                    <label>Timer</label>
                    <div>
                        <label>
                            <input type='radio' name='examTimer' value='900' />
                            <span>15 Minutes</span>
                        </label>
                        <label>
                            <input type='radio' name='examTimer' value='1800' />
                            <span>30 Minutes</span>
                        </label>
                        <label>
                            <input type='radio' name='examTimer' value='2700' />
                            <span>45 Minutes</span>
                        </label>
                        <label>
                            <input type='radio' name='examTimer' value='3600' />
                            <span>1 Hour</span>
                        </label>
                        <label>
                            <input type='radio' name='examTimer' value='7200' />
                            <span>2 Hours</span>
                        </label>
                        <label>
                            <input type='radio' name='examTimer' value='10800' />
                            <span>3 Hours</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className='input-block'>
                <div className='input-container-bb'>
                    <input type='datetime-local' name='startTime' />
                    <label>Start Time</label>
                </div>
                <div className='input-container-bb'>
                    <input type='datetime-local' name='endTime' />
                    <label>End Time</label>
                </div>
            </div>
            <div className='flex-row jc-sb mt-10'>
                <div className='btn btn-fade btn-medium' onClick={resetForm}>Reset</div>
                <button className='btn btn-primary btn-medium'>Create</button>
            </div>
            <div className='footer p-10'>Make sure to keep your exam visibility private if you want only user group to appear in the exam.</div>
        </form>
    );
}

export default ExamForm;
