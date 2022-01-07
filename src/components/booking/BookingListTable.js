import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import NextLink from 'src/components/NextLink';
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
  Typography
} from '@mui/material';
import ArrowRightIcon from '../../icons/ArrowRight';
import PencilAltIcon from '../../icons/PencilAlt';
// Label
import MoreMenu from '../MoreMenu';
import Scrollbar from '../Scrollbar';
import OrderListBulkActions from './OrderListBulkActions';
import Label from '../Label';
import nProgress from 'nprogress';

const getStatusLabel = (paymentStatus) => {
  const map = {
    canceled: {
      color: 'error',
      text: 'Canceled'
    },
    completed: {
      color: 'success',
      text: 'Completed'
    },
    pending: {
      color: 'warning',
      text: 'Pending'
    },
    rejected: {
      color: 'error',
      text: 'Rejected'
    }
  };

  const { text, color } = map[paymentStatus];

  return <Label color={color}>{text}</Label>;
};

const applyPagination = (orders, page, limit) =>
  orders.slice(page * limit, page * limit + limit);

const joinAddress = (arr) => arr.join(', ');

const SetStatusSelect = ({ bookingId, status }) => {
  const [selected, setSelected] = useState(status);
  const handleChange = (event) => {
    setSelected(event.target.value);
  }

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
/**
 * Booking label component
 * @param {*} props
 * @returns null
 */
const BookingListTable = (props) => {
  const { orders, bookings, ...other } = props;
  const [bookingsState, setBookingsState] = useState(bookings);

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  // nProgress.start();

  const handleSelectAllOrders = (event) => {
    setSelectedOrders(
      event.target.checked ? orders.map((order) => order.id) : []
    );
  };

  const handleSelectOneOrder = (event, orderId) => {
    if (!selectedOrders.includes(orderId)) {
      setSelectedOrders((prevSelected) => [...prevSelected, orderId]);
    } else {
      setSelectedOrders((prevSelected) =>
        prevSelected.filter((id) => id !== orderId)
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const paginatedOrders = applyPagination(orders, page, limit);
  const enableBulkActions = selectedOrders.length > 0;
  const selectedSomeOrders =
    selectedOrders.length > 0 && selectedOrders.length < orders.length;
  const selectedAllOrders = selectedOrders.length === orders.length;

  return (
    <>
      <Card {...other}>
        <CardHeader action={<div />} title="Bookings" />
        <Divider />
        {/* <Scrollbar> */}
        <Box sx={{ minWidth: 1150 }}>
          <Table>
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
                <TableCell>Booking Schedule</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Survey Type</TableCell>
                <TableCell>Address of survey land</TableCell>
                {/* <TableCell>
                    Total
                  </TableCell> */}
                {/* <TableCell>Status</TableCell> */}
                <TableCell>Set Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.data.map((booking) => {
                const isBookingSelected = selectedOrders.includes(booking.id);

                return (
                  <TableRow
                    hover
                    key={booking.id}
                    selected={selectedOrders.indexOf(booking.id) !== -1}
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
                    <TableCell>{booking.survey_type}</TableCell>
                    <TableCell>
                      {joinAddress([
                        booking.land_street,
                        booking.land_city,
                        booking.land_region,
                        booking.land_postal_code
                      ])}
                    </TableCell>
                    {/* <TableCell>{getStatusLabel(order.status)}</TableCell> */}
                    <TableCell>
                      <SetStatusSelect bookingId={booking.id} status={booking.status}/>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                      {/* <NextLink href="order/dasd"> */}
                      <IconButton>
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
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
          count={orders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <OrderListBulkActions
        open={enableBulkActions}
        selected={selectedOrders}
      />
    </>
  );
};

BookingListTable.propTypes = {
  orders: PropTypes.array.isRequired,
  bookings: PropTypes.object.isRequired
};

export default BookingListTable;
