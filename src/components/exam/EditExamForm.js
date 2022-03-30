
import React from 'react';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import Request from '../services/Request';
import Flash from '../services/Flash';

function EditExamForm(props) {
    const viewTimerDurationBlock = () => {
        document.getElementById('time-duration-block').style.display = 'flex';
    }

    const hideTimerDurationBlock = () => {
        document.getElementById('time-duration-block').style.display = 'none';
    }

    const resetForm = () => {
        let form = document.getElementById('create-exam-form');
        form.reset();
    }

    const createExam = (e) => {
        e.preventDefault();
        let url = "http://localhost:8080/QuizWit/CreateExam";

        let data = $('#create-exam-form').serialize();

        Request.post(url, data)
        .then((res) => {
            console.log(res);
            populateResponse(res);
        })
        
        console.log('submitted');
    }

    const [examDetails, setExamDetails] = useState({});
    const fetchDetails = () => {
        let url = "http://localhost:8080/QuizWit/ViewExams?examId=";
        url += props.examId;
        console.log(url);
        Request.get(url)
        .then((res) => {
            if(res.success) {
                let details = res.examDetails;
                setExamDetails(details);
                console.log(examDetails)
            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        }) 
    }


    const populateResponse = (res) => {
        let responseBlock = document.getElementById('create-exam-form').getElementsByClassName('response');
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
            responseBlock[0].innerHTML = (log.title ? icon + log.title : '');
            responseBlock[1].innerHTML = (log.description ? icon + log.description : '');

            responseBlock[2].innerHTML = (log.difficultyLevel ? icon + log.difficultyLevel: '');
            responseBlock[3].innerHTML = (log.visibility ? icon + log.visibility: '');
            responseBlock[4].innerHTML = (log.sectionNavigation ? icon + log.sectionNavigation: '');
            responseBlock[5].innerHTML = (log.startTime ? icon + log.startTime: '' );
            responseBlock[6].innerHTML = (log.windowTime ? icon + log.windowTime: '' );
            responseBlock[7].innerHTML = (log.numberOfAttempts ? icon + log.numberOfAttempts: '' );
            responseBlock[8].innerHTML = (log.timerType ? icon + log.timerType: '' );
            responseBlock[9].innerHTML = (log.timerDuration ? icon + log.timerDuration: '' );
            responseBlock[10].innerHTML = (log.instructions ? icon + log.instructions: '' );
        }
    }

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <form action="" className='pb-10' id="create-exam-form" onSubmit={createExam}>
            <div className="input-block">
                <div className="input-custom">
                    <input type="text" name="title" defaultValue={examDetails.title} />
                    <label>Title</label>
                    <div className="response"></div>
                </div>
            </div>
            <div className="input-block">
                <div className="input-custom">
                    <textarea type="text" name="description" rows="6" defaultValue={examDetails.description}></textarea>
                    <label>Description</label>
                    <div className="response"></div>
                </div>
            </div>
            <div className="input-block">
                <div className="customized-radio-sticky">
                    <label>Difficulty Level</label>
                    <div>
                        <label>
                            <input type="radio" name="difficultyLevel" value="1" checked={examDetails.difficultyLevel == 'Beginner' ? true : false}/>
                            <span>Beginner</span>
                        </label>
                        <label>
                            <input type="radio" name="difficultyLevel" value="2" checked={examDetails.difficultyLevel == 'Intermediate' ? true : false}/>
                            <span>Intermediate</span>
                        </label>
                        <label>
                            <input type="radio" name="difficultyLevel" value="3" checked={examDetails.difficultyLevel == 'Advance' ? true : false}/>
                            <span>Advance</span>
                        </label>
                    </div>
                    <div className="response"></div>
                </div>
                <div className="customized-radio-sticky">
                    <label>Visibility</label>
                    <div>
                        <label>
                            <input type="radio" name="visibility" checked={examDetails.private == '0' ? true : false} />
                            <span>Public</span>
                        </label>
                        <label>
                            <input type="radio" name="visibility" value="1" checked={examDetails.private == '1' ? true : false} />
                            <span>Private</span>
                        </label>
                    </div>
                    <div className="response"></div>
                </div>
                <div className="customized-radio-sticky">
                    <label>Section Navigation</label>
                    <div>
                        <label>
                            <input type="radio" name="sectionNavigation" value="1" checked={examDetails.sectionNavigation == '1' ? true : false}/>
                            <span>On</span>
                        </label>
                        <label>
                            <input type="radio" name="sectionNavigation" value="0" checked={examDetails.sectionNavigation == '0' ? true : false} />
                            <span>Off</span>
                        </label>
                    </div>
                    <div className="response"></div>
                </div>
            </div>
            <div className="input-block">
                <div className="input-custom">
                    <input type="datetime-local" name="startTime" defaultValue={examDetails.startTime} />
                    <label>Start Time</label>
                    <div className="response"></div>
                </div>
            </div>
            <div className="input-block">
                <div className="input-custom">
                    <input type="number" name="windowTime" defaultValue={examDetails.windowTime} />
                    <label>Window Time</label>
                    <div className="response"></div>
                </div>
                <div className="input-custom">
                    <input type="number" name="numberOfAttempts" defaultValue={examDetails.numberOfAttempts}/>
                    <label>Number of Attempts</label>
                    <div className="response"></div>
                </div>
            </div>
            <div className='input-block'>
                <div className="customized-radio-sticky">
                    <label>Timer Type</label>
                    <div>
                        <label onClick={viewTimerDurationBlock}>
                            <input type="radio" name="timerType" value="1" checked={examDetails.setEntireExamTimer == '1' ? true : false} />
                            <span>Single timer for entire exam</span>
                        </label>
                        <label onClick={hideTimerDurationBlock}>
                            <input type="radio" name="timerType" value="2" checked={examDetails.setSectionTimer == '1' ? true : false} />
                            <span>Section wise ftimer</span>
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
                            <input type="radio" name="timeDuration" value="0" checked={examDetails.timeDuration == '0' ? true : false} />
                            <span>No time limit</span>
                        </label>
                        <label>
                            <input type="radio" name="timeDuration" value="900" checked={examDetails.timeDuration == '900' ? true : false} />
                            <span>15 Minutes</span>
                        </label>
                        <label>
                            <input type="radio" name="timeDuration" value="1800" checked={examDetails.timeDuration == '1800' ? true : false} />
                            <span>30 Minutes</span>
                        </label>
                        <label>
                            <input type="radio" name="timeDuration" value="2700" checked={examDetails.timeDuration == '2700' ? true : false} />
                            <span>45 Minutes</span>
                        </label>
                        <label>
                            <input type="radio" name="timeDuration" value="3600" checked={examDetails.timeDuration == '3600' ? true : false} />
                            <span>1 Hour</span>
                        </label>
                        <label>
                            <input type="radio" name="timeDuration" value="7200" checked={examDetails.timeDuration == '7200' ? true : false} />
                            <span>2 Hours</span>
                        </label>
                        <label>
                            <input type="radio" name="timeDuration" value="10800" checked={examDetails.timeDuration == '10800' ? true : false} />
                            <span>3 Hours</span>
                        </label>
                    </div>
                    <div className="response"></div>
                </div>
            </div>
            <div className="input-block">
                <div className="input-custom">
                    <textarea type="text" name="instructions" rows="6" defaultValue={examDetails.instructions}></textarea>
                    <label>Instructions</label>
                    <div className="response"></div>
                </div>
            </div>
            <div className='flex-row jc-sb'>
                <div className='btn btn-fade btn-small' onClick={resetForm}>Reset</div>
                <button className='btn btn-primary btn-small'>Update</button>
            </div>
        </form>
    );
}

export default EditExamForm;
