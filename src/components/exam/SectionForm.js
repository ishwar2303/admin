import React from 'react'
import AddSection from '../AddSection';
import Flash from '../services/Flash';
import $ from 'jquery';
import Request from '../services/Request';
import { useState } from 'react';

function SectionForm(props) {

    const [examId, setExamId] = useState(props.examId);
    const viewTimerDurationBlock = () => {
        document.getElementById('time-duration-block').style.display = 'flex';
    }

    const hideTimerDurationBlock = () => {
        document.getElementById('time-duration-block').style.display = 'none';
    }

    const resetForm = () => {
        let form = document.getElementById('create-section-form');
        form.reset();
    }

    const addSection = (e) => {
        e.preventDefault();
        let url = "http://localhost:8080/QuizWit/AddSection";

        let data = $('#create-section-form').serialize();

        Request.post(url, data)
        .then((res) => {
            console.log(res);
            populateResponse(res);
        })
        
        console.log('submitted');
    }

    const populateResponse = (res) => {
        let responseBlock = document.getElementById('create-section-form').getElementsByClassName('response');
        if(res.error) {
            Flash.message(res.error, 'bg-danger');
        }
        if(res.success) {
            resetForm();
            Flash.message(res.success, 'bg-success');
            document.getElementById('view-exam-nav-link').click();
        }
        else {
            let log = res.errorLog;
            let icon = '<i class="fas fa-exclamation-circle mr-5"></i>';
            if(log.examId) {
                Flash.message(log.examId, 'bg-danger');
            }
            responseBlock[0].innerHTML = (log.title ? icon + log.title : '');
            responseBlock[1].innerHTML = (log.description ? icon + log.description : '');

            responseBlock[2].innerHTML = (log.questionNavigation ? icon + log.questionNavigation: '');
            responseBlock[3].innerHTML = (log.timerType ? icon + log.timerType: '' );
            responseBlock[4].innerHTML = (log.timerDuration ? icon + log.timerDuration: '' );
        }
    }

    return (
        <form action="" className='pb-10' id="create-section-form" onSubmit={addSection}>
            <input type="hidden" defaultValue={examId} name="examId"/>
            <div className="input-block">
                <div className="input-custom">
                    <input type="text" name="title" defaultChecked={true} />
                    <label>Title</label>
                    <div className="response"></div>
                </div>
            </div>
            <div className="input-block">
                <div className="input-custom">
                    <textarea type="text" name="description" rows="6" defaultChecked={true}></textarea>
                    <label>Description</label>
                    <div className="response"></div>
                </div>
            </div>
            <div className="input-block">
                <div className="customized-radio-sticky">
                    <label>Question Navigation</label>
                    <div>
                        <label>
                            <input type="radio" name="questionNavigation" value="1" />
                            <span>On</span>
                        </label>
                        <label>
                            <input type="radio" name="questionNavigation" value="0" defaultChecked={true} />
                            <span>Off</span>
                        </label>
                    </div>
                    <div className="response"></div>
                </div>
            </div>
            <div className='input-block'>
                <div className="customized-radio-sticky">
                    <label>Timer Type</label>
                    <div>
                        <label onClick={viewTimerDurationBlock}>
                            <input type="radio" name="timerType" value="1" />
                            <span>Single timer for entire section</span>
                        </label>
                        <label onClick={hideTimerDurationBlock}>
                            <input type="radio" name="timerType" value="2" />
                            <span>Question wise timer</span>
                        </label>
                    </div>
                    <div className="response"></div>
                </div>
            </div>
            <div className='input-block' id='time-duration-block'>
                <div className="customized-radio-sticky">
                    <label>Time Duration</label>
                    <div>
                        <label>
                            <input type="radio" name="timeDuration" value="0" />
                            <span>No time limit</span>
                        </label>
                        <label>
                            <input type="radio" name="timeDuration" value="900" />
                            <span>15 Minutes</span>
                        </label>
                        <label>
                            <input type="radio" name="timeDuration" value="1800" />
                            <span>30 Minutes</span>
                        </label>
                        <label>
                            <input type="radio" name="timeDuration" value="2700" />
                            <span>45 Minutes</span>
                        </label>
                        <label>
                            <input type="radio" name="timeDuration" value="3600" />
                            <span>1 Hour</span>
                        </label>
                        <label>
                            <input type="radio" name="timeDuration" value="7200" />
                            <span>2 Hours</span>
                        </label>
                        <label>
                            <input type="radio" name="timeDuration" value="10800" />
                            <span>3 Hours</span>
                        </label>
                    </div>
                    <div className="response"></div>
                </div>
            </div>
            <div className='flex-row jc-sb'>
                <div className='btn btn-fade btn-small' onClick={resetForm}>Reset</div>
                <button className='btn btn-primary btn-small'>Add</button>
            </div>
        </form>
    );
}

export default SectionForm