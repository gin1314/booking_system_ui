import { useState } from 'react';
import NextLink from 'next/link';
import router from 'next/router';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Autocomplete,
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Button,
  Link,
  InputAdornment
} from '@mui/material';
import { useSnackbar } from 'notistack';
import _ from 'lodash';
import SearchIcon from 'src/icons/Search';
import {
  closeModal,
  openModal,
  setModalLabels,
  closeAssignToEngrModal,
  openAssignToEngrModal
} from 'src/slices/booking';
import { useDispatch, useSelector } from 'src/store';
import {
  postAssignBooking,
  getAllBookingsFiltered,
  getAllUsersFiltered
} from 'src/api';
import NProgress from 'nprogress';
import { SeverityPill } from '../SeverityPill';

const severityMap = {
  completed: 'success',
  pending: 'info',
  cancelled: 'warning',
  confirmed: 'primary'
};

const applyPagination = (orders, page, limit) =>
  orders.slice(page * limit, page * limit + limit);

const joinAddress = (arr) => arr.join(', ');

const SetStatusSelect = ({ bookingId, status }) => {
  const [selected, setSelected] = useState(status);
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="booking-select-status">Status</InputLabel>
      <Select
        labelId="booking-select-status"
        value={selected}
        label="Status"
        onChange={handleChange}
        size="small"
      >
        <MenuItem value={'pending'}>Pending</MenuItem>
        <MenuItem value={'confirmed'}>Confirm</MenuItem>
        <MenuItem value={'completed'}>Completed</MenuItem>
        <MenuItem value={'cancelled'}>Candelled</MenuItem>
      </Select>
    </FormControl>
  );
};

const searchByOptions = [
  {
    value: 'filter[name]',
    label: 'Name'
  },
  {
    value: 'filter[email]',
    label: 'Email'
  },
  {
    value: 'filter[phone_no]',
    label: 'Phone no.'
  },
  {
    value: 'filter[role]',
    label: 'Role'
  },
  {
    value: 'filter[address]',
    label: 'Address'
  }
];

const sortOptions = [
  {
    value: 'id',
    label: 'Id'
  },
  {
    value: 'name',
    label: 'Name'
  },
  {
    value: 'email',
    label: 'Email'
  },
  {
    value: 'phone_no',
    label: 'Phone no.'
  },
  {
    value: 'role',
    label: 'Role'
  },
  {
    value: 'address',
    label: 'Address'
  },
  {
    value: 'created_at',
    label: 'Date Created'
  }
];

const sortDirectionOptions = [
  {
    value: '-',
    label: 'Descending'
  },
  {
    value: ' ',
    label: 'Ascending'
  }
];

/**
 * Booking label component
 * @param {*} props
 * @returns null
 */
