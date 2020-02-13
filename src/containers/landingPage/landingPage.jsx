import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import LandingPageComponent from '../../components/landingPage/landingPage';
import { getQuestions } from '../../redux/actions/questions';
import { publicDataFetch } from '../../redux/middlewares';


export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: '',
      count: 1,
    };
  }

  intervalId = 0;

  componentDidMount () {
    this.fetchQuestions();
    this.intervalId = setInterval(() => this.updateUnread(), 400);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  updateUnread(){
    if (this.state.count > 99) {
      clearInterval(this.intervalId);
    }
    this.setState({
      count: this.state.count + 10
    });
  }

  componentDidUpdate (nextProps) {
    const { getQuestionsSuccess } = nextProps;
    const { count } = this.state;
    const { history } = this.props;
    if (getQuestionsSuccess && count>99) {
      history.push('/home')
    }
  }

  fetchQuestions = async () => {
    const { publicDataFetch, getQuestions } = this.props;
    await publicDataFetch('/preset_questions/1/', getQuestions, 'game started');
  }

  render() {
    const { count } = this.state;
    return (
      <LandingPageComponent
        count={count}
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


LandingPage.propTypes = {
  getQuestionsSuccess: PropTypes.object,
  getQuestions: PropTypes.func.isRequired,
  publicDataFetch: PropTypes.func.isRequired,
};

LandingPage.defaultProps = {
  getQuestionsSuccess: {},
};

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(LandingPage);

