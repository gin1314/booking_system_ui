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
import _ from 'lodash';
import {
  BookingListTable,
  BookingListTableEngineer
} from 'src/components/booking';
import { lighten } from '@mui/material/styles';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useSettings from 'src/hooks/useSettings';
import ChevronRightIcon from 'src/icons/ChevronRight';
import DownloadIcon from 'src/icons/Download';
import UploadIcon from 'src/icons/Upload';
import PlusIcon from 'src/icons/Plus';
// import gtm from '../../lib/gtm';
import axios from 'src/lib/axios';
import DashboardLayout from 'src/components/dashboard/DashboardLayout';
import BillingListTable from 'src/components/billing/BillingListTable';

const BillingTable = ({ role, ...others }) => {
    return <BillingListTable {...others} />;
};

const CompletedBooking = ({ bookings, user, isOnMyBooking, page }) => {
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
        <title>{`Dashboard: Billing ${String(
          user.user.role
        ).toUpperCase()}`}</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: (theme) => lighten(theme.palette.primary.main, 0.8),
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                {'Billing'}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <BillingTable
              role={user.user.role}
              isOnMyBooking={isOnMyBooking}
              orders={orders}
              bookings={bookings}
              user={user}
              page={page}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

CompletedBooking.Layout = DashboardLayout;

export const getServerSideProps = async ({ req, query }) => {
  const {
    cookies: { token }
  } = req;
  let bookings;
  let user;

  // const params = new URLSearchParams(query);

  let bookingQuery = {
    sort: '-id',
    include: 'user,invoice_status_paid,invoice'
    // 'filter[status]': 'paid'
  };
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
      page: 'completed-booking'
    }
  };
};

export default CompletedBooking;
