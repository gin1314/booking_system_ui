import { useCallback, useEffect, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@mui/material';
import { BookingListTable } from 'src/components/booking';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useSettings from 'src/hooks/useSettings';
import ChevronRightIcon from 'src/icons/ChevronRight';
import DownloadIcon from 'src/icons/Download';
import UploadIcon from 'src/icons/Upload';
import PlusIcon from 'src/icons/Plus';
// import gtm from '../../lib/gtm';
import axios from 'src/lib/axios';
import DashboardLayout from 'src/components/dashboard/DashboardLayout';
import _ from 'lodash';

const BookingList = ({ bookings }) => {
  const isMountedRef = useIsMountedRef();
  const { settings } = useSettings();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // gtm.push({ event: 'page_view' });
  }, []);

  const getOrders = useCallback(async () => {
    try {
      const response = await axios.get('/api/orders');

      if (isMountedRef.current) {
        setOrders(response.data.orders);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
      <Helmet>
        <title>Dashboard:  Booking List (Admin)</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                Booking List
              </Typography>
              {/* <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Management
                </Link>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Orders
                </Typography>
              </Breadcrumbs> */}
              {/* <Box
                sx={{
                  mb: -1,
                  mx: -1,
                  mt: 1
                }}
              >
                <Button
                  color="primary"
                  startIcon={<UploadIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="text"
                >
                  Import
                </Button>
                <Button
                  color="primary"
                  startIcon={<DownloadIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="text"
                >
                  Export
                </Button>
              </Box> */}
            </Grid>
            <Grid item>
              {/* <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  New Order
                </Button>
              </Box> */}
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <BookingListTable orders={orders} bookings={bookings}/>
          </Box>
        </Container>
      </Box>
    </>
  );
};

BookingList.Layout = DashboardLayout;

export const getServerSideProps = async ({ req }) => {
  const {
    cookies: { token }
  } = req;
  let bookings;
  try {
    const apiResp = await fetch(
      `${process.env.apiBaseURLLocal}/booking`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json'
        }
      }
    );

    bookings = await apiResp.json();
    if (_.get(apiResp, 'status') >= 400) {
      return {
        redirect: {
          permanent: false,
          destination: '/page-not-found'
        }
      }
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      bookings
    }
  };
};

export default BookingList;
