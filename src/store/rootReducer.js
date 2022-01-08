import { combineReducers } from '@reduxjs/toolkit';
import { reducer as bookingReducer } from '../slices/booking';

const rootReducer = combineReducers({
  booking: bookingReducer
});

export default rootReducer;
