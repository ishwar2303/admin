import React from 'react';
import '../../css/ChooseQuestionTemplate.css';
class ChooseQuestionTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    closeDialog() {
        document.getElementById('choose-question-template').style.display = 'none';
        document.getElementById('route-overlay').style.display = 'none';
    }

    componentDidMount() {

    }

    render() {
        return (
            <div id='choose-question-template'>
                <div>
                    <div>
                        <h3 className='secondary'>Choose Question Template</h3>
                        <div className='category-options'>
                            <div>
                                <label>
                                    <input type="radio" name="questionTemplateType" value="TF" />
                                    <span>
                                    <i className="fas fa-circle"></i>
                                        <p>True or False</p>
                                    </span>
                                </label>
                                <label>
                                    <input type="radio" name="questionTemplateType" value="DATABASE" />
                                    <span>
                                        <i className='fas fa-database'></i>
                                        <p>Database Query</p>
                                    </span>
                                </label>
                                <label>
                                    <input type="radio" name="questionTemplateType" value="PROGRAMMING" />
                                    <span>
                                        <i className='fas fa-code'></i>
                                        <p>Programming</p>
                                    </span>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" name="questionTemplateType" value="MCQ SC"/>
                                    <span>
                                        <img src="images/assets/list-radio.png" alt="" />
                                        <p>Multiple Choice Question <br/> Single Correct</p>
                                    </span>
                                </label>
                                <label>
                                    <input type="radio" name="questionTemplateType" value="MCQ MC"/>
                                    <span>
                                        <img src="images/assets/list-check.png" alt="" />
                                        <p>Multiple Choice Question <br/> Multiple Correct</p>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='flex-row jc-sb'>
                        <button className='btn btn-fade btn-small' onClick={this.closeDialog}>Close</button>
                        <button className='btn btn-primary btn-small' onClick={this.props.operation}>Load</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChooseQuestionTemplate;