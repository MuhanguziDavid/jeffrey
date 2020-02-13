import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import HomeComponent from '../../components/home/home';
import { getQuestions } from '../../redux/actions/questions';
import { publicDataFetch, runSocket } from '../../redux/middlewares';


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: '',
      count: 1,
      questionIndex: 0,
    };
  }

  itnervalId = 0;

  componentDidMount () {
    const { history, getQuestionsSuccess } = this.props;
    const { questionIndex } = this.state;
    if (!getQuestionsSuccess || getQuestionsSuccess.questions === undefined || getQuestionsSuccess.questions[questionIndex] === undefined) {
      history.push('/')
    }
    this.intervalId = setInterval(e => this.updateUnread(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  updateUnread() {
    if (this.state.count > 99) {
      clearInterval(this.intervalId);
    }
    this.setState({
      count: this.state.count + 10
    });
  }

  handleQuestionIndex = index => {
    this.setState({
      questionIndex: this.state.questionIndex + 1,
      count: 1,
    })
    this.intervalId = setInterval(e => this.updateUnread(), 1000);
  }

  handleSocket = id => {
    runSocket(id);
  }

  render() {
    const { history, getQuestionsSuccess } = this.props;
    const { count, questionIndex } = this.state;
    return (
      <HomeComponent
        questions={getQuestionsSuccess.questions}
        count={count}
        handleQuestionIndex={this.handleQuestionIndex}
        questionIndex={questionIndex}
        history={history}
        intervalId={this.intervalId}
        handleSocket={this.handleSocket}
      />
    );
  };
};

const mapStateToProps = state => {
  return {
    getQuestionsSuccess: state.questionsReducer.getQuestionsSuccess,
  };
};

const matchDispatchToProps = (dispatch) => bindActionCreators({getQuestions, publicDataFetch}, dispatch);


Home.propTypes = {
  getQuestionsSuccess: PropTypes.object,
  getQuestions: PropTypes.func.isRequired,
  publicDataFetch: PropTypes.func.isRequired,
};

Home.defaultProps = {
  getQuestionsSuccess: {},
};

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Home);

