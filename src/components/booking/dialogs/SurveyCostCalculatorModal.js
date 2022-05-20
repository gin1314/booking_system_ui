import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import numeral from 'numeral';
import _ from 'lodash';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { useSelector, useDispatch } from 'src/store';
import { closeAssignToEngrModal, setAssignedUser } from 'src/slices/booking';
import { getAllBookings, getAllUsers } from 'src/api';

const constructionSurveyTariff = {
  1: { 0: 60, 10: 218, 20: 356, 30: 476, 40: 582, 50: 672, 60: 770 },
  2: { 0: 76, 10: 232, 20: 368, 30: 488, 40: 592, 50: 682, 60: 778 },
  3: { 0: 92, 10: 246, 20: 380, 30: 500, 40: 602, 50: 692, 60: 756 },
  4: { 0: 108, 10: 260, 20: 392, 30: 512, 40: 612, 50: 702, 60: 794 },
  5: { 0: 124, 10: 274, 20: 404, 30: 512, 40: 612, 50: 712, 60: 802 },
  6: { 0: 140, 10: 288, 20: 416, 30: 524, 40: 622, 50: 722, 60: 810 },
  7: { 0: 156, 10: 302, 20: 428, 30: 536, 40: 632, 50: 732, 60: 818 },
  8: { 0: 172, 10: 316, 20: 440, 30: 548, 40: 642, 50: 742, 60: 826 },
  9: { 0: 188, 10: 330, 20: 452, 30: 560, 40: 652, 50: 752, 60: 834 },
  10: { 0: 204, 10: 344, 20: 464, 30: 572, 40: 662, 50: 762, 60: 842 }
};

const boundarySurveyTariff = {
  1: { 0: 30, 10: 109, 20: 178, 30: 238, 40: 291, 50: 336, 60: 385 },
  2: { 0: 38, 10: 116, 20: 184, 30: 244, 40: 296, 50: 341, 60: 389 },
  3: { 0: 46, 10: 123, 20: 190, 30: 250, 40: 301, 50: 346, 60: 393 },
  4: { 0: 54, 10: 130, 20: 196, 30: 256, 40: 306, 50: 351, 60: 397 },
  5: { 0: 62, 10: 137, 20: 202, 30: 256, 40: 306, 50: 356, 60: 401 },
  6: { 0: 70, 10: 144, 20: 208, 30: 262, 40: 311, 50: 361, 60: 405 },
  7: { 0: 78, 10: 151, 20: 214, 30: 268, 40: 316, 50: 366, 60: 409 },
  8: { 0: 86, 10: 158, 20: 220, 30: 274, 40: 321, 50: 371, 60: 826 },
  9: { 0: 94, 10: 165, 20: 226, 30: 280, 40: 326, 50: 376, 60: 834 },
  10: { 0: 102, 10: 172, 20: 232, 30: 286, 40: 331, 50: 381, 60: 842 }
};

const locationSurveyTarif = {
  residential: 5000,
  agricultural: 7000,
  industrial: 10000
};

let computeTariff = (num) => {
  if (num % 10 > 0) {
    return [num % 10, num - (num % 10)];
  }

  if (num % 10 === 0) {
    return [10, num - 10];
  }
};

const Construction = () => {
  const [area, setArea] = useState('');
  const [computedCost, setComputedCost] = useState(0);

  const handleChange = (event) => {
    const num = parseInt(event.target.value);
    const [x, y] = computeTariff(num);

    setComputedCost(_.get(constructionSurveyTariff, `${x}.${y}`, 842) * 1000);

    setArea(event.target.value);
  };

  return (
    <Box>
      <Box minHeight={56} display="flex" alignItems="center">
        <Box>
          <FormControl sx={{ width: '25ch' }} variant="outlined">
            <TextField
              label="Enter lot area"
              id="outlined-start-adornment"
              value={area}
              onChange={handleChange}
              // sx={{ width: '25ch' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">hectares</InputAdornment>
                )
              }}
            />

            {/* <FormHelperText id="outlined-weight-helper-text">{computedCost}</FormHelperText> */}
          </FormControl>
        </Box>
        <Box ml={2}>
          <Button
            onClick={() => {
              setArea('');
              setComputedCost(0);
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>
      <Box minHeight={56} display="flex" alignItems="center">
        <Typography variant="body2" gutterBottom>
          Estimated Cost:
        </Typography>
        <Typography sx={{ ml: 1 }} variant="body1" gutterBottom>
          {'PHP ' + numeral(computedCost).format('0,0.00')}
        </Typography>
      </Box>
    </Box>
  );
};

const SurveyCostCalculatorModal = (props) => {
  const { open } = props;
  const [surveyType, setSurveyType] = useState('construction');

  const handleChange = (event) => {
    setSurveyType(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { width: '30%' } }}
    >
      <DialogTitle id="alert-dialog-title">
        {'Survey Lot Calculator'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description"></DialogContentText>
        <Box mt={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Survey Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={surveyType}
              label="Survey Type"
              onChange={handleChange}
            >
              <MenuItem value={'construction'}>Construction</MenuItem>
              <MenuItem value={'boundary'}>Boundary</MenuItem>
              <MenuItem value={'subdivision'}>Subdivision</MenuItem>
              <MenuItem value={'location'}>Location</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mt={2}>{surveyType === 'construction' && <Construction />}</Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {}}>{'Close'}</Button>
        {/* <Button onClick={() => {}}></Button> */}
      </DialogActions>
    </Dialog>
  );
};

SurveyCostCalculatorModal.propTypes = {};

export default SurveyCostCalculatorModal;
