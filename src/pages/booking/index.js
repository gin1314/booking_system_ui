import { useState } from 'react';
import DatePicker from '@mui/lab/DatePicker';
import MomentAdapter from '@date-io/moment';
import { useSnackbar } from 'notistack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import wait from 'src/utils/wait';
import router from 'next/router';
import _ from 'lodash';
import nProgress from 'nprogress';
import { FileDropzone } from 'src/components/FileDropzone';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Container,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  Checkbox,
  Link,
  CardHeader,
  CardContent,
  Autocomplete,
  Switch,
  Divider,
  CardActions,
  FormControlLabel,
  Popover,
  Card,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  AlertTitle
} from '@mui/material';
import { postCreateBooking, postUploadFileBooking } from 'src/api';

const moment = new MomentAdapter();

const copy_of_ids = [
  { text: 'Drivers license', value: 'drivers_license' },
  { text: 'Voters ID', value: 'voters_id' },
  { text: 'TIN ID', value: 'tin_id' },
  { text: 'Barangay ID', value: 'barangay_id' },
  { text: 'Postal ID', value: 'postal_id' }
];

const survey_type = [
  { text: 'Boundary survey', value: 'boundary' },
  { text: 'Construction survey', value: 'construction' },
  { text: 'Locaton survey', value: 'location' },
  { text: 'Site planning survey', value: 'site_planning' },
  { text: 'Subdivision survey', value: 'subdivision' },
  { text: 'Topographic survey', value: 'topographic' }
];

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const Booking = ({ timeslot, surveyTypeHints }) => {
  const { enqueueSnackbar } = useSnackbar();
  const today = new Date();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openBookSuccessDialog, setOpenBookSuccessDialog] = useState(false);
  const [alertDialogErrors, setAlertDialogError] = useState(false);
  const [successBookingIdUrl, setSuccessBookingIdUrl] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadType, setUploadType] = useState('document');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
  };

  const handleCloseBookSuccess = () => {
    setOpenBookSuccessDialog(false);
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

  const uploadBookingDocuments = (booking, uploadSuccessCb) => {
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
        uploadSuccessCb();
        enqueueSnackbar('File uploaded successfully', {
          variant: 'success'
        });
        // wait(2000);
        // window.location.reload();
      })
      .catch((err) => {
        setUploadPercentage(0);
      });
  };

  function BookingSuccessDialog({ open, handleClose, message }) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="book-dialog-title"
        aria-describedby="book-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="book-dialog-title">{'Booking Success'}</DialogTitle>
        <DialogContent>
          <Alert severity="success">
            {/* <AlertTitle>Please fix the following errors:</AlertTitle> */}
            {'You have successfuly booked an appointment!'}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              router.push(successBookingIdUrl);
            }}
            autoFocus
          >
            Proceed to booking summary
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  function AlertDialog({ open, handleClose }) {
    const buildErrors = (errors) => {
      const allErrors = [];
      for (const [key, value] of Object.entries(errors)) {
        allErrors.push(
          value.map((message) => (
            <Typography key={key} variant="subtitle2">
              * {message}
            </Typography>
          ))
        );
      }

      return allErrors;
    };

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {'Booking Form Errors'}
        </DialogTitle>
        <DialogContent>
          <Alert severity="error">
            <AlertTitle>Please fix the following errors:</AlertTitle>
            {buildErrors(alertDialogErrors)}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        minHeight: '100%',
        p: 3
      }}
    >
      <Container maxWidth={'xl'}>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            phone_no: '',
            client_street: '',
            client_city: '',
            client_region: '',
            client_postal_code: '',
            land_street: '',
            land_city: '',
            land_region: '',
            land_postal_code: '',
            survey_type: '',
            schedule_date: '',
            appointment_notes: '',
            time_slot_id: '',
            email: '',
            data_privacy_agree: false,
            requirements: {
              deed_of_sale: Boolean(false),
              deed_of_donation: Boolean(false),
              cenro: Boolean(false),
              waiver_of_rights: Boolean(false),
              lra: Boolean(false),
              tax_declaration: Boolean(false),
              cert_of_title: Boolean(false),
              dotr: Boolean(false),
              survey_plan_from_denr: Boolean(false),
              house_tagging: Boolean(false)
            }
          }}
          validationSchema={Yup.object().shape({
            // full_name: Yup.string().required('The name field is required'),
            // address: Yup.string().required('The address is required'),
            phone_no: Yup.string()
              .required('The phone number is required')
              .matches(phoneRegExp, 'The phone number is not valid'),
            // land_location: Yup.string().required(
            //   'The land location is required'
            // ),
            survey_type: Yup.string().required('The survey type is required'),
            time_slot_id: Yup.string().required('The time slot is required'),
            data_privacy_agree: Yup.boolean().oneOf(
              [true],
              'Please click to agree on Data Privacy'
            )
          })}
          onSubmit={async (
            values,
            { resetForm, setErrors, setStatus, setSubmitting, setFieldValue }
          ) => {
            try {
              // console.log(values, 'values');
              const response = await postCreateBooking(values);
              await wait(2000);
              if (files.length > 0) {
                uploadBookingDocuments(response.data.data, async () => {
                  setStatus({ success: true });
                  setSuccessBookingIdUrl(
                    `/booking/details/${response.data.data.id}`
                  );
                  setOpenBookSuccessDialog(true);
                  await wait(500);
                  router.push(`/booking/details/${response.data.data.id}`);
                });
              } else {
                setStatus({ success: true });
                setSuccessBookingIdUrl(
                  `/booking/details/${response.data.data.id}`
                );
                setOpenBookSuccessDialog(true);
                await wait(500);
                router.push(`/booking/details/${response.data.data.id}`);
              }
              // enqueueSnackbar('You have successfuly booked an appointment!', {
              //   variant: 'success'
              // });
            } catch (err) {
              // console.log(err, 'err');
              setErrors(err.response.data.errors[0].detail);
              setAlertDialogError(err.response.data.errors[0].detail);
              setOpenAlertDialog(true);
              setStatus({ success: false });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={{ p: 2 }}>
                <Typography color="textPrimary" variant="h5">
                  Fill-up the form to book an appointment
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: 'background.paper',
                  minHeight: '100%',
                  py: 2
                }}
              >
                <CardHeader title="Schedule" />
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item md={6} xs={12}>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                          // mt: 3
                        }}
                      >
                        <DatePicker
                          label="Schedule date"
                          value={values.schedule_date}
                          minDate={today}
                          onChange={(newValue) => {
                            setFieldValue(
                              'schedule_date',
                              moment.date(newValue).format('YYYY-MM-DD')
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              error={Boolean(
                                touched.schedule_date && errors.schedule_date
                              )}
                              helperText={
                                touched.schedule_date && errors.schedule_date
                              }
                              {...params}
                            />
                          )}
                          shouldDisableDate={(day) => {
                            // return (
                            //   moment.date(day).format('YYYY-MM-DD') ===
                            //   '2021-11-24'
                            // );
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id="time-slot-id">Time slot</InputLabel>
                          <Select
                            error={Boolean(
                              touched.time_slot_id && errors.time_slot_id
                            )}
                            labelId="survey-type-id"
                            id="survey-type"
                            value={values.time_slot_id}
                            label="Time slot"
                            name="time_slot_id"
                            onChange={handleChange}
                          >
                            {timeslot.map((data) => (
                              <MenuItem key={data.id} value={data.id}>
                                {data.time_slot_word}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched.time_slot_id && errors.time_slot_id ? (
                            <FormHelperText error>
                              {errors.time_slot_id}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Survey type
                          </InputLabel>
                          <Select
                            error={Boolean(
                              touched.survey_type && errors.survey_type
                            )}
                            labelId="survey-type-id"
                            id="survey-type"
                            value={values.survey_type}
                            label="Survey type"
                            name="survey_type"
                            onChange={(event) => {
                              handleChange(event);
                            }}
                          >
                            {survey_type.map((data) => (
                              <MenuItem key={data.value} value={data.value}>
                                {data.text}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched.survey_type && errors.survey_type ? (
                            <FormHelperText error>
                              {errors.survey_type}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      </Box>

                      <Box
                        sx={{
                          mt: 3,
                          display: values.survey_type ? 'block' : 'none'
                        }}
                      >
                        <Card sx={{ minWidth: 275 }}>
                          <CardContent>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Survey type description
                            </Typography>
                            <Typography variant="body2">
                              {surveyTypeHints[values.survey_type] || 'N/A'}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(
                          touched.appointment_notes && errors.appointment_notes
                        )}
                        helperText={
                          touched.appointment_notes && errors.appointment_notes
                        }
                        fullWidth
                        multiline
                        rows={6}
                        label="Appointment notes"
                        name="appointment_notes"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Box>

              <Box
                sx={{
                  backgroundColor: 'background.paper',
                  minHeight: '100%',
                  py: 2
                }}
              >
                <CardHeader title="Client Information" />
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.first_name && errors.first_name)}
                        helperText={touched.first_name && errors.first_name}
                        fullWidth
                        label="First Name"
                        required
                        name="first_name"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.first_name}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.last_name && errors.last_name)}
                        helperText={touched.last_name && errors.last_name}
                        fullWidth
                        label="Last Name"
                        required
                        name="last_name"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.last_name}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.phone_no && errors.phone_no)}
                        helperText={touched.phone_no && errors.phone_no}
                        fullWidth
                        label="Phone no"
                        required
                        name="phone_no"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone_no}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        fullWidth
                        required
                        label="Email"
                        name="email"
                        variant="outlined"
                        type="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                {/* </form> */}
              </Box>

              <Box
                sx={{
                  backgroundColor: 'background.paper',
                  minHeight: '100%',
                  py: 2
                }}
              >
                <CardHeader title="Client Address" />
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(
                          touched.client_street && errors.client_street
                        )}
                        helperText={
                          touched.client_street && errors.client_street
                        }
                        fullWidth
                        label="Street"
                        required
                        name="client_street"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.client_street}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(
                          touched.client_city && errors.client_city
                        )}
                        helperText={touched.client_city && errors.client_city}
                        fullWidth
                        label="City"
                        required
                        name="client_city"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.client_city}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(
                          touched.client_region && errors.client_region
                        )}
                        helperText={
                          touched.client_region && errors.client_region
                        }
                        fullWidth
                        label="Region"
                        required
                        name="client_region"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.client_region}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(
                          touched.client_postal_code &&
                            errors.client_postal_code
                        )}
                        helperText={
                          touched.client_postal_code &&
                          errors.client_postal_code
                        }
                        fullWidth
                        required
                        label="Postal code / Zip code"
                        name="client_postal_code"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.client_postal_code}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Box>

              <Box
                sx={{
                  backgroundColor: 'background.paper',
                  minHeight: '100%',
                  py: 2
                }}
              >
                <CardHeader title="Address of survey land" />
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(
                          touched.land_street && errors.land_street
                        )}
                        helperText={touched.land_street && errors.land_street}
                        fullWidth
                        label="Street"
                        required
                        name="land_street"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.land_street}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.land_city && errors.land_city)}
                        helperText={touched.land_city && errors.land_city}
                        fullWidth
                        label="City"
                        required
                        name="land_city"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.land_city}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(
                          touched.land_region && errors.land_region
                        )}
                        helperText={touched.land_region && errors.land_region}
                        fullWidth
                        label="Region"
                        required
                        name="land_region"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.land_region}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(
                          touched.land_postal_code && errors.land_postal_code
                        )}
                        helperText={
                          touched.land_postal_code && errors.land_postal_code
                        }
                        fullWidth
                        required
                        label="Postal code / Zip code"
                        name="land_postal_code"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.land_postal_code}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Box>

              <Box
                sx={{
                  backgroundColor: 'background.paper',
                  minHeight: '100%',
                  py: 2
                }}
              >
                <CardHeader title="Requirements for survey" />
                <Divider />
                <CardContent>
                  <Grid container spacing={6} wrap="wrap">
                    <Grid item md={4} sm={6} xs={12}>
                      <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="subtitle2"
                      >
                        Check the available documents that you have
                      </Typography>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.requirements.tax_declaration}
                              color="primary"
                              name="requirements.tax_declaration"
                              onChange={handleChange}
                              value={values.requirements.tax_declaration}
                            />
                          }
                          label="Tax Declaration"
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.requirements.cert_of_title}
                              color="primary"
                              name="requirements.cert_of_title"
                              onChange={handleChange}
                              value={values.requirements.cert_of_title}
                            />
                          }
                          label="Certificate of title"
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.requirements.dotr}
                              color="primary"
                              name="requirements.dotr"
                              onChange={handleChange}
                              value={values.requirements.dotr}
                            />
                          }
                          label="Deed of transfer of rights"
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                values.requirements.survey_plan_from_denr
                              }
                              color="primary"
                              name="requirements.survey_plan_from_denr"
                              onChange={handleChange}
                              value={values.requirements.survey_plan_from_denr}
                            />
                          }
                          label="Survey plan from DENR"
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.requirements.house_tagging}
                              color="primary"
                              name="requirements.house_tagging"
                              onChange={handleChange}
                              value={values.requirements.house_tagging}
                            />
                          }
                          label="House tagging"
                        />
                      </div>
                      <Box sx={{ mt: 2 }}>
                        <Autocomplete
                          getOptionLabel={(option) => option.text}
                          options={copy_of_ids}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              label="Available copy of ID's"
                              name="copy_of_ids"
                              variant="outlined"
                              {...params}
                            />
                          )}
                        />
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <FileDropzone
                          accept={['image/*', 'application/pdf']}
                          files={files}
                          onDrop={handleDrop}
                          onRemove={handleRemove}
                          onRemoveAll={handleRemoveAll}
                          noUploadBtn
                        />
                      </Box>
                    </Grid>

                    <Grid item md={4} sm={6} xs={12}>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.requirements.deed_of_sale}
                              color="primary"
                              name="requirements.deed_of_sale"
                              onChange={handleChange}
                              value={values.requirements.deed_of_sale}
                            />
                          }
                          label="Deed of sale"
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.requirements.waiver_of_rights}
                              color="primary"
                              name="requirements.waiver_of_rights"
                              onChange={handleChange}
                              value={values.requirements.waiver_of_rights}
                            />
                          }
                          label="Waiver of rights"
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.requirements.deed_of_donation}
                              color="primary"
                              name="requirements.deed_of_donation"
                              onChange={handleChange}
                              value={values.requirements.deed_of_donation}
                            />
                          }
                          label="Deed of donation"
                        />
                      </div>
                      <Box>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.requirements.cenro}
                              color="primary"
                              name="requirements.cenro"
                              onChange={handleChange}
                              value={values.requirements.cenro}
                            />
                          }
                          label="CENRO"
                        />
                      </Box>
                      <Box>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.requirements.lra}
                              color="primary"
                              name="requirements.lra"
                              onChange={handleChange}
                              value={values.requirements.lra}
                            />
                          }
                          label="LRA"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Box>
              <Box
                sx={{
                  backgroundColor: 'background.paper',
                  minHeight: '100%',
                  py: 2
                }}
              >
                <CardHeader title="Data Privacy Agreement" />
                <Divider />
                <CardContent>
                  <Box>
                    I have read and understood the above statements that inform
                    me of the purpose for the collection of my personal data and
                    my rights as a data subject. By clicking the "agree" button
                    herein as an expressed consent and approval for the
                    collection and processing of my personal data in accordance
                    with the Intellectual Property Code and Data Privacy Law.
                  </Box>
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.data_privacy_agree}
                          color="primary"
                          name="data_privacy_agree"
                          onChange={handleChange}
                          value={values.data_privacy_agree}
                        />
                      }
                      label="Agree"
                    />
                    <FormHelperText error>
                      {touched.data_privacy_agree && errors.data_privacy_agree}
                    </FormHelperText>
                  </div>
                </CardContent>
                <Divider
                  sx={{
                    mt: 2,
                    mb: 2
                  }}
                />
                <CardActions
                  sx={{
                    justifyContent: 'flex-start',
                    p: 2
                  }}
                >
                  <Button color="primary" type="submit" variant="contained">
                    Book an appointment
                  </Button>
                </CardActions>
              </Box>
              <AlertDialog
                open={openAlertDialog}
                handleClose={handleCloseAlertDialog}
              />
              <BookingSuccessDialog
                open={openBookSuccessDialog}
                handleClose={handleCloseBookSuccess}
              />
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export const getServerSideProps = async ({ req, res, query, params }) => {
  let timeSlot;
  const surveyTypeHints = {
    boundary:
      'A boundary survey is a means of defining the limits of a property formally. It mainly focuses on the definition of the corners of a plot. People usually perform boundary surveys before they buy, split, improve or build on the land.',
    construction:
      'A construction survey is used to establish or mark the desired position of building corners, roads, sidewalks, or utilities that the engineer has designed. Particular attention is made to ensure the building does not encroach or overlap into or over the designated setbacks, easements, or property line.',
    location:
      'A location survey is an establishment on the ground of points and lines in positions that have been determined previously by computation or by graphical methods, or by a description obtained from data supplied by documents of record, such as deeds, maps, or other sources.',
    site_planning:
      'A site plan survey is a combination of a Boundary Survey and Topographic Survey. Site plans are used when making improvements to properties or during new construction.',
    subdivision:
      'Subdivision Survey (commonly referred to as subdivision platting) is the process of splitting a tract of land into smaller parcels. This shows monumentation and survey data on a map in conformance with local subdivision ordinance.',
    topographic:
      'A topographic survey locates all surface features of a property and depicts all-natural features and elevations. In essence, it is a 3-dimensional map of a 3-dimensional property showing all-natural and man-made features and improvements.'
  };
  try {
    const apiResp = await fetch(`${process.env.apiBaseURLLocal}/timeslot`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json'
      }
    });

    timeSlot = await apiResp.json();

    if (_.get(apiResp, 'status') >= 400) {
      return {
        redirect: {
          permanent: false,
          destination: '/page-not-found'
        }
      };
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return {
    props: {
      timeslot: timeSlot.data,
      surveyTypeHints
    }
  };
};

export default Booking;
