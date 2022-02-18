import { useEffect, useContext } from 'react';
// import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  Link,
  Typography
} from '@mui/material';
import _ from 'lodash';
import { Receipt as ReceiptIcon } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import ShoppingBagIcon from '../../icons/ShoppingBag';
import UserIcon from '../../icons/User';
import UsersIcon from '../../icons/Users';
import NavSection from '../NavSection';
import Scrollbar from '../Scrollbar';
const adminSections = [
  {
    title: 'General',
    items: [
      {
        title: 'Bookings / Transactions',
        path: '/booking-list',
        icon: <ReceiptIcon fontSize="small" />
      },
      {
        title: 'Billing',
        path: '/billing',
        icon: <ReceiptIcon fontSize="small" />
      },
      // {
      //   title: 'Billing',
      //   path: '/dashboard/finance',
      //   icon: <ShoppingBagIcon fontSize="small" />
      // },
      // {
      //   title: 'Engineers',
      //   path: '/dashboard/account',
      //   icon: <UserIcon fontSize="small" />
      // },
      {
        title: 'User Management',
        path: '/dashboard/analytics',
        icon: <UsersIcon fontSize="small" />,
        children: [
          {
            title: 'Create User',
            path: '/users/create'
          },
          {
            title: 'List User',
            path: '/users'
          }
        ]
      }
    ]
  }
];

const engrSections = [
  {
    title: 'General',
    items: [
      // {
      //   title: 'Bookings / Transactions',
      //   path: '/booking-list',
      //   icon: <ReceiptIcon fontSize="small" />
      // },
      {
        title: 'Assigned Bookings',
        path: '/booking-list?my-bookings=true',
        icon: <ReceiptIcon fontSize="small" />
      },
    ]
  }
];

const DashboardSidebar = (props) => {
  const { onMobileClose, openMobile } = props;
  const { user } = useAuth();
  let sections = engrSections;
  useEffect(
    () => {
      if (openMobile && onMobileClose) {
        onMobileClose();
      }
    },
    [
      /* location.pathname */
    ]
  );

  switch (_.get(user, 'role')) {
    case 'admin':
      sections = adminSections;
      break;
    case 'engineer':
      sections = engrSections;
      break;
    default:
      break;
  }

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 2
            }}
          >
            {/* <RouterLink to="/">
              <Logo
                sx={{
                  height: 40,
                  width: 40
                }}
              />
            </RouterLink> */}
          </Box>
        </Hidden>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'background.default',
              borderRadius: 1,
              display: 'flex',
              overflow: 'hidden',
              p: 2
            }}
          >
            {/* <RouterLink to="/dashboard/account">
              <Avatar
                src={user.avatar}
                sx={{
                  cursor: 'pointer',
                  height: 48,
                  width: 48
                }}
              />
            </RouterLink> */}
            <Box sx={{ ml: 2 }}>
              <Typography color="textPrimary" variant="subtitle2">
                {user.name}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                System Role:{' '}
                <Link
                  color="primary"
                  // component={RouterLink}
                  // to="/pricing"
                >
                  {String(user.role).toUpperCase()}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {sections.map((section) => (
            <NavSection
              key={section.title}
              pathname={'location.pathname'}
              sx={{
                '& + &': {
                  mt: 3
                }
              }}
              {...section}
            />
          ))}
        </Box>
        {/* <Divider />
        <Box sx={{ p: 2 }}>
          <Typography
            color="textPrimary"
            variant="subtitle2"
          >
            Need Help?
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Check our docs
          </Typography>
          <Button
            color="primary"
            // component={RouterLink}
            fullWidth
            sx={{ mt: 2 }}
            // to="/docs"
            variant="contained"
          >
            Documentation
          </Button>
        </Box> */}
      </Scrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          PaperProps={{
            sx: {
              backgroundColor: 'background.paper',
              width: 280
            }
          }}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          PaperProps={{
            sx: {
              backgroundColor: 'background.paper',
              height: 'calc(100% - 64px) !important',
              top: '64px !Important',
              width: 280
            }
          }}
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default DashboardSidebar;
