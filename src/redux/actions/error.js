import  { ERROR_OCCURRED } from './types';

const errorAction = (payload) => ({
  type: ERROR_OCCURRED,
  payload
});

export default errorAction;
