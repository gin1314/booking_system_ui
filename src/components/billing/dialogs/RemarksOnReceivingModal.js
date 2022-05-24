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
import { closeRemarksModal, setRemarks } from 'src/slices/booking';

const RemarksOnReceivingModal = (props) => {
  const {
    children,
    authorAvatar,
    authorName,
    handleAction,
    /* onClose */ open,
    ...other
  } = props;
  const { isRemarksModalOpen, modalParams } = useSelector(
    (state) => state.booking
  );
  const [remark, setRemark] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closeRemarksModal());
    setRemark('');
  };

  return (
    <Dialog
      open={isRemarksModalOpen}
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
            label="Remarks"
            id="outlined-start-adornment"
            multiline
            rows={5}
            type={'text'}
            value={remark}
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            sx={{ width: '40ch' }}
            onChange={(e) => {
              setRemark(e.target.value);
              dispatch(setRemarks({ remarks: e.target.value }));
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

RemarksOnReceivingModal.propTypes = {};

export default RemarksOnReceivingModal;