const UserListTable = (props) => {
  const { users, ...other } = props;
  const [usersState, setUsersState] = useState(users);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('id');
  const [sortDir, setSortDir] = useState('-');
  const { booking, forType, assignedUserId } = useSelector(
    (state) => state.booking
  );
  const [searchByValue, setSearchByValue] = useState('filter[name]');

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(15);

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSearchByChange = (event) => {
    setSearchByValue(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleSortDirChange = (event) => {
    setSortDir(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    (async () => {
      let response;
      NProgress.start();
      const sorting = { sort: `${sortDir}${sort}` };
      try {
        response = await getAllUsersFiltered(newPage + 1, limit, {
          include: 'user',
          [searchByValue]: query,
          ...sorting
          // ...defaultFilter
        });
        setUsersState(response.data);
        setPage(newPage);
        NProgress.done();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        NProgress.done();
      }
      return response;
    })().then((data) => {});
  };

  const handleLimitChange = (event) => {
    (async () => {
      let response;
      NProgress.start();
      const sorting = { sort: `${sortDir}${sort}` };

      try {
        response = await getAllUsersFiltered(page + 1, event.target.value, {
          //   include: 'user',
          [searchByValue]: query,
          // ...defaultFilter
          ...sorting
        });
        setUsersState(response.data);
        setLimit(parseInt(event.target.value));
        NProgress.done();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        NProgress.done();
      }
      return response;
    })().then((data) => {});
  };

  const handleOnPressEnterQuery = (e) => {
    if (query === '') {
      setPage(0);
    }
    const sorting = { sort: `${sortDir}${sort}` };
    if (e.key === 'Enter') {
      (async () => {
        let response;
        NProgress.start();
        try {
          response = await getAllUsersFiltered(page + 1, limit, {
            include: 'user',
            [searchByValue]: query,
            // ...defaultFilter
            ...sorting
          });
          setUsersState(response.data);
          setPage(page);
          NProgress.done();
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
          NProgress.done();
        }
        return response;
      })();
    }
  };

  const handleSortQuery = (e) => {
    const sorting = { sort: `${sortDir}${sort}` };
    (async () => {
      let response;
      NProgress.start();
      try {
        response = await getAllUsersFiltered(page + 1, limit, {
          include: 'user',
          [searchByValue]: query,
          // ...defaultFilter
          ...sorting
        });
        setUsersState(response.data);
        setPage(page);
        NProgress.done();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        NProgress.done();
      }
      return response;
    })();
  };

  const initiaizelAssignDialog = async (booking) => {
    dispatch(openAssignToEngrModal({ booking, forType: 'assign' }));
    dispatch(
      setModalLabels({
        title: 'Assign Confirmation',
        closeLabel: 'Close',
        agreeLabel: 'Assign',
        body: 'Assign this booking to an Engineer'
      })
    );
  };

  const handleAssignAction = async () => {
    try {
      await postAssignBooking(booking.id, { user_id: assignedUserId });
      enqueueSnackbar('Booking successfully assigned!', {
        variant: 'success'
      });
      dispatch(closeAssignToEngrModal());
      window.location = '/booking-list';
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: 'error'
      });
      dispatch(closeAssignToEngrModal());
    }
  };

  const ActionButtons = ({ booking }) => {
    if (!booking.user_id) {
      return (
        <Button
          variant="outlined"
          size="small"
          onClick={() => initiaizelAssignDialog(booking)}
        >
          Assign to Engr
        </Button>
      );
    }

    if (
      booking.user_id &&
      booking.user_id !== user.user.id &&
      booking.status !== 'completed'
    ) {
      return (
        <Button variant="text" size="small">
          Assigned
        </Button>
      );
    }

    return null;
  };

  return (
    <>
      <Card {...other}>
        <Box p={2} minHeight={56} display="flex" alignItems="center">
          <Box>
            <TextField
              // className={classes.queryField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              label="Search"
              onChange={handleQueryChange}
              onKeyPress={handleOnPressEnterQuery}
              placeholder="Search"
              value={query}
              variant="outlined"
              size="small"
            />
          </Box>
          <Box ml={2}>
            <TextField
              label="Search By"
              name="sort"
              onChange={handleSearchByChange}
              select
              size="small"
              SelectProps={{ native: true }}
              value={searchByValue}
              variant="outlined"
            >
              {searchByOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Box>
          <Box ml={6}>
            <TextField
              label="Sort By"
              name="sort"
              onChange={handleSortChange}
              select
              size="small"
              SelectProps={{ native: true }}
              value={sort}
              variant="outlined"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Box>
          <Box ml={2}>
            <TextField
              label="Direction"
              name="sort"
              onChange={handleSortDirChange}
              select
              size="small"
              SelectProps={{ native: true }}
              value={sortDir}
              variant="outlined"
            >
              {sortDirectionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Box>
          <Box ml={2}>
            <Button variant="outlined" onClick={() => handleSortQuery()}>
              Sort
            </Button>
          </Box>
          <Box flexGrow={1} />
        </Box>

        <CardHeader action={<div />} title="Bookings" />
        <Divider />
        {/* <Scrollbar> */}
        <Box sx={{ minWidth: 1150 }}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone no.</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Address</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersState.data.map((user) => {
                // const isBookingSelected = selectedOrders.includes(booking.id);

                return (
                  <TableRow
                    hover
                    key={user.id}
                    // selected={selectedOrders.indexOf(booking.id) !== -1}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isOrderSelected}
                        color="primary"
                        onChange={(event) =>
                          handleSelectOneOrder(event, order.id)
                        }
                        value={isOrderSelected}
                      />
                    </TableCell> */}
                    <TableCell>
                      <Typography color="textPrimary" variant="subtitle2">
                        # {user.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="subtitle2">
                        {user.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="body2">
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>{user.phone_no}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell align="right">
                      <NextLink href={`users/${user.id}/edit`} passHref>
                        <Button variant="text" size="small">
                          Edit
                        </Button>
                      </NextLink>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        {/* </Scrollbar> */}
        <TablePagination
          component="div"
          count={_.get(usersState, 'meta.pagination.total')}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

UserListTable.propTypes = {
  orders: PropTypes.array.isRequired,
  bookings: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default UserListTable;
