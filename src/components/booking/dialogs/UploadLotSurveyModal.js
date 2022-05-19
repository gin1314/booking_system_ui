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
import { closeUploadModal } from 'src/slices/booking';
import { FileDropzone } from 'src/components/FileDropzone';
import { postUploadFileBooking } from 'src/api';
import wait from 'src/utils/wait';


const UploadLotSurveyModal = (props) => {
  const {
    children,
    authorAvatar,
    authorName,
    handleAction,
    /* onClose */ open,
    ...other
  } = props;
  const { modalParams, isUploadModalOpen, booking } = useSelector(
    (state) => state.booking
  );
  const [value, setValue] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({ upload_type: '' });
  const dispatch = useDispatch();
  const [uploadType, setUploadType] = useState('lot_survey');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onClose = () => {
    dispatch(closeUploadModal());
    setFiles([]);
  };

  const handleDrop = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemove = (file) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_file) => _file.path !== file.path)
    );
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const upload = (e) => {
    const formData = new FormData();
    // if (!uploadType) {
    //   setErrors({ upload_type: 'Please select an upload type' });
    //   return;
    // }
    files.forEach((file) => {
      formData.append('file[]', file);
    });

    formData.append('type', uploadType);

    let percent = 0;
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        percent = Math.floor((loaded * 100) / total);
        if (percent <= 100) {
          setUploadPercentage(percent); // hook to set the value of current level that needs to be passed to the progressbar
        }
      }
    };

    // switch (type) {
    //   case 'dockReceipt':
    postUploadFileBooking(booking.id, formData, config)
      .then((data) => {
        setUploadPercentage(0);
        enqueueSnackbar('File uploaded successfully', {
          variant: 'success'
        });
        wait(2000);
        window.location.reload();
      })
      .catch((err) => {
        setUploadPercentage(0);
      });
    //   break;
    // case 'bol':
    //   postUploadFileBol(booking.id, formData, config)
    //     .then(data => {
    //       setUploadPercentage(0);
    //       enqueueSnackbar('File uploaded successfully', {
    //         variant: 'success'
    //       });
    //       wait(2000);
    //       window.location.reload();
    //     })
    //     .catch(err => {
    //       setUploadPercentage(0);
    //     });
    // default:
    //   break;
    // }
  };

  return (
    <Dialog
      open={isUploadModalOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{modalParams.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Box sx={{ mb: 1 }}>{modalParams.body}</Box>
          <FileDropzone
            accept="image/*"
            files={files}
            onDrop={handleDrop}
            onRemove={handleRemove}
            onRemoveAll={handleRemoveAll}
            onUpload={upload}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{modalParams.close}</Button>
        {/* <Button onClick={handleAction} autoFocus>
          {modalParams.agree}
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

UploadLotSurveyModal.propTypes = {};

export default UploadLotSurveyModal;
