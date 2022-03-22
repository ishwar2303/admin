
import React from 'react';
import $ from 'jquery'
function ExamForm() {

    return (
        <form action="">
            <div className="input-block">
                <div className="input-floating">
                    <input type="text" name="title" required />
                    <label>Title</label>
                </div>
            </div>
            <div className="input-block">
                <div className="input-floating">
                    <textarea type="text" name="title" rows="6" required></textarea>
                    <label>Description</label>
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
                </div>
                <div className="input-floating">
                    <input type="number" name="attempts" required/>
                    <label>Number of Attempts</label>
                </div>
            </div>
        </form>
    );
}

export default ExamForm;
