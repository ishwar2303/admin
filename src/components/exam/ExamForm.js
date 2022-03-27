
import React from 'react';

function ExamForm() {
    const viewTimerDurationBlock = () => {
        document.getElementById('time-duration-block').style.display = 'flex';
    }

    const hideTimerDurationBlock = () => {
        document.getElementById('time-duration-block').style.display = 'none';
    }

    const createExam = (e) => {
        e.preventDefault();
        console.log('submitted');
    }

    return (
        <form action="" className='pb-10' onSubmit={createExam}>
            <div className="input-block">
                <div className="input-custom">
                    <input type="text" name="title" required />
                    <label>Title</label>
                    <div className="response"></div>
                </div>
            </div>
            <div className="input-block">
                <div className="input-custom">
                    <textarea type="text" name="description" rows="6" required></textarea>
                    <label>Description</label>
                    <div className="response"></div>
                </div>
            </div>
            <div className="input-block">
                <div className="customized-radio-sticky">
                    <label>Difficulty Level</label>
                    <div>
                        <label>
                            <input type="radio" name="difficultyLevel" />
                            <span>Easy</span>
                        </label>
                        <label>
                            <input type="radio" name="difficultyLevel" />
                            <span>Moderate</span>
                        </label>
                        <label>
                            <input type="radio" name="difficultyLevel" />
                            <span>Advance</span>
                        </label>
                    </div>
                    <div className="response"></div>
                </div>
                <div className="customized-radio-sticky">
                    <label>Visibility</label>
                    <div>
                        <label>
                            <input type="radio" name="visibility" />
                            <span>Public</span>
                        </label>
                        <label>
                            <input type="radio" name="visibility" checked/>
                            <span>Private</span>
                        </label>
                    </div>
                    <div className="response"></div>
                </div>
                <div className="customized-radio-sticky">
                    <label>Section Navigation</label>
                    <div>
                        <label>
                            <input type="radio" name="sectionNavigation" />
                            <span>On</span>
                        </label>
                        <label>
                            <input type="radio" name="sectionNavigation" defaultChecked={true} />
                            <span>Off</span>
                        </label>
                    </div>
                    <div className="response"></div>
                </div>
            </div>
            <div className="input-block">
                <div className="input-custom">
                    <input type="datetime-local" name="startTime" required />
                    <label>Start Time</label>
                    <div className="response"></div>
                </div>
                <div className="input-custom">
                    <input type="datetime-local" name="endTime" required />
                    <label>End Time</label>
                    <div className="response"></div>
                </div>
            </div>
            <div className="input-block">
                <div className="input-custom">
                    <input type="number" name="windowTime" required />
                    <label>Window Time</label>
                    <div className="response"></div>
                </div>
                <div className="input-custom">
                    <input type="number" name="attempts" required/>
                    <label>Number of Attempts</label>
                    <div className="response"></div>
                </div>
            </div>
            <div className='input-block'>
                <div className="customized-radio-sticky">
                    <label>Timer Type</label>
                    <div>
                        <label onClick={viewTimerDurationBlock}>
                            <input type="radio" name="timerType" />
                            <span>Single timer for entire exam</span>
                        </label>
                        <label onClick={hideTimerDurationBlock}>
                            <input type="radio" name="timerType" />
                            <span>Section wise timer</span>
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
                            <input type="radio" name="duration" value="900" />
                            <span>15 Minutes</span>
                        </label>
                        <label>
                            <input type="radio" name="duration" value="1800" />
                            <span>30 Minutes</span>
                        </label>
                        <label>
                            <input type="radio" name="duration" value="2700" />
                            <span>45 Minutes</span>
                        </label>
                        <label>
                            <input type="radio" name="duration" value="3600" />
                            <span>1 Hour</span>
                        </label>
                        <label>
                            <input type="radio" name="duration" value="7200" />
                            <span>2 Hours</span>
                        </label>
                        <label>
                            <input type="radio" name="duration" value="10800" />
                            <span>3 Hours</span>
                        </label>
                    </div>
                    <div className="response"></div>
                </div>
            </div>
            <div className="input-block">
                <div className="input-custom">
                    <textarea type="text" name="instructions" rows="6"></textarea>
                    <label>Instructions</label>
                    <div className="response"></div>
                </div>
            </div>
            <div className='flex-row jc-sb'>
                <div className='btn btn-fade btn-small'>Reset</div>
                <button className='btn btn-primary btn-small'>Create</button>
            </div>
        </form>
    );
}

export default ExamForm;
