import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import MomentAdapter from '@date-io/moment';
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
// import Logo from '../../Logo';
import Scrollbar from '../../Scrollbar';

const moment = new MomentAdapter();

const joinAddress = (arr) => arr.join(', ');

const BookingPreview = (props) => {
  const { booking, ...other } = props;
  return (
    <Paper {...other}>
      <Scrollbar>
        <Box
          sx={{
            minWidth: 800,
            p: 6
          }}
        >
          <Grid container justifyContent="space-between">
            <Grid item>
              {/* <Logo /> */}
              <Typography color="textPrimary" variant="h6">
                www.jbl-survey.com
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textPrimary" variant="h4">
                {''}
              </Typography>
              <Typography color="textPrimary" variant="subtitle2">
                Invoice # {booking.data.id}
              </Typography>
            </Grid>
          </Grid>
          <Grid>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{/* Description */}</TableCell>
                  {/* <TableCell /> */}
                  <TableCell>{/* Unit Price */}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="subtitle2"
                    >
                      Survey date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {moment
                      .date(booking.data.schedule_date)
                      .format('MMMM D, YYYY')}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="subtitle2"
                    >
                      Time
                    </Typography>
                  </TableCell>
                  <TableCell>{booking.data.time_slot_word}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="subtitle2"
                    >
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>{`${booking.data.first_name} ${booking.data.last_name}`}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="subtitle2"
                    >
                      Address
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {joinAddress([
                      booking.data.client_street,
                      booking.data.client_city,
                      booking.data.client_region,
                      booking.data.client_postal_code
                    ])}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="subtitle2"
                    >
                      Phone no
                    </Typography>
                  </TableCell>
                  <TableCell>{booking.data.phone_no}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="subtitle2"
                    >
                      Kind of survey
                    </Typography>
                  </TableCell>
                  <TableCell>{booking.data.survey_type_word}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="subtitle2"
                    >
                      Land location
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {joinAddress([
                      booking.data.land_street,
                      booking.data.land_city,
                      booking.data.land_region,
                      booking.data.land_postal_code
                    ])}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="subtitle2"
                    >
                      Apointment notes
                    </Typography>
                  </TableCell>
                  <TableCell>{booking.data.appointment_notes}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          {/* <Box sx={{ mt: 2 }}>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h6"
            >
              Notes
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Please make sure you have the right bank registration number
              as I
              had issues before and make sure you guys cover transfer
              expenses.
            </Typography>
          </Box> */}
        </Box>
      </Scrollbar>
    </Paper>
  );
};

BookingPreview.propTypes = {
  booking: PropTypes.object.isRequired
};

export default BookingPreview;
