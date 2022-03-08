import { useCallback, useEffect, useState } from 'react';
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
import useSettings from 'src/hooks/useSettings';
import ChevronRightIcon from 'src/icons/ChevronRight';
import DownloadIcon from 'src/icons/Download';
import UploadIcon from 'src/icons/Upload';
import PlusIcon from 'src/icons/Plus';
import DashboardLayout from 'src/components/dashboard/DashboardLayout';
import _ from 'lodash';
import UserListTable from 'src/components/user/UserListTable';


const UserList = ({ users, user }) => {
  const { settings } = useSettings();

  return (
    <>
      <Helmet>
        <title>{`Dashboard: Users List ${String(
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
                {'Users List'}
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
            <UserListTable
              users={users}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

UserList.Layout = DashboardLayout;

export const getServerSideProps = async ({ req, query }) => {
  const {
    cookies: { token }
  } = req;
  let user;
  let users;

  // const params = new URLSearchParams(query);

  let bookingQuery = {
    sort: '-id'
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

    users = await apiResp.json();
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
      user,
      users
    }
  };
};

export default UserList;
