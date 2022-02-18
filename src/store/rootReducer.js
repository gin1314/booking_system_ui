import { combineReducers } from '@reduxjs/toolkit';
import { reducer as bookingReducer } from '../slices/booking';
import { reducer as billingReducer } from '../slices/billing';

const rootReducer = combineReducers({
  booking: bookingReducer,
  billing: billingReducer
});

export default rootReducer;
