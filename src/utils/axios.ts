import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
});

const mock = new MockAdapter(axios, {
  delayResponse: 1000,
});

mock.onPost('/api/register').reply(200, {
  error: null,
  message: 'User has been created successfully',
});

mock.onPost('/api/login').reply(200, {
  error: null,
  message: 'Login successfully as John Doe',
});

export default axios;
