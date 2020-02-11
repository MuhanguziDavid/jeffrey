import { GET_QUESTIONS_SUCCESS } from './types';


export const getQuestions = (payload) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload
});
