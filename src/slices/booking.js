import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  selectedBookingId: null,
  booking: {},
  forType: '',
  modalParams: {
    title: '',
    close: 'Close',
    agree: 'Ok',
    body: null
  }
};

const slice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    openModal(state, action) {
      state.isModalOpen = true;
      state.booking = action.payload.booking;
      state.forType = action.payload.forType;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.selectedBookingId = null;
    },
    setModalLabels(state, action) {
      state.modalParams = {
        title: action.payload.title,
        close: action.payload.closeLabel,
        agree: action.payload.agreeLabel,
        body: action.payload.body
      };
      //   state.selectedBookingId = null;
    }
  }
});

export const { reducer } = slice;

export const openModal = ({booking, forType}) => (dispatch) => {
  dispatch(slice.actions.openModal({ booking, forType }));
};

export const closeModal = () => (dispatch) => {
  dispatch(slice.actions.closeModal());
};

export const setModalLabels =
  ({ title, closeLabel = 'Close', agreeLabel = 'Ok', body }) =>
  (dispatch) => {
    dispatch(
      slice.actions.setModalLabels({
        title,
        closeLabel,
        agreeLabel,
        body
      })
    );
  };

export default slice;
