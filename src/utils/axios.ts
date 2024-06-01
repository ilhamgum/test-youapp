import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getCookie } from 'cookies-next';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axios.interceptors.request.use((config) => {
  const token = getCookie('youapp_access_token');

  if (token) {
    config.headers['x-access-token'] = token;
  }

  return config;
});

const mock = new MockAdapter(axios, {
  delayResponse: 1000,
});

mock.onPost('/api/register').reply(200, {
  error: null,
  message: 'User has been created successfully',
});

mock.onPost('/api/login').reply(() => {
  return [
    200,
    {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWFiOGU4MzViMDQ0YTUxM2ZjOWYxNyIsInVzZXJuYW1lIjoiYm9ydW1vY3lsdSIsImVtYWlsIjoibG94dXRAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3MTcyMjE2MTUsImV4cCI6MTcxNzIyNTIxNX0.gv_mTBGNWSJLzRvX3pygeHmTNySgmo1DcSveUxpF1k8',
      error: null,
      message: 'Login successfully as John Doe',
    },
  ];
});

mock.onPut('/api/updateProfile').reply((config) => {
  const profileDataOnLocalStorage = localStorage.getItem('youapp-profile');

  if (profileDataOnLocalStorage) {
    const parsed = JSON.parse(profileDataOnLocalStorage);

    const updated = { ...parsed, ...JSON.parse(config.data), image: '/img/example-photo.png' };

    localStorage.setItem('youapp-profile', JSON.stringify(updated));

    return [200, { data: updated, error: null, message: 'Update profile success' }];
  }

  localStorage.setItem(
    'youapp-profile',
    JSON.stringify({ ...JSON.parse(config.data), image: '/img/example-photo.png' })
  );

  return [
    200,
    {
      data: { ...JSON.parse(config.data), image: '/img/example-photo.png' },
      error: null,
      message: 'Update profile success',
    },
  ];
});

mock.onGet('/api/getProfile').reply(() => {
  const profileDataOnLocalStorage = localStorage.getItem('youapp-profile');

  if (profileDataOnLocalStorage) {
    return [200, { data: JSON.parse(profileDataOnLocalStorage), error: null, message: 'Update profile success' }];
  }

  return [404, { data: null, error: 'Not found', message: 'Profile not found.' }];
});

export default axios;
