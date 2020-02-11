import axios from 'axios';
import errorOccured  from '../actions/error';


const axiosInstance = axios.create({
  baseURL: 'https://jeffrey-game-api.herokuapp.com/v1/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const publicDataFetch = (endpoint, actionCreator) => (dispatch) => {
  return axiosInstance.get(endpoint).then((response) => {
    dispatch(actionCreator(response.data));
  }).catch((error) => {
    dispatch(errorOccured(error));
  });
};
