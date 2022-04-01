import {
  Box,
  Button,
  IconButton,
  SvgIcon,
  Typography,
  Dialog,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Skeleton
} from '@mui/material';

import { makeStyles } from '@mui/styles';
// import { XCircle as CloseIcon } from 'react-feather';

import { useSelector, useDispatch } from 'src/store';
import { closeBookFileModal } from 'src/slices/booking';
import PerfectScrollbar from 'react-perfect-scrollbar';

import _ from 'lodash';
import { useState } from 'react';
// import PDFViewer from 'src/components/AllPagesPdfViewer';
import fileDownload from 'js-file-download';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {},
  dialog: {
    padding: theme.spacing(3)
  }
}));

const BookingFileDialog = () => {
  const { isBookFilesOpen, booking } = useSelector(state => state.booking);
  const [imageLoaded, setImageLoaded] = useState(false);
  const bookingId = _.get(booking, 'id');
  const filename = _.get(booking, 'files[0].uploaded_file_name');
  const fileExtension = _.get(booking, 'files[0].file_extension');

  const onDownload = (bookingId, filename, actualName) => {
    const url = `${process.env.corsAnywhereUrl}/${process.env.apiRootURL}/uploads/booking/${bookingId}/${filename}`;
    axios.get(url, {
      responseType: 'blob'
    }).then(res => {
      fileDownload(res.data, actualName);
    });
  };

  const onClose = () => {
    dispatch(closeBookFileModal());
    setImageLoaded(false);
  };
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Dialog onClose={onClose} open={isBookFilesOpen} maxWidth="md" fullWidth>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <div className={classes.dialog}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              {'Uploaded Files'}
            </Typography>
            <IconButton onClick={onClose}>
              {/* <SvgIcon>
                <CloseIcon />
              </SvgIcon> */}
            </IconButton>
          </Box>
          <Box mt={3}>
            <Card className={classes.root}>
              <CardActionArea>
                {(fileExtension === 'png' ||
                  fileExtension === 'webp' ||
                  fileExtension === 'jpg') && (
                  <>
                    {imageLoaded ? null : <Skeleton height={700} />}
                    <CardMedia
                      className={classes.media}
                      component="img"
                      image={`${process.env.corsAnywhereUrl}/${process.env.apiRootURL}/uploads/booking/${bookingId}/${filename}`}
                      title={_.get(booking, 'attributes.file_name')}
                      onLoad={() => {
                        setImageLoaded(true);
                      }}
                      onError={() => {
                        setImageLoaded(true);
                      }}
                    />
                  </>
                )}
                {fileExtension === 'pdf' && (
                  <PDFViewer
                    pdf={`${process.env.corsAnywhereUrl}/${process.env.apiRootURL}/uploads/booking/${bookingId}/${filename}`}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {_.get(booking, 'attributes.file_name')}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {''}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  onClick={() => {
                    dispatch(closeBookFileModal());
                  }}
                  size="small"
                  color="primary"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    onDownload(bookingId, filename, _.get(booking, 'attributes.file_name'));
                  }}
                  size="small"
                  color="primary"
                >
                  Download
                </Button>
              </CardActions>
            </Card>
          </Box>
        </div>
      </PerfectScrollbar>
    </Dialog>
  );
};

export default BookingFileDialog;
