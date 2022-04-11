
import React from 'react';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import Request from '../services/Request';
import Flash from '../services/Flash';
import TimeToString from '../services/TimeToString';
import DateTime from '../services/DateTime';
class EditExamForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            examDetails: {}
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
    
        this.setState({
            [name]: value
        });
    };

    viewTimerDurationBlock = () => {
        document.getElementById('time-duration-block').style.display = 'flex';
        document.getElementById('time-duration-input-block').style.display = 'block';
    }

    hideTimerDurationBlock = () => {
        document.getElementById('time-duration-block').style.display = 'none';
        document.getElementById('time-duration-input-block').style.display = 'none';
    }

    resetForm = () => {
        let form = document.getElementById('update-exam-form');
        form.reset();
        this.setState({
            private: this.state.examDetails.private,
            difficultyLevel: this.state.examDetails.difficultyLevel,
            sectionNavigation: this.state.examDetails.sectionNavigation
        })
    }

    updateExam = (e) => {
        e.preventDefault();
        let url = "http://localhost:8080/QuizWit/UpdateExamDetails";

        let data = $('#update-exam-form').serialize();

        Request.post(url, data)
        .then((res) => {
            console.log(res);
            this.populateResponse(res);
        })
        
        console.log('submitted');
    }
 
    fetchDetails = () => {
        let url = "http://localhost:8080/QuizWit/ViewExams?examId=";
        url += this.props.examId;
        console.log(url);
        Request.get(url)
        .then((res) => {
            if(res.success) {
                let details = res.examDetails;
                let timestamp = details.startTime;
                details.startTime = (new DateTime(timestamp)).convert();
                this.setState({
                    examDetails: details
                })
                this.setState({
                    difficultyLevel: details.difficultyLevel
                })
                this.setState({
                    private: details.private
                })
                this.setState({
                    timeDuration: details.timeDuration
                })
                this.setState({
                    sectionNavigation: details.sectionNavigation
                })

                let timerType = 1;
                if(details.setSectionTimer == '1') {
                    timerType = 2;
                    this.hideTimerDurationBlock();
                }
                else {
                    this.viewTimerDurationBlock();
                }
                this.setState({
                    timerType
                })

                console.log(details);
            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        }) 
    }


    populateResponse = (res) => {
        let responseBlock = document.getElementById('update-exam-form').getElementsByClassName('response');
        if(res.error) {
            Flash.message(res.error, 'bg-danger');
        }
        if(res.success) {
            this.resetForm();
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
    pickTimeFromSlots = () => {
        let slots = document.getElementsByName('timeDurationSlots');
        for(let i=0; i<slots.length; i++) {
            slots[i].addEventListener('click', (e) => {
                document.getElementsByName('timeDuration')[0].value = e.target.value;
                console.log(e.target.nextElementSibling);
                document.getElementById('time-duration').innerText = (new TimeToString(e.target.value)).convert();
            })
        }
    }
    resetTimeSlots = () => {
        let slots = document.getElementsByName('timeDurationSlots');
        for(let i=0; i<slots.length; i++) {
            slots[i].checked = false;
        }
    }

    convertTime = (e) => {
        let el = e.target;
        let value = el.value;
        let response = el.nextElementSibling;
        let convertedTime = (new TimeToString(parseInt(value))).convert();
        response.innerHTML = convertedTime;
    }
    componentDidMount() {
        this.fetchDetails();
        this.pickTimeFromSlots();
    }
    render() {
        return (
            <form action="" className='pb-10' id="update-exam-form" onSubmit={this.updateExam}>
                <input type="hidden" name="examId" defaultValue={this.props.examId} />
                <div className="input-block">
                    <div className="input-custom">
                        <input type="text" name="title" defaultValue={this.state.examDetails.title} />
                        <label>Title</label>
                        <div className="response"></div>
                    </div>
                </div>
                <div className="input-block">
                    <div className="input-custom">
                        <textarea type="text" name="description" rows="6" defaultValue={this.state.examDetails.description}></textarea>
                        <label>Description</label>
                        <div className="response"></div>
                    </div>
                </div>
                <div className="input-block">
                    <div className="customized-radio-sticky">
                        <label>Difficulty Level</label>
                        <div>
                            <label>
                                <input type="radio" name="difficultyLevel" value="Beginner" checked={this.state.difficultyLevel == 'Beginner' ? true : false} onChange={this.handleChange}/>
                                <span>Beginner</span>
                            </label>
                            <label>
                                <input type="radio" name="difficultyLevel" value="Intermediate" checked={this.state.difficultyLevel == 'Intermediate' ? true : false}  onChange={this.handleChange}/>
                                <span>Intermediate</span>
                            </label>
                            <label>
                                <input type="radio" name="difficultyLevel" value="Advance" checked={this.state.difficultyLevel == 'Advance' ? true : false}  onChange={this.handleChange}/>
                                <span>Advance</span>
                            </label>
                        </div>
                        <div className="response"></div>
                    </div>
                    <div className="customized-radio-sticky">
                        <label>Visibility</label>
                        <div>
                            <label>
                                <input type="radio" name="private" value="0" checked={this.state.private == '0' ? true : false} onChange={this.handleChange}/>
                                <span>Public</span>
                            </label>
                            <label>
                                <input type="radio" name="private" value="1" checked={this.state.private == '1' ? true : false} onChange={this.handleChange}/>
                                <span>Private</span>
                            </label>
                        </div>
                        <div className="response"></div>
                    </div>
                    <div className="customized-radio-sticky">
                        <label>Section Navigation</label>
                        <div>
                            <label>
                                <input type="radio" name="sectionNavigation" value="1" checked={this.state.sectionNavigation == '1' ? true : false} onChange={this.handleChange}/>
                                <span>On</span>
                            </label>
                            <label>
                                <input type="radio" name="sectionNavigation" value="0" checked={this.state.sectionNavigation == '0' ? true : false} onChange={this.handleChange}/>
                                <span>Off</span>
                            </label>
                        </div>
                        <div className="response"></div>
                    </div>
                </div>
                <div className="input-block">
                    <div className="input-custom">
                        <input type="datetime-local" name="startTime" defaultValue={this.state.examDetails.startTime} />
                        <label>Start Time</label>
                        <div className="response"></div>
                    </div>
                </div>
                <div className="input-block">
                    <div className="input-custom">
                        <input type="number" name="windowTime" defaultValue={this.state.examDetails.windowTime} onChange={this.convertTime} />
                        <div className='primary converted-time'>{(new TimeToString(this.state.examDetails.windowTime)).convert()}</div>
                        <label>Window Time</label>
                        <div className="response"></div>
                    </div>
                    <div className="input-custom">
                        <input type="number" name="numberOfAttempts" defaultValue={this.state.examDetails.numberOfAttempts}/>
                        <label>Number of Attempts</label>
                        <div className="response"></div>
                    </div>
                </div>
                <div className='input-block'>
                    <div className="customized-radio-sticky">
                        <label>Timer Type</label>
                        <div>
                            <label onClick={this.viewTimerDurationBlock}>
                                <input type="radio" name="timerType" value="1" checked={this.state.timerType == '1' ? true : false} onChange={this.handleChange}/>
                                <span>Single timer for entire exam</span>
                            </label>
                            <label onClick={this.hideTimerDurationBlock}>
                                <input type="radio" name="timerType" value="2" checked={this.state.timerType == '2' ? true : false} onChange={this.handleChange}/>
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
                                <input type="radio" name="timeDurationSlots" value="0" checked={this.state.timeDurationSlots == '0' ? true : false} onChange={this.handleChange}/>
                                <span>No time limit</span>
                            </label>
                            <label>
                                <input type="radio" name="timeDurationSlots" value="900" checked={this.state.timeDurationSlots == '900' ? true : false} onChange={this.handleChange}/>
                                <span>15 Minutes</span>
                            </label>
                            <label>
                                <input type="radio" name="timeDurationSlots" value="1800" checked={this.state.timeDurationSlots == '1800' ? true : false} onChange={this.handleChange}/>
                                <span>30 Minutes</span>
                            </label>
                            <label>
                                <input type="radio" name="timeDurationSlots" value="2700" checked={this.state.timeDurationSlots == '2700' ? true : false} onChange={this.handleChange}/>
                                <span>45 Minutes</span>
                            </label>
                            <label>
                                <input type="radio" name="timeDurationSlots" value="3600" checked={this.state.timeDurationSlots == '3600' ? true : false} onChange={this.handleChange}/>
                                <span>1 Hour</span>
                            </label>
                            <label>
                                <input type="radio" name="timeDurationSlots" value="7200" checked={this.state.timeDurationSlots == '7200' ? true : false} onChange={this.handleChange}/>
                                <span>2 Hours</span>
                            </label>
                            <label>
                                <input type="radio" name="timeDurationSlots" value="10800" checked={this.state.timeDurationSlots == '10800' ? true : false} onChange={this.handleChange}/>
                                <span>3 Hours</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="input-block" id="time-duration-input-block">
                    <div className="input-custom">
                        <input type="number" name="timeDuration" defaultValue={this.state.timeDuration} onInput={this.resetTimeSlots} onChange={this.convertTime} />
                        <div id='time-duration' className='primary converted-time'>{(new TimeToString(this.state.timeDuration)).convert()}</div>
                        <label>Time Duration</label>
                        <div className="response"></div>
                    </div>
                </div>
                <div className="input-block">
                    <div className="input-custom">
                        <textarea type="text" name="instructions" rows="6" defaultValue={this.state.examDetails.instructions}></textarea>
                        <label>Instructions</label>
                        <div className="response"></div>
                    </div>
                </div>
                <div className='flex-row jc-sb'>
                    <div id='reset-form-btn'  className='btn btn-fade btn-small hidden' onClick={this.resetForm}>Reset</div>
                    <button id='submit-form-btn'  className='btn btn-primary btn-small hidden'>Update</button>
                </div>
            </form>
        );
    }
    
}

export default EditExamForm;
