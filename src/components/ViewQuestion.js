import React from 'react';
import Request from './services/Request';
import Loader from './util/Loader';
import QuestionNavigationDialog from './util/QuestionNavigationDialog';
import MCQMultipleCorrectTemplateEdit from './util/questions/edit/MCQMultipleCorrectTemplateEdit';
import MCQSingleCorrectTemplateEdit from './util/questions/edit/MCQSingleCorrectTemplateEdit';
import TrueFalseTemplateEdit from './util/questions/edit/TrueFalseTemplateEdit';
import WrapperFooter from './util/WrapperFooter';
import WrapperHeader from './util/WrapperHeader';


class ViewQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionId: localStorage.getItem("SectionId"),
            sectionTitle: localStorage.getItem("SectionTitle"),
            questionDetails: {},
            categoryId: '',
            currentPage: 1,
            nextPage: 0,
            totalPages: 0,
            prevPage: 0,
            load: false
        }
    }
    fetchQuestion = () => {
        this.setState({
            load: false
        }, () => {
            let url = "http://localhost:8080/QuizWit/ViewQuestion?sectionId=";
            url += this.state.sectionId; // section ID
            url += "&page="
            url += this.state.currentPage; // page number
            Request.get(url)
            .then((res) => {
                console.log(res);
                this.setState({
                    totalPages: res.totalQuestions
                })
                if(res.success) {
                    let details = res.questionDetails;
                    this.setState({
                        questionDetails: {},
                        categoryId: 0
                    }, () => {
                        this.setState({
                            questionDetails: details,
                            categoryId: details.categoryId
                        }, () => {
                            this.setState({
                                load: true
                            })
                        })
                    })
                }
            })
        })
    }
    resetQuestionForm = () => {
        document.getElementById('reset-question-form').click();
    }

    updateQuestionForm = () => {
        document.getElementById('submit-question-form').click();
    }

    nextPage = () => {
        if(this.state.currentPage < this.state.totalPages) {
            localStorage.setItem("ViewQuestionPage", this.state.currentPage + 1);
            this.setState({
                currentPage: this.state.currentPage + 1
            }, () => {this.fetchQuestion()})
        }
    }

    prevPage = () => {
        if(this.state.currentPage > 1) {
            localStorage.setItem("ViewQuestionPage", this.state.currentPage - 1);
            this.setState({
                currentPage: this.state.currentPage - 1
            }, () => {this.fetchQuestion()})
        }
    }

    navigateToQuestion = (page) => {
        this.setState({
            currentPage: parseInt(page)
        }, () => {this.fetchQuestion(); this.hideNavigateDialog();})
    }

    showNavigateDialog = () => {
        document.getElementById('question-navigation-dialog').style.display = 'flex';
        document.getElementById('route-overlay').style.display = 'block';
    }

    hideNavigateDialog = () => {
        document.getElementById('question-navigation-dialog').style.display = 'none';
        document.getElementById('route-overlay').style.display = 'none';
    }

    componentDidMount = () => {
        this.fetchQuestion();
    }
    render() {
        return (
            <>
                <WrapperHeader
                heading={
                    <>
                        <span className='primary'>{this.state.sectionTitle}</span>
                        <span className='gray'> &gt; </span>
                        <span>Update Question</span>
                        <span className='gray'> &gt; </span>
                        <span className='success'>
                            {
                                this.state.categoryId == '1' && 'Multiple Choice Question | Single Correct'
                            }
                            {
                                this.state.categoryId == '2' && 'Multiple Choice Question | Multiple Correct'
                            }
                            {
                                this.state.categoryId == '3' && 'True or False'
                            }
                        </span>
                    </>
                }
                
                component={
                    <div>
                        <button className='btn btn-secondary btn-small ml-10' onClick={this.showNavigateDialog}>
                            <i className='fas fa-location-arrow mr-5'></i>
                            Navigate
                        </button>
                        <button className='btn btn-danger btn-small ml-10'>
                            <i className='fas fa-trash mr-5'></i>
                            Delete
                        </button>
                    </div>
                }
                />
                {
                    !this.state.load &&
                    <Loader />
                }
                <div className='content-loaded'>
                    <div>
                        {
                            this.state.categoryId == '3' &&
                            <TrueFalseTemplateEdit questionDetails={this.state.questionDetails} />
                        }
                        {
                            this.state.categoryId == '1' &&
                            <MCQSingleCorrectTemplateEdit questionDetails={this.state.questionDetails} />
                        }
                        {
                            this.state.categoryId == '2' &&
                            <MCQMultipleCorrectTemplateEdit questionDetails={this.state.questionDetails} />
                        }
                        <QuestionNavigationDialog sectionId={this.state.sectionId} sectionTitle={this.state.sectionTitle} navigateToQuestion={this.navigateToQuestion}/>
                    </div>
                </div>
                <WrapperFooter
                    render={
                        <div className='flex-row jc-sb'>
                            <button id='reset-question-form-btn' className='btn btn-fade btn-small' onClick={this.resetQuestionForm}>Reset</button>
                            <div className='flex-row jc-c flex-full'>
                                {
                                    <button id="prev-btn" className='btn-small' onClick={this.prevPage} disabled={this.state.currentPage > 1 ? false : true}>
                                        <i className={'fas fa-angle-left ' + (this.state.currentPage > 1 ? '' : ' disabled-btn')}></i>
                                    </button>
                                }
                                {
                                    this.state.currentPage == 1 &&
                                    <div></div>
                                }

                                <div className='btn-small ml-10'>{this.state.currentPage + '/' + this.state.totalPages}</div>
                                {
                                    <button id="next-btn" className='btn-small ml-10' onClick={this.nextPage} disabled={this.state.currentPage < this.state.totalPages ? false : true}>
                                        <i className={'fas fa-angle-right ' + (this.state.currentPage < this.state.totalPages ? '' : ' disabled-btn')}></i>
                                    </button>

                                }
                                {
                                    this.state.currentPage == this.state.totalPages &&
                                    <div></div>
                                }
                            </div>
                            <button id='add-question-form-btn' className='btn btn-primary btn-small' onClick={this.updateQuestionForm}>Update</button>
                        </div>
                    }
                />
            </>
        );
    }
}

export default ViewQuestion;