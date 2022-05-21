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
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { useSelector, useDispatch } from 'src/store';
import { closeMakeInvoiceModal, setInvoiceAmount } from 'src/slices/booking';

const CreateInvoiceModal = (props) => {
  const {
    children,
    authorAvatar,
    authorName,
    handleAction,
    /* onClose */ open,
    ...other
  } = props;
  const { isMakeInvoiceModalOpen, modalParams } = useSelector(
    (state) => state.booking
  );
  const [amount, setAmount] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closeMakeInvoiceModal());
    setAmount(0);
    dispatch(setInvoiceAmount({ invoiceAmount: 0 }));
  };

  return (
    <Dialog
      open={isMakeInvoiceModalOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{modalParams.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {modalParams.body}
        </DialogContentText>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Amount in PHP"
            id="outlined-start-adornment"
            type={'number'}
            value={amount}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            sx={{ width: '40ch' }}
            onChange={(e) => {
              setAmount(e.target.value);
              dispatch(setInvoiceAmount({ invoiceAmount: e.target.value }));
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">PHP</InputAdornment>
              )
            }}
          />
        </Box>
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

CreateInvoiceModal.propTypes = {};

export default CreateInvoiceModal;
