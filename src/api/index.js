import axios from 'axios';
import router from 'next/router';

const iAxios = axios.create({
  baseURL: process.env.apiBaseURL,
  // timeout: 1000,
  withCredentials: true,
  headers: {
    Accept: 'application/json'
  }
});

iAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

iAxios.interceptors.request.use(config => {
  if (window.Echo) {
    config.headers['X-Socket-ID'] = window.Echo.socketId();
  }

  return config;
});

const postCreateBooking = (params = {}) => {
  return iAxios.post('/booking', params);
};

const getAllBookings = (params = {}) => {
  return iAxios.get(`/booking`, { params });
};

const getAllBookingsFiltered = (page = 1, perPage = 5, params = {}) => {
  const defaultParams = {
    include: 'verified,shipper',
    sort: '-id',
    per_page: perPage,
    page,
    ...params
  };
  return iAxios.get(`/booking`, {
    params: defaultParams
  });
};

const postConfirmBooking = (bookingId, params = {}) => {
  return iAxios.post(`/booking/confirm/${bookingId}`, params);
};

const postAssignBooking = (bookingId, params = {}) => {
  return iAxios.post(`/booking/assign/${bookingId}`, params);
};

const postCompleteBooking = (bookingId, params = {}) => {
  return iAxios.post(`/booking/complete/${bookingId}`, params);
};

export {
  getAllBookings,
  postCreateBooking,
  postConfirmBooking,
  postAssignBooking,
  postCompleteBooking,
  getAllBookingsFiltered
};
export default iAxios;
