import {
  GET_QUESTIONS_SUCCESS,
  QUESTIONS_ERROR,
} from '../actions/types';

const initialSate = {
  getQuestionsSuccess: {},
  questionsError: false,
};

const QuestionsReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        getQuestionsSuccess: action.payload,
      };
    case QUESTIONS_ERROR:
      return {
        ...state,
        questionsError: action.payload,
      };
    default:
      return state;
  }
};

export default QuestionsReducer;
