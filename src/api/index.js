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
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

iAxios.interceptors.request.use((config) => {
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

const postCancelBooking = (bookingId, params = {}) => {
  return iAxios.post(`/booking/cancel/${bookingId}`, params);
};

const getAllUsers = (params = {}) => {
  return iAxios.get(`/user`, { params });
};

const putUpdateUser = (userId, params = {}) => {
  return iAxios.put(`/user/${userId}`, params);
};

const deleteUser = (userId, params = {}) => {
  return iAxios.delete(`/user/${userId}`, params);
};

const getAllUsersFiltered = (page = 1, perPage = 5, params = {}) => {
  const defaultParams = {
    sort: '-id',
    per_page: perPage,
    page,
    ...params
  };
  return iAxios.get(`/user`, { params: defaultParams });
};

const postCreateUser = (params = {}) => {
  return iAxios.post('/user', params);
};

export {
  getAllBookings,
  postCreateBooking,
  postConfirmBooking,
  postAssignBooking,
  postCancelBooking,
  postCompleteBooking,
  getAllBookingsFiltered,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getAllUsersFiltered,
  postCreateUser
};
export default iAxios;
