import Link from 'next/link';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { useState } from 'react';
import AppFooter from 'src/components/AppFooter';
import HeaderNavBar from 'src/components/HeaderNavBar';
import ValueProposition from 'src/components/ValueProposition';
import { height } from '@mui/system';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

function createBoundaryData(name, t0, t10, t20, t30, t40, t50, t60) {
  return { name, t0, t10, t20, t30, t40, t50, t60 };
}

function createLocationData(name, cost) {
  return { name, cost };
}

function createTopographicData(name, t1, t2, t3, t4) {
  return { name, t1, t2, t3, t4 };
}

const boundaryRows = [
  createBoundaryData('<0.5', '40,000', '', '', '', '', '', ''),
  createBoundaryData(
    '0.5 - 1.0',
    '60,000',
    '218,000',
    '356,000',
    '476,00',
    '582,00',
    '672,00',
    '770,00'
  ),
  createBoundaryData(
    '2',
    '76,000',
    '232,000',
    '368,000',
    '488,000',
    '592,000',
    '682,000',
    '778,000'
  ),
  createBoundaryData(
    '3',
    '76,000',
    '232,000',
    '368,000',
    '488,000',
    '592,000',
    '682,000',
    '778,000'
  ),
  createBoundaryData(
    '4',
    '76,000',
    '232,000',
    '368,000',
    '488,000',
    '592,000',
    '682,000',
    '778,000'
  ),
  createBoundaryData(
    '5',
    '76,000',
    '232,000',
    '368,000',
    '488,000',
    '592,000',
    '682,000',
    '778,000'
  ),
  createBoundaryData(
    '6',
    '76,000',
    '232,000',
    '368,000',
    '488,000',
    '592,000',
    '682,000',
    '778,000'
  ),
  createBoundaryData(
    '7',
    '76,000',
    '232,000',
    '368,000',
    '488,000',
    '592,000',
    '682,000',
    '778,000'
  ),
  createBoundaryData(
    '8',
    '76,000',
    '232,000',
    '368,000',
    '488,000',
    '592,000',
    '682,000',
    '778,000'
  ),
  createBoundaryData(
    '9',
    '76,000',
    '232,000',
    '368,000',
    '488,000',
    '592,000',
    '682,000',
    '778,000'
  ),
  createBoundaryData(
    '10',
    '76,000',
    '232,000',
    '368,000',
    '488,000',
    '592,000',
    '682,000',
    '778,000'
  )
];

const locationRows = [
  createLocationData('Residential', 'PHP 5,000 per plan/sheet'),
  createLocationData('Agricultural', 'PHP 7,000 per plan/sheet'),
  createLocationData('Industrial/Commercial', 'PHP 8,000 per plan/sheet')
];

const topographicRows = [
  createTopographicData(
    '0.5 meters',
    'PHP 50,000',
    'PHP 30,000',
    'PHP 20,000',
    'PHP 15,000'
  ),
  createTopographicData(
    '1 meters',
    'PHP 45,000',
    'PHP 25,000',
    'PHP 15,000',
    'PHP 10,000'
  ),
  createTopographicData(
    '2.0 meters',
    'PHP 40,000',
    'PHP 20,000',
    'PHP 10,000',
    'PHP 8,000'
  ),
  createTopographicData(
    '5.0 meters',
    'PHP 35,000',
    'PHP 15,000',
    'PHP 8,000',
    'PHP 6,000'
  )
];

const GetStartedButtons = (installation, to) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    copy(installation).then(() => {
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <Box
      // {...props}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '&& > *': { minWidth: 'clamp(0px, (492px - 100%) * 999 ,100%)' }
        // ...props.sx
      }}
    >
      <Link href={'/booking'}>
        <Button
          // href={to}
          // component={Link}
          noLinkStyle
          size="large"
          variant="contained"
          endIcon={<KeyboardArrowRightRounded />}
          sx={{ mr: { xs: 0, sm: 2 } }}
        >
          Request a survey now
        </Button>
      </Link>
      <Box sx={{ py: 1, display: { xs: 'block', sm: 'hidden' } }} />
      {/* <Button
        size="large"
        // @ts-expect-error
        variant="code"
        endIcon={
          copied ? <CheckRounded color="primary" /> : <ContentCopyRounded />
        }
        onClick={handleCopy}
        sx={{
          maxWidth: '324px',
          display: 'inline-block',
          justifyContent: 'start',
          overflowX: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          position: 'relative',
          pr: 5
        }}
      >

      </Button> */}
    </Box>
  );
};

