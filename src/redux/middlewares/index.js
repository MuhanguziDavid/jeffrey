import axios from 'axios';
import ReconnectingWebSocket from 'reconnecting-websocket';
import errorOccured  from '../actions/error';


const axiosInstance = axios.create({
  baseURL: 'https://jeffrey-game-api.herokuapp.com/v1/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const publicDataFetch = (endpoint, actionCreator, message) => (dispatch) => {
  return axiosInstance.get(endpoint).then((response) => {
    runSocket(message);
    dispatch(actionCreator(response.data));
  }).catch((error) => {
    dispatch(errorOccured(error));
  });
};

export const runSocket = (message) => {
  console.log('messageObj', message);
  const messageObj = {
    message
  }
  let loc = window.location;
  let wsStart = 'ws://';
  if (loc.protocol === 'https:') {
    wsStart = 'wss://';
  }
  let endpoint = wsStart + `jeffrey-game-api.herokuapp.com/`;
  let socket = new ReconnectingWebSocket(endpoint);
  socket.onmessage = (e) => {
    // console.log("message", e);
  };
  socket.onopen = (e) => {
    // console.log("open", e);
    socket.send(JSON.stringify(messageObj));
  };
  socket.onerror = (e) => {
    // console.log("error", e);
  };
  socket.onclose = (e) => {
    // console.log("closed", e);
  };
}
