import axios from 'axios';

const HttpService = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    "content-type": "application/json",
    "authorization": `Bearer ${localStorage.getItem('token')}`
  }
});

/*** Interceptor ***/

HttpService.interceptors.request.use(request => {

  return request;
}, error => {
  return Promise.reject(error);
});

HttpService.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});

export default HttpService;