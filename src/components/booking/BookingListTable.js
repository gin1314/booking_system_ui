import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import NextLink from 'src/components/NextLink';
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
import OrderListBulkActions from './OrderListBulkActions';
import {
  closeModal,
  openModal,
  setModalLabels,
  closeAssignToEngrModal,
  openAssignToEngrModal
} from 'src/slices/booking';
import { useDispatch, useSelector } from 'src/store';
import { postAssignBooking, getAllBookingsFiltered } from 'src/api';
import BookingConfirmationModal from './dialogs/BookingConfirmationModal';
import Label from '../Label';
import NProgress from 'nprogress';
import { SeverityPill } from '../SeverityPill';
import AssignToEngrModal from './dialogs/AssignToEngrModal';

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
    value: 'filter[id]',
    label: 'Reference no.'
  },
  {
    value: 'filter[schdule_date]',
    label: 'Schedule date'
  },
  {
    value: 'filter[first_name]',
    label: 'Client first name'
  },
  {
    value: 'filter[last_name]',
    label: 'client last name'
  },
  {
    value: 'filter[phone_no]',
    label: 'Client phone no.'
  },
  {
    value: 'filter[email]',
    label: 'Client email'
  },
  {
    value: 'filter[status]',
    label: 'Status'
  }
];

const sortOptions = [
  {
    value: 'id',
    label: 'Reference No.'
  },
  {
    value: 'schedule_date',
    label: 'Schedule date'
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
const BookingListTable = (props) => {
  const { orders, bookings, user, ...other } = props;
  const [bookingsState, setBookingsState] = useState(bookings);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('id');
  const [sortDir, setSortDir] = useState('-');
  const { booking, forType, assignedUserId } = useSelector(
    (state) => state.booking
  );
  const [searchByValue, setSearchByValue] = useState('filter[id]');

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
        response = await getAllBookingsFiltered(newPage + 1, limit, {
          include: 'user',
          [searchByValue]: query,
          ...sorting
          // ...defaultFilter
        });
        setBookingsState(response.data);
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
        response = await getAllBookingsFiltered(page + 1, event.target.value, {
          include: 'user',
          [searchByValue]: query,
          // ...defaultFilter
          ...sorting
        });
        setBookingsState(response.data);
        setLimit(parseInt(event.target.value));
        NProgress.done();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        NProgress.done();
      }
      return response;
    })().then((data) => {});
    // setLimit(parseInt(event.target.value));
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
          response = await getAllBookingsFiltered(page + 1, limit, {
            include: 'user',
            [searchByValue]: query,
            // ...defaultFilter
            ...sorting
          });
          setBookingsState(response.data);
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
    // if (e.key === 'Enter') {
    (async () => {
      let response;
      NProgress.start();
      try {
        response = await getAllBookingsFiltered(page + 1, limit, {
          include: 'user',
          [searchByValue]: query,
          // ...defaultFilter
          ...sorting
        });
        setBookingsState(response.data);
        setPage(page);
        NProgress.done();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        NProgress.done();
      }
      return response;
    })();
    // }
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
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllOrders}
                    color="primary"
                    indeterminate={selectedSomeOrders}
                    onChange={handleSelectAllOrders}
                  />
                </TableCell> */}
                <TableCell>Booking Ref No.</TableCell>
                <TableCell>Booking Schedule</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Customer email</TableCell>
                <TableCell>Survey Type</TableCell>
                <TableCell>Address of survey land</TableCell>
                <TableCell>Survey Engineer</TableCell>
                {/* <TableCell>
                    Total
                  </TableCell> */}
                {/* <TableCell>Status</TableCell> */}
                <TableCell>Booking Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookingsState.data.map((booking) => {
                // const isBookingSelected = selectedOrders.includes(booking.id);

                return (
                  <TableRow
                    hover
                    key={booking.id}
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
                        # {booking.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="subtitle2">
                        {booking.schedule_date}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {booking.timeslot.time_slot_word}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="subtitle2">
                        {`${booking.first_name} ${booking.last_name}`}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {booking.phone_no}
                      </Typography>
                    </TableCell>
                    <TableCell>{booking.email}</TableCell>
                    <TableCell>{booking.survey_type}</TableCell>
                    <TableCell>
                      {joinAddress([
                        booking.land_street,
                        booking.land_city,
                        booking.land_region,
                        booking.land_postal_code
                      ])}
                    </TableCell>
                    <TableCell>{_.get(booking, 'user.name')}</TableCell>
                    {/* <TableCell>{getStatusLabel(order.status)}</TableCell> */}
                    <TableCell>
                      <SeverityPill
                        color={severityMap[booking.status] || 'warning'}
                      >
                        {booking.status}
                      </SeverityPill>
                    </TableCell>
                    <TableCell align="right">
                      {/* {booking.user_id && booking.user_id !== user.user.id ? (
                        <Button variant="text" size="small">
                          Assigned
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => initiaizelAssignDialog(booking)}
                        >
                          Assign
                        </Button>
                      )} */}
                      <ActionButtons booking={booking} />
                      <NextLink href={`/booking/details/${booking.id}`} passHref>
                        <Button variant="text" size="small">
                          Details
                        </Button>
                      </NextLink>

                      {/* <NextLink href="/" passHref>
                        <Button variant="outlined">Assign</Button>
                      </NextLink> */}

                      {/* <IconButton>
                        <PencilAltIcon fontSize="small" />
                      </IconButton> */}
                      {/* <NextLink href="order/dasd"> */}
                      {/* <IconButton>
                        <ArrowRightIcon fontSize="small" />
                      </IconButton> */}
                      {/* </NextLink> */}
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
          count={_.get(bookingsState, 'meta.pagination.total')}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      {/* <OrderListBulkActions
        open={enableBulkActions}
        selected={selectedOrders}
      /> */}
      <BookingConfirmationModal handleAction={handleAssignAction} />
      <AssignToEngrModal handleAction={handleAssignAction} />
    </>
  );
};

BookingListTable.propTypes = {
  orders: PropTypes.array.isRequired,
  bookings: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default BookingListTable;
