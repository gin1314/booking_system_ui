import { useCallback, useEffect, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  Typography
} from '@mui/material';
import {
  BookingListTable,
  BookingListTableEngineer
} from 'src/components/booking';
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

const BookingTable = ({ role, isOnMyBooking = false, ...others }) => {
  if (role === 'engineer' && isOnMyBooking) {
    return <BookingListTableEngineer {...others} />;
  }
  if (!isOnMyBooking) {
    return <BookingListTable {...others} />;
  }
};

const BookingList = ({ bookings, user, isOnMyBooking }) => {
  const isMountedRef = useIsMountedRef();
  const { settings } = useSettings();
  const [orders, setOrders] = useState([]);

  const getOrders = useCallback(async () => {
    try {
      const response = await axios.get('/api/orders');

      if (isMountedRef.current) {
        setOrders(response.data.orders);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
      <Helmet>
        <title>{`Dashboard: Booking List ${String(
          user.user.role
        ).toUpperCase()}`}</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                {isOnMyBooking && 'My Booking List'}
                {!isOnMyBooking && 'Booking List'}
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
            <BookingTable
              role={user.user.role}
              isOnMyBooking={isOnMyBooking}
              orders={orders}
              bookings={bookings}
              user={user}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

BookingList.Layout = DashboardLayout;

export const getServerSideProps = async ({ req, query }) => {
  const {
    cookies: { token }
  } = req;
  let bookings;
  let user;

  // const params = new URLSearchParams(query);

  let bookingQuery = {
    // 'filter[user_id]': null
  };
  let isOnMyBooking = false;
  try {
    const apiRespMe = await fetch(`${process.env.apiBaseURLLocal}/auth/me`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    user = await apiRespMe.json();

    if (_.get(query, 'my-bookings')) {
      bookingQuery = {
        'filter[user_id]': user.user.id
      };
      isOnMyBooking = true;
    }
    const allQuery = new URLSearchParams(bookingQuery).toString();

    const apiResp = await fetch(
      `${process.env.apiBaseURLLocal}/booking?${allQuery}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    bookings = await apiResp.json();
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
      bookings,
      user,
      isOnMyBooking
    }
  };
};

export default BookingList;
