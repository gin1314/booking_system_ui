import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material';
import { useSelector, useDispatch } from 'src/store';
import { closeModal } from 'src/slices/booking';

const BookingConfirmationModal = (props) => {
  const {
    children,
    authorAvatar,
    authorName,
    handleAction,
    /* onClose */ open,
    ...other
  } = props;
  const { isModalOpen, modalParams } = useSelector((state) => state.booking);
  const [value, setValue] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {modalParams.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {modalParams.body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{modalParams.close}</Button>
        <Button onClick={handleAction} autoFocus>
          {modalParams.agree}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

BookingConfirmationModal.propTypes = {};

export default BookingConfirmationModal;
