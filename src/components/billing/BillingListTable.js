import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import NextLink from 'src/components/NextLink';
import NextLink from 'next/link';
import router from 'next/router';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import _ from 'lodash';

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
  Tooltip
} from '@mui/material';
import { useSnackbar } from 'notistack';
import ArrowRightIcon from '../../icons/ArrowRight';
import PencilAltIcon from '../../icons/PencilAlt';
// Label
import MoreMenu from '../MoreMenu';
import Scrollbar from '../Scrollbar';
import {
  closeModal,
  openModal,
  openMakeInvoiceModal,
  closeMakeInvoiceModal,
  setModalLabels,
  openBookFileModal
} from 'src/slices/booking';
import { useDispatch, useSelector } from 'src/store';
import {
  postConfirmBooking,
  postCompleteBooking,
  getAllBookings,
  postCreateInvoice,
  getSendSurveyProcessing,
  getSendSurveyReceiving
} from 'src/api';
// import BookingConfirmationModal from './dialogs/BookingConfirmationModal';
import Label from '../Label';
import nProgress from 'nprogress';
import { SeverityPill } from '../SeverityPill';
// import BookingConfirmationModal from '../booking/dialogs/BookingConfirmationModal';
import CreateInvoiceModal from '../billing/dialogs/CreateInvoiceModal';
import BookingFileDialog from '../booking/dialogs/BookingFileDialog';
import SurveyCostCalculatorModal from '../booking/dialogs/SurveyCostCalculatorModal';