const Header = styled('header')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  transition: theme.transitions.create('top'),
  zIndex: theme.zIndex.appBar,
  backdropFilter: 'blur(20px)',
  boxShadow: `inset 0px -1px 1px ${
    theme.palette.mode === 'dark'
      ? theme.palette.primary.main
      : theme.palette.primary.main
  }`,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.72)
      : 'rgba(255,255,255,0.72)'
}));

const GradientText = styled('span')(({ theme, color = 'primary' }) => ({
  background:
    theme.palette.mode === 'dark'
      ? theme.palette.primary.main
      : `linear-gradient(to right, ${theme.palette[color].main}, ${theme.palette[color][700]})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}));

const AppHeader = () => {
  return (
    <>
      <Header>
        <Container
          sx={{ display: 'flex', alignItems: 'center', minHeight: 56 }}
        >
          <Box
            //   component={Link}
            //   href={ROUTES.home}
            aria-label="Go to homepage"
            sx={{ lineHeight: 0, mr: 2 }}
          >
            {/* <SvgMuiLogo width={30} /> */}
            <img src="/static/jbs_logo.jpg" style={{ height: 48, widht: 48 }} />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'initial' } }}>
            <HeaderNavBar />
          </Box>
          <Box sx={{ ml: 'auto' }} />
          {/* <Stack direction="row" spacing={1}>
            <Tooltip title={'dasdasd'} enterDelay={300}>
              <IconButton
                component="a"
                color="primary"
                href="https://github.com/mui"
                data-ga-event-category="header"
                data-ga-event-action="github"
              >
                {<GitHubIcon fontSize="small" />}
                <AccessAlarmIcon color="white" />
              </IconButton>
            </Tooltip>
          </Stack> */}
          <Box sx={{ display: { md: 'none' }, ml: 1 }}>
            <HeaderNavBar />
          </Box>
        </Container>
      </Header>
      <main>
        <Box sx={{ overflow: 'hidden' }}>
          <Container
            sx={{
              minHeight: 500,
              height: 'calc(100vh - 120px)',
              maxHeight: { xs: 500, sm: 700, xl: 1000 },
              transition: '0.3s'
            }}
          >
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Areas in Hectares</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>30</TableCell>
                    <TableCell>40</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell>60</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {boundaryRows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.t0}</TableCell>
                      <TableCell>{row.t10}</TableCell>
                      <TableCell>{row.t20}</TableCell>
                      <TableCell>{row.t30}</TableCell>
                      <TableCell>{row.t40}</TableCell>
                      <TableCell>{row.t50}</TableCell>
                      <TableCell>{row.t60}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Types of Plan</TableCell>
                    <TableCell>Costing</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {locationRows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={1}>

                    </TableCell>
                    <TableCell align="center" colSpan={4}>
                      Cost Per Hectares
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Contour Interval</TableCell>
                    <TableCell>First 1 Hectare or Less</TableCell>
                    <TableCell>Succeding up to 10 Hectares</TableCell>
                    <TableCell>Succeding up to 20 Hectares</TableCell>
                    <TableCell>In excess of 20 Hectares</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topographicRows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.t1}</TableCell>
                      <TableCell>{row.t2}</TableCell>
                      <TableCell>{row.t3}</TableCell>
                      <TableCell>{row.t4}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
        {/* {end hero section} */}
        <ValueProposition />
        <AppFooter />
      </main>
    </>
  );
};

export default AppHeader;
