import { useState } from 'react';
import DatePicker from '@mui/lab/DatePicker';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import PickersDay from '@mui/lab/PickersDay';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';
import { styled } from '@mui/material/styles';
import MomentAdapter from '@date-io/moment';
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  TextField,
  Typography,
  Grid,
  Container,
  Stack
} from '@mui/material';
import PlusIcon from 'src/icons/Plus';

const moment = new MomentAdapter();

// const CustomPickersDay = styled(PickersDay, {
//   shouldForwardProp: (prop) => {
//     return (
//       prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay"
//     );
//   },
// })(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
//   ...(dayIsBetween && {
//     borderRadius: 0,
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.common.white,
//     "&:hover, &:focus": {
//       backgroundColor: theme.palette.primary.dark,
//     },
//   }),
//   ...(isFirstDay && {
//     borderTopLeftRadius: "50%",
//     borderBottomLeftRadius: "50%",
//   }),
//   ...(isLastDay && {
//     borderTopRightRadius: "50%",
//     borderBottomRightRadius: "50%",
//   })
// }));

function CustomDay() {
  const [value, setValue] = useState(new Date());

  // const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
  //   if (!value) {
  //     return <PickersDay {...pickersDayProps} />;
  //   }

  //   const start = startOfWeek(value);
  //   const end = endOfWeek(value);

  //   const dayIsBetween = isWithinInterval(date, { start, end });
  //   const isFirstDay = isSameDay(date, start);
  //   const isLastDay = isSameDay(date, end);

  //   return (
  //     <CustomPickersDay
  //       {...pickersDayProps}
  //       disableMargin
  //       dayIsBetween={dayIsBetween}
  //       isFirstDay={isFirstDay}
  //       isLastDay={isLastDay}
  //     />
  //   );
  // };
  return (
    <StaticDatePicker
      displayStaticWrapperAs="desktop"
      label="Week picker"
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      onMonthChange={(date) => {
      }}
      shouldDisableDate={(day) => {
        return moment.date(day).format('YYYY-MM-DD') === '2021-11-24';
      }}
      // renderDay={renderWeekPickerDay}
      renderInput={(params) => <TextField {...params} />}
      inputFormat="'Week of' MMM d"
    />
  );
}

const Booking = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        minHeight: '100%',
        p: 3
      }}
    >
      <Container maxWidth={'xl'}>
        <form onSubmit={(event) => event.preventDefault()}>
          <Box>
            <Typography color="textPrimary" variant="h5">
              Fill-up the form to book an appointment
            </Typography>
            <Typography color="textSecondary" sx={{ py: 2 }} variant="body1">
              Proin tincidunt lacus sed ante efficitur efficitur. Quisque
              aliquam fringilla velit sit amet euismod.
            </Typography>
            <Grid container spacing={3}>
              <Grid item md={4} sm={6} xs={12}>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    mt: 3
                  }}
                >
                  <CustomDay />
                </Box>
                <Box
                  sx={{
                    mt: 1
                  }}
                >
                  <Box>
                    <Stack direction="row" spacing={2}>
                      <Button variant="contained">8:00 am - 11:00 am</Button>
                      <Button variant="contained">1:00 pm - 5pm</Button>
                    </Stack>
                  </Box>
                </Box>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    mt: 3
                  }}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    variant="outlined"
                  />
                </Box>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    mt: 3
                  }}
                >
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    variant="outlined"
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    mt: 6
                  }}
                >
                  {/* <Box sx={{ flexGrow: 1 }} /> */}
                  <Button color="primary" type="submit" variant="contained">
                    Book an appointment
                  </Button>
                </Box>
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    mt: 3
                  }}
                >
                  <TextField
                    fullWidth
                    label="Phone no"
                    name="phone_no"
                    variant="outlined"
                  />
                </Box>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    mt: 3
                  }}
                >
                  <TextField
                    fullWidth
                    label="Kinds of survey"
                    name="survey_type"
                    variant="outlined"
                  />
                </Box>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    mt: 3
                  }}
                >
                  <TextField
                    fullWidth
                    label="Land location"
                    name="location"
                    variant="outlined"
                  />
                </Box>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    mt: 3
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Appointment notes"
                    name="appointment_notes"
                    variant="outlined"
                  />
                </Box>
              </Grid>
              {/* <Box sx={{ mt: 2 }}>
            {["Full-Time"].map((tag) => (
              <Chip
                avatar={<Avatar>F</Avatar>}
                key={tag}
                label={tag}
                onDelete={() => {}}
                sx={{
                  "& + &": {
                    ml: 1,
                  },
                }}
                variant="outlined"
              />
            ))}
          </Box> */}
              <Grid item md={4} sm={6} xs={12}>
                {/* <Box
                sx={{
                  display: "flex",
                  mt: 4,
                }}
              >
                <Box sx={{ mr: 2 }}>
                  <DatePicker
                    label="Start Date"
                    onChange={(newDate) => setStartDate(newDate)}
                    renderInput={(inputProps) => (
                      <TextField variant="outlined" {...inputProps} />
                    )}
                    value={startDate}
                  />
                </Box>
                <DatePicker
                  label="End Date"
                  onChange={(newDate) => setEndDate(newDate)}
                  renderInput={(inputProps) => (
                    <TextField variant="outlined" {...inputProps} />
                  )}
                  value={endDate}
                />
              </Box> */}
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default Booking;
