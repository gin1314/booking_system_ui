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
import {
  postCreateUser as postCreateUserApi,
  putUpdateUser as putUpdateUserApi
} from 'src/api';
import { Helmet } from 'react-helmet';
import DashboardLayout from 'src/components/dashboard/DashboardLayout';
import diffObjectChange from 'src/utils/diffObjectChange';

const roles_options = [
  { text: 'Engineer', value: 'engineer' },
  { text: 'Admin', value: 'admin' }
];

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const EditUser = ({ user }) => {
  const { enqueueSnackbar } = useSnackbar();
  const today = new Date();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openBookSuccessDialog, setOpenBookSuccessDialog] = useState(false);
  const [alertDialogErrors, setAlertDialogError] = useState(false);
  const [successBookingIdUrl, setSuccessBookingIdUrl] = useState(false);

  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
  };

  const handleCloseBookSuccess = () => {
    setOpenBookSuccessDialog(false);
  };
  const initialValues = {
    name: user.name,
    address: user.address,
    phone_no: user.phone_no,
    // password: '',
    // password_confirmation: '',
    email: user.email,
    role: user.role
  };

  function CreateUserSuccessDialog({ open, handleClose, message }) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="user-dialog-title"
        aria-describedby="user-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="user-dialog-title">
          {'User Created Success'}
        </DialogTitle>
        <DialogContent>
          <Alert severity="success">
            {/* <AlertTitle>Please fix the following errors:</AlertTitle> */}
            {'You have successfuly edited a user!'}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              router.push('/users');
            }}
            autoFocus
          >
            Proceed to users list
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
    <>
      <Helmet>
        <title>{`Dashboard: Booking List ${String(
          'user.user.role'
        ).toUpperCase()}`}</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                {'Edit User'}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            {/* <Container maxWidth={'xl'}> */}
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                name: Yup.string().required('The name field is required'),
                address: Yup.string().required('The address is required'),
                phone_no: Yup.string()
                  .required('The phone number is required')
                  .matches(phoneRegExp, 'The phone number is not valid'),
                // land_location: Yup.string().required(
                //   'The land location is required'
                // ),
                role: Yup.string().required('The role is required')
              })}
              onSubmit={async (
                values,
                {
                  setErrors,
                  setStatus,
                  setSubmitting,
                  setFieldValue
                }
              ) => {
                try {
                  // console.log(values, 'values');
                  const changedValues = diffObjectChange(values, initialValues);
                  await putUpdateUserApi(user.id, changedValues);

                  setStatus({ success: true });
                  enqueueSnackbar('User successfully edited!', {
                    variant: 'success'
                  });
                  setOpenBookSuccessDialog(true);
                  await wait(5000);
                  window.location = `/users/${user.id}/edit`;
                } catch (err) {
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
                  <Box
                    sx={{
                      backgroundColor: 'background.paper',
                      minHeight: '100%',
                      py: 2
                    }}
                  >
                    {/* <CardHeader title="Client Information" /> */}
                    <CardContent>
                      <Grid container spacing={4}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                            fullWidth
                            label="Full Name"
                            required
                            name="name"
                            variant="outlined"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                            fullWidth
                            label="Email"
                            required
                            name="email"
                            variant="outlined"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
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
                            error={Boolean(touched.address && errors.address)}
                            helperText={touched.address && errors.address}
                            fullWidth
                            required
                            label="Address"
                            name="address"
                            variant="outlined"
                            type="address"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.address}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                            fullWidth
                            label="Password"
                            type={'password'}
                            // required
                            name="password"
                            variant="outlined"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.password_confirmation &&
                                errors.password_confirmation
                            )}
                            helperText={
                              touched.password_confirmation &&
                              errors.password_confirmation
                            }
                            fullWidth
                            // required
                            label="Confirm password"
                            type={'password'}
                            name="password_confirmation"
                            variant="outlined"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password_confirmation}
                          />
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
                                Role
                              </InputLabel>
                              <Select
                                error={Boolean(touched.role && errors.role)}
                                labelId="role-id"
                                id="role"
                                value={values.role}
                                label="Role"
                                name="role"
                                onChange={(event) => {
                                  handleChange(event);
                                }}
                              >
                                {roles_options.map((data) => (
                                  <MenuItem key={data.value} value={data.value}>
                                    {data.text}
                                  </MenuItem>
                                ))}
                              </Select>
                              {touched.role && errors.role ? (
                                <FormHelperText error>
                                  {errors.role}
                                </FormHelperText>
                              ) : null}
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>
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
                        Submit
                      </Button>
                    </CardActions>
                  </Box>

                  <AlertDialog
                    open={openAlertDialog}
                    handleClose={handleCloseAlertDialog}
                  />
                  <CreateUserSuccessDialog
                    open={openBookSuccessDialog}
                    handleClose={handleCloseBookSuccess}
                  />
                </form>
              )}
            </Formik>
            {/* </Container> */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

EditUser.Layout = DashboardLayout;

export const getServerSideProps = async ({ req, query, params }) => {
  const { id } = params;
  const {
    cookies: { token }
  } = req;
  let user;

  // const params = new URLSearchParams(query);

  let userQuery = {
    'filter[id]': id
  };

  try {
    const allQuery = new URLSearchParams(userQuery).toString();

    const apiResp = await fetch(
      `${process.env.apiBaseURLLocal}/user?${allQuery}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    user = await apiResp.json();

    user = _.get(user, 'data.[0]', {});

    // user id note found
    if (Object.keys(user).length <= 0) {
      return {
        redirect: {
          permanent: false,
          destination: '/page-not-found'
        }
      };
    }

    if (_.get(apiResp, 'status') >= 400) {
      return {
        redirect: {
          permanent: false,
          destination: '/login'
        }
      };
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return {
    props: {
      user
    }
  };
};

export default EditUser;
