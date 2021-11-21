import DatePicker from '@mui/lab/DatePicker';
import MomentAdapter from '@date-io/moment';
import { useSnackbar } from 'notistack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import wait from 'src/utils/wait';
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
  FormHelperText
} from '@mui/material';

const moment = new MomentAdapter();

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const Booking = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const today = new Date();
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
            full_name: '',
            address: '',
            phone_no: '',
            survey_type: '',
            schedule_date: '',
            land_location: '',
            appointment_notes: ''
          }}
          validationSchema={Yup.object().shape({
            full_name: Yup.string().required('Name is required'),
            address: Yup.string().required('Address is required'),
            phone_no: Yup.string()
              .required('Phone number is required')
              .matches(phoneRegExp, 'Phone number is not valid'),
            land_location: Yup.string().required('Land location is required'),
            survey_type: Yup.string().required('Survey type is required')
          })}
          onSubmit={async (
            values,
            { resetForm, setErrors, setStatus, setSubmitting, setFieldValue }
          ) => {
            try {
              setStatus({ success: true });
              enqueueSnackbar('You have successfuly booked an appointment!', {
                variant: 'success'
              });
              // await wait(500);
              // router.push(`/dock-receipts/${api.data.data.id}/view`);
            } catch (err) {
              console.log('error', err);
              // setStatus({ success: false });
              // setErrors(err.response.data.errors[0].detail);
              // setSubmitting(false);
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
            <form onSubmit={handleSubmit} {...props}>
              <Box>
                <Typography color="textPrimary" variant="h5">
                  Fill-up the form to book an appointment
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ py: 2 }}
                  variant="body1"
                >
                  Proin tincidunt lacus sed ante efficitur efficitur. Quisque
                  aliquam fringilla velit sit amet euismod.
                </Typography>
                <Grid container spacing={3}>
                  <Grid item md={4} sm={6} xs={12}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        mt: 3
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
                          <TextField fullWidth {...params} />
                        )}
                        shouldDisableDate={(day) => {
                          return (
                            moment.date(day).format('YYYY-MM-DD') ===
                            '2021-11-24'
                          );
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        mt: 2
                      }}
                    >
                      <Box>
                        <Stack direction="row" spacing={2}>
                          <Button variant="contained">
                            8:00 am - 11:00 am
                          </Button>
                          <Button variant="contained">1:00 pm - 5pm</Button>
                        </Stack>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        mt: 3
                      }}
                    >
                      <TextField
                        error={Boolean(touched.full_name && errors.full_name)}
                        helperText={touched.full_name && errors.full_name}
                        fullWidth
                        label="Name"
                        name="full_name"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.full_name}
                      />
                    </Box>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        mt: 3
                      }}
                    >
                      <TextField
                        error={Boolean(touched.address && errors.address)}
                        helperText={touched.address && errors.address}
                        fullWidth
                        label="Address"
                        name="address"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        mt: 3
                      }}
                    >
                      <TextField
                        error={Boolean(touched.phone_no && errors.phone_no)}
                        helperText={touched.phone_no && errors.phone_no}
                        fullWidth
                        label="Phone no"
                        name="phone_no"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone_no}
                      />
                    </Box>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        mt: 3
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
                          onChange={handleChange}
                        >
                          <MenuItem value={'relocation_survey'}>
                            Relocation Survey
                          </MenuItem>
                          <MenuItem value={'sub_divide'}>Sub divide</MenuItem>
                          <MenuItem value={'for_titling'}>For titling</MenuItem>
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
                        alignItems: 'center',
                        display: 'flex',
                        mt: 3
                      }}
                    >
                      <TextField
                        error={Boolean(
                          touched.land_location && errors.land_location
                        )}
                        helperText={
                          touched.land_location && errors.land_location
                        }
                        fullWidth
                        multiline
                        rows={2}
                        label="Land location"
                        name="land_location"
                        variant="outlined"
                        value={values.land_location}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        mt: 3
                      }}
                    >
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        label="Appointment notes"
                        name="appointment_notes"
                        variant="outlined"
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        mt: 6
                      }}
                    >
                      <Button color="primary" type="submit" variant="contained">
                        Book an appointment
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Booking;
