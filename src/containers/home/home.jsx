import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import HomeComponent from '../../components/home/home';
import { getQuestions } from '../../redux/actions/questions';
import { publicDataFetch } from '../../redux/middlewares';


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: '',
      count: 1,
      intervalId: 0,
    };
  }

  itnervalId = 0;

  componentDidMount () {
    const { getQuestionsSuccess } = this.props;
    const { history } = this.props;
    if (!getQuestionsSuccess || !getQuestionsSuccess.questions[0]) {
      history.push('/')
    }
    this.intervalId = setInterval(e => this.updateUnread(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  updateUnread(){
    if (this.state.count > 99) {
      clearInterval(this.intervalId);
    }
    this.setState({
      count: this.state.count + 10
    });
  }

  render() {
    const { getQuestionsSuccess } = this.props;
    const { count } = this.state;
    return (
      <React.Fragment>
        {Object.keys(getQuestionsSuccess.questions).length > 0
          && <HomeComponent questions={getQuestionsSuccess.questions} count={count} />
        }
      </React.Fragment>
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

