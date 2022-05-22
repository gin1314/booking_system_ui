import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  isUploadModalOpen: false,
  isMakeInvoiceModalOpen: false,
  isAssingToEngrModalOpen: false,
  invoiceAmount: null,
  metadata: {},
  bookFilesCloseDialog: false,
  isBookFilesOpen: false,
  selectedBookingId: null,
  booking: {},
  forType: '',
  assignedUserId: null,
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
    openUploadModal(state, action) {
      state.isUploadModalOpen = true;
      state.booking = action.payload.booking;
    },
    closeUploadModal(state, action) {
      state.isUploadModalOpen = false;
      state.selectedBookingId = null;
    },

    openAssignToEngrModal(state, action) {
      state.isAssingToEngrModalOpen = true;
      state.booking = action.payload.booking;
      state.forType = action.payload.forType;
    },
    closeAssignToEngrModal(state, action) {
      state.isAssingToEngrModalOpen = false;
      state.selectedBookingId = null;
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
    },
    openBookFileModal(state, action) {
      state.isBookFilesOpen = true;
      state.booking = action.payload.booking;
    },
    closeBookFileModal(state, action) {
      state.isBookFilesOpen = false;
      state.selectedBookingId = null;
    },
    setAssignedUser(state, action) {
      state.assignedUserId = action.payload.assignedUserId;
    },
    setInvoiceAmount(state, action) {
      state.invoiceAmount = action.payload.invoiceAmount;
      state.metadata = action.payload.metadata;
    },
    openMakeInvoiceModal(state, action) {
      state.isMakeInvoiceModalOpen = true;
      state.booking = action.payload.booking;
      state.forType = action.payload.forType;
    },
    closeMakeInvoiceModal(state, action) {
      state.isMakeInvoiceModalOpen = false;
      state.selectedBookingId = null;
    }
  }
});

export const { reducer } = slice;

export const openModal =
  ({ booking, forType }) =>
  (dispatch) => {
    dispatch(slice.actions.openModal({ booking, forType }));
  };

export const closeModal = () => (dispatch) => {
  dispatch(slice.actions.closeModal());
};

export const openUploadModal =
  ({ booking }) =>
  (dispatch) => {
    dispatch(slice.actions.openUploadModal({ booking }));
  };

export const closeUploadModal = () => (dispatch) => {
  dispatch(slice.actions.closeUploadModal());
};

export const openAssignToEngrModal =
  ({ booking, forType }) =>
  (dispatch) => {
    dispatch(slice.actions.openAssignToEngrModal({ booking, forType }));
  };

export const closeAssignToEngrModal = () => (dispatch) => {
  dispatch(slice.actions.closeAssignToEngrModal());
};

export const openBookFileModal =
  ({ booking }) =>
  (dispatch) => {
    dispatch(slice.actions.openBookFileModal({ booking }));
  };

export const closeBookFileModal = () => (dispatch) => {
  dispatch(slice.actions.closeBookFileModal());
};

export const openMakeInvoiceModal =
  ({ booking }) =>
  (dispatch) => {
    dispatch(slice.actions.openMakeInvoiceModal({ booking }));
  };

export const closeMakeInvoiceModal = () => (dispatch) => {
  dispatch(slice.actions.closeMakeInvoiceModal());
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

export const setAssignedUser =
  ({ assignedUserId }) =>
  (dispatch) => {
    dispatch(slice.actions.setAssignedUser({ assignedUserId }));
  };

export const setInvoiceAmount =
  ({ invoiceAmount, metadata }) =>
  (dispatch) => {
    dispatch(slice.actions.setInvoiceAmount({ invoiceAmount, metadata }));
  };
export default slice;