const severityMap = {
  paid: 'success',
  pending: 'info',
  failed: 'error'
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
const BillingListTable = (props) => {
  const { orders, bookings, user, page: whatPage, ...other } = props;
  const [bookingsState, setBookingsState] = useState(bookings);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { booking, forType, invoiceAmount } = useSelector(
    (state) => state.booking
  );

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

  const initializeMakeInvoiceDialog = async (booking) => {
    dispatch(openMakeInvoiceModal({ booking }));
    dispatch(
      setModalLabels({
        title: 'Send and Invoice to the client',
        closeLabel: 'Close',
        agreeLabel: 'Confirm',
        body: 'Are you sure you want to send this invoice?'
      })
    );
  };

  const initiaizelCompletedDialog = async (booking) => {
    dispatch(openModal({ booking, forType: 'completed' }));
    dispatch(
      setModalLabels({
        title: 'Complete Booking Confirmation',
        closeLabel: 'Close',
        agreeLabel: 'Complete',
        body: 'Are you sure you want to complete this booking?'
      })
    );
  };

  const handleMakeInvoiceAction = async () => {
    try {
      // switch (forType) {
      //   case 'confirm':
      //     await postConfirmBooking(booking.id);
      //     enqueueSnackbar(
      //       'Booking successfully confirmed, an email will be sent to the client!',
      //       {
      //         variant: 'success'
      //       }
      //     );
      //     dispatch(closeModal());
      //     router.push('/booking-list?my-bookings=true');
      //     break;
      //   case 'completed':
      //     await postCompleteBooking(booking.id);
      //     enqueueSnackbar('Booking successfully completed', {
      //       variant: 'success'
      //     });
      //     dispatch(closeModal());
      //     router.push('/booking-list?my-bookings=true');
      //     break;
      //   default:
      //     break;
      // }
      await postCreateInvoice(booking.id, { amount: invoiceAmount });
      enqueueSnackbar('Invoice has been sent to the client!', {
        variant: 'success'
      });
      dispatch(closeMakeInvoiceModal());
      router.push('/billing');
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: 'error'
      });
      dispatch(closeMakeInvoiceModal());
    }
  };

  const handleSurveyProcessing = async (booking) => {
    try {
      await getSendSurveyProcessing(booking.id);
      enqueueSnackbar('An email has been sent to the client!', {
        variant: 'success'
      });
      dispatch(closeMakeInvoiceModal());
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: 'error'
      });
    }
  };

  const handleSurveyReceiving = async (booking) => {
    try {
      await getSendSurveyReceiving(booking.id);
      enqueueSnackbar('An email has been sent to the client!', {
        variant: 'success'
      });
      dispatch(closeMakeInvoiceModal());
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: 'error'
      });
    }
  };

  const openDialogFiles = async (booking) => {
    let params = {
      'filter[id]': booking.id,
      include: 'files'
    };
    const response = await getAllBookings(params);
    const bookingModel = _.get(response, 'data.data[0]', null);
    console.log(_.get(response, 'data.data[0]', null));
    if (bookingModel) {
      dispatch(openBookFileModal({ booking: bookingModel }));
    }
  };

  const paginatedOrders = applyPagination(orders, page, limit);
  const enableBulkActions = selectedOrders.length > 0;
  const selectedSomeOrders =
    selectedOrders.length > 0 && selectedOrders.length < orders.length;
  const selectedAllOrders = selectedOrders.length === orders.length;

  return (
    <>
      <Card {...other}>
        <Box p={2} minHeight={56} display="flex" alignItems="center">
          <Box>
            <Button
              variant="text"
              size="small"
              onClick={() => {}}
            >
              Survey Lot Calculator
            </Button>
          </Box>
        </Box>
        <CardHeader action={<div />} title="My Bookings" />
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
                <TableCell>Assigned Engineer</TableCell>
                <TableCell>Survey Type</TableCell>
                <TableCell>Address of survey land</TableCell>
                {/* <TableCell>
                    Total
                  </TableCell> */}
                {/* <TableCell>Status</TableCell> */}
                <TableCell>Payment Status</TableCell>
                <TableCell>GCash Link</TableCell>
                <TableCell>GCash Reference No</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.data.length <= 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography variant="subtitle2">
                      You have no assigned bookings yet 😢
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
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
                    <TableCell>{_.get(booking, 'user.name')}</TableCell>
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
                      <SeverityPill
                        color={
                          severityMap[_.get(booking, 'invoice.status')] ||
                          'warning'
                        }
                      >
                        {_.get(booking, 'invoice.status')}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <Link href={_.get(booking, 'invoice.gcash_checkout_url')}>
                        Click here
                      </Link>
                    </TableCell>
                    <TableCell>
                      {_.get(booking, 'invoice.reference_id')}
                    </TableCell>
                    <TableCell>
                      PHP{' '}
                      {numeral(_.get(booking, 'invoice.amount')).format(
                        '0,0.00'
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {booking.status === 'completed' &&
                        _.get(booking, 'invoice.status') !== 'paid' && (
                          <>
                            <Tooltip title="Click this to send invoice to the client">
                              ``{' '}
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() =>
                                  initializeMakeInvoiceDialog(booking)
                                }
                              >
                                Make an Invoice
                              </Button>
                            </Tooltip>
                            <Button
                              sx={{ ml: 1 }}
                              variant="outlined"
                              size="small"
                              onClick={() => openDialogFiles(booking)}
                            >
                              View Lot Survey
                            </Button>
                          </>
                        )}
                      {booking.status === 'confirmed' && (
                        <Tooltip title="Click this if you have completed the survey">
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => initiaizelCompletedDialog(booking)}
                          >
                            Complete Booking
                          </Button>
                        </Tooltip>
                      )}
                      {_.get(booking, 'invoice.status') == 'paid' && (
                        <>
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => handleSurveyProcessing(booking)}
                          >
                            Process
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => handleSurveyReceiving(booking)}
                          >
                            Receiving
                          </Button>
                        </>
                      )}
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
          count={orders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>

      <CreateInvoiceModal handleAction={handleMakeInvoiceAction} />
      <BookingFileDialog />
      <SurveyCostCalculatorModal open/>
    </>
  );
};

BillingListTable.propTypes = {
  orders: PropTypes.array.isRequired,
  bookings: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default BillingListTable;
