import {
  GET_QUESTIONS_SUCCESS,
  ERROR_OCCURRED,
} from '../actions/types';

const initialSate = {
  getQuestionsSuccess: {},
  questionsError: {},
};

const questionsReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        getQuestionsSuccess: action.payload,
      };
    case ERROR_OCCURRED:
      return {
        ...state,
        questionsError: action.payload,
      };
    default:
      return state;
  }
};

export default questionsReducer;
