import React from 'react';
import Request from '../services/Request';
import '../css/QuestionNavigationDialog.css';
class QuestionNavigationDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: [],
            sectionId: this.props.sectionId
        }
    }

    fetchQuestionTitles = () => {
        let url = "http://localhost:8080/QuizWit/ViewQuestionForNavigation?sectionId=";
        url += this.state.sectionId;
        Request.get(url)
        .then((res) => {
            let details = res.questionTitles;
            for(let i=0; i<details.length; i++) {
                details[i]["serial"] = i+1;
                if(details[i].question.length >= 45)
                    details[i].question = details[i].question.substr(0, 45) + '...'
            }
            if(res.success) {
                this.setState({
                    question: details
                })
            }
        })
    }

    navigate = (e) => {
        console.log(e);
        console.log(e.target.id)
        this.props.navigateToQuestion(e.target.id);
    }

    closeDialog = () => {
        document.getElementById('question-navigation-dialog').style.display = 'none';
        document.getElementById('route-overlay').style.display = 'none';
    }

    componentDidMount = () => {
        this.fetchQuestionTitles();
    }
    render() {
        return (
            <>
                <div id='question-navigation-dialog'>
                    <div className='flex-col jc-sb flex-full'>
                        <h3 className='mb-10 primary'>
                            <span className='secondary'>{this.props.sectionTitle}</span>
                            <span className='gray'> &gt; </span>
                            <span className='primary'>Questions</span>
                        </h3>
                        <div className='flex-full question-titles-container'>
                            <table>
                                {
                                    this.state.question.map((d, k) => {
                                        return <tr key={k} id={d.serial} >
                                            <td id={d.serial} style={{width: "40px"}} onClick={this.navigate}>{d.serial}</td>
                                            <td id={d.serial} onClick={this.navigate}>{d.question}</td>
                                        </tr>
                                    })
                                }
                            </table>
                        </div>
                        <div className='flex-row jc-e btn-container'>
                            <button className='btn btn-fade btn-small' onClick={this.closeDialog}>Close</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default QuestionNavigationDialog;