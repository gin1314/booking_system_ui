import { combineReducers } from '@reduxjs/toolkit';
import { reducer as bookingReducer } from '../slices/booking';
import { reducer as billingReducer } from '../slices/billing';
import { reducer as userReducer } from '../slices/user';

const rootReducer = combineReducers({
  booking: bookingReducer,
  billing: billingReducer,
  user: userReducer
});

export default rootReducer;
