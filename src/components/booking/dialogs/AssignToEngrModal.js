import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import _ from 'lodash';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material';
import { useSelector, useDispatch } from 'src/store';
import { closeAssignToEngrModal, setAssignedUser } from 'src/slices/booking';
import { getAllBookings, getAllUsers } from 'src/api';

const AssignToEngrModal = (props) => {
  const {
    children,
    authorAvatar,
    authorName,
    handleAction,
    /* onClose */ open,
    ...other
  } = props;
  const { isAssingToEngrModalOpen, modalParams } = useSelector(
    (state) => state.booking
  );
  const [value, setValue] = useState('');
  const [apiLoading, setApiLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [engrOptions, setEngrOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  let debouncedOnInputChangeShipper;

  useEffect(() => {
    const onInputChangeShipper = (event, value) => {
      const { from, q } = value;
      if (q === '') return [];
      setApiLoading(true);
      getAllUsers({ 'filter[name]': q }).then((data) => {
        const options = data.data.data.map((v) => {
          return { text: `${v.name}`, value: v.id };
        });

        setEngrOptions(options);

        setApiLoading(false);
      });
    };
    debouncedOnInputChangeShipper = _.debounce(onInputChangeShipper, 3000);
  });

  const onClose = () => {
    dispatch(closeAssignToEngrModal());
  };

  return (
    <Dialog
      open={isAssingToEngrModalOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { width: "30%" } }}
    >
      <DialogTitle id="alert-dialog-title">{modalParams.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {modalParams.body}
        </DialogContentText>
        <Box mt={2}>
          <Autocomplete
            getOptionLabel={(option) => option.text}
            onInputChange={(event, value) => {
              if (typeof debouncedOnInputChangeShipper === 'function') {
                debouncedOnInputChangeShipper(event, {
                  from: 'shipper_id',
                  q: value
                });
              }
            }}
            options={engrOptions}
            // defaultValue={{
            //   text: _.get(dockReceipt, 'attributes.shipper.Name'),
            //   value: _.get(dockReceipt, 'attributes.shipper.id')
            // }}
            loading={apiLoading}
            loadingText={
              <Box display="flex" alignItems="center">
                <CircularProgress size={16} />
                <Typography>Loading...</Typography>
              </Box>
            }
            onChange={(e, value) => {
              dispatch(setAssignedUser({ assignedUserId: value.value }));
            }}
            // getOptionSelected={(option, value) => option.value === value.value}
            renderInput={(params) => (
              <TextField
                // fullWidth
                label="Search Engineer's first name"
                name="user_id"
                onChange={(event) => {
                  setSearchValue(event.target.value);
                }}
                value={searchValue}
                variant="outlined"
                {...params}
              />
            )}
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

AssignToEngrModal.propTypes = {};

export default AssignToEngrModal;
