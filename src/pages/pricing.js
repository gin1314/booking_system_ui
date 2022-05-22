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

function createConstructionData(name, t0, t10, t20, t30, t40, t50, t60) {
  return { name, t0, t10, t20, t30, t40, t50, t60 };
}

function createLocationData(name, cost) {
  return { name, cost };
}

function createTopographicData(name, t1, t2, t3, t4) {
  return { name, t1, t2, t3, t4 };
}

function createSubdivisionData(name, t1, t2, t3, t4, t5) {
  return { name, t1, t2, t3, t4, t5 };
}

const constructionRows = [
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
    '92,000',
    '246,000',
    '380,000',
    '500,000',
    '602,000',
    '692,000',
    '786,000'
  ),
  createBoundaryData(
    '4',
    '108,000',
    '260,000',
    '392,000',
    '512,000',
    '612,000',
    '702,000',
    '794,000'
  ),
  createBoundaryData(
    '5',
    '124,000',
    '274,000',
    '404,000',
    '512,000',
    '612,000',
    '712,000',
    '802,000'
  ),
  createBoundaryData(
    '6',
    '140,000',
    '288,000',
    '416,000',
    '524,000',
    '622,000',
    '722,000',
    '810,000'
  ),
  createBoundaryData(
    '7',
    '156,000',
    '302,000',
    '428,000',
    '536,000',
    '632,000',
    '732,000',
    '818,000'
  ),
  createBoundaryData(
    '8',
    '172,000',
    '316,000',
    '440,000',
    '548,000',
    '642,000',
    '742,000',
    '826,000'
  ),
  createBoundaryData(
    '9',
    '188,000',
    '330,000',
    '452,000',
    '560,000',
    '652,000',
    '752,000',
    '834,000'
  ),
  createBoundaryData(
    '10',
    '204,000',
    '344,000',
    '464,000',
    '572,000',
    '662,000',
    '762,000',
    '842,000'
  )
];

const boundaryRows = [
  createBoundaryData('< 0.5', '20,000', '', '', '', '', '', ''),
  createBoundaryData(
    '0.5 - 1.0',
    '30,000',
    '109,000',
    '178,000',
    '238,000',
    '291,000',
    '336,000',
    '385,000'
  ),
  createBoundaryData(
    '2',
    '38,000',
    '116,000',
    '184,000',
    '244,000',
    '296,000',
    '341,000',
    '389,000'
  ),
  createBoundaryData(
    '3',
    '46,000',
    '123,000',
    '190,000',
    '250,000',
    '301,000',
    '346,000',
    '393,000'
  ),
  createBoundaryData(
    '4',
    '54,000',
    '130,000',
    '196,000',
    '256,000',
    '306,000',
    '351,000',
    '397,000'
  ),
  createBoundaryData(
    '5',
    '62,000',
    '137,000',
    '202,000',
    '256,000',
    '306,000',
    '356,000',
    '401,000'
  ),
  createBoundaryData(
    '6',
    '70,000',
    '144,000',
    '208,000',
    '262,000',
    '311,000',
    '361,000',
    '405,000'
  ),
  createBoundaryData(
    '7',
    '78,000',
    '151,000',
    '214,000',
    '268,000',
    '316,000',
    '366,000',
    '409,000'
  ),
  createBoundaryData(
    '8',
    '86,000',
    '158,000',
    '220,000',
    '274,000',
    '321,000',
    '371,000',
    '413,000'
  ),
  createBoundaryData(
    '9',
    '94,000',
    '165,000',
    '226,000',
    '280,000',
    '326,000',
    '376,000',
    '417,000'
  ),
  createBoundaryData(
    '10',
    '102,000',
    '172,000',
    '232,000',
    '286,000',
    '331,000',
    '281,000',
    '421,000'
  )
];

const locationRows = [
  createLocationData('Residential', 'PHP 5,000 per plan/sheet'),
  createLocationData('Agricultural', 'PHP 7,000 per plan/sheet'),
  createLocationData('Industrial/Commercial', 'PHP 10,000 per plan/sheet')
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

const subdivisionData = [
  createSubdivisionData(
    '2 to 4',
    '20,00',
    'plus',
    '8,500/lot',
    'In excess of 2 lots'
  ),
  createSubdivisionData(
    '5 to 9',
    '45,00',
    'plus',
    '7,000/lot',
    'In excess of 5 lots'
  ),
  createSubdivisionData(
    '10 to 19',
    '80,500',
    'plus',
    '5,000/lot',
    'In excess of 10 lots'
  ),
  createSubdivisionData(
    '20 to 29',
    '120,00',
    'plus',
    '4,800/lot',
    'In excess of 20 lots'
  ),
  createSubdivisionData(
    '30 to 39',
    '178,500',
    'plus',
    '4,300/lot',
    'In excess of 30 lots'
  ),
  createSubdivisionData(
    '40 to 49',
    '221,500',
    'plus',
    '3,800/lot',
    'In excess of 40 lots'
  ),
  createSubdivisionData(
    '50 to 99',
    '259,500',
    'plus',
    '3,300/lot',
    'In excess of 50 lots'
  ),
  createSubdivisionData(
    '100 to 199',
    '424,500',
    'plus',
    '2,800/lot',
    'In excess of 100 lots'
  ),
  createSubdivisionData(
    '200 to 299',
    '704,500',
    'plus',
    '2,600/lot',
    'In excess of 200 lots'
  ),
  createSubdivisionData(
    '300 to 399',
    '964,500',
    'plus',
    '2,400/lot',
    'In excess of 300 lots'
  ),
  createSubdivisionData(
    '400 to 499',
    '1,204,500',
    'plus',
    '2,200/lot',
    'In excess of 400 lots'
  ),
  createSubdivisionData(
    '500 to 999',
    '1,424,500',
    'plus',
    '2,000/lot',
    'In excess of 500 lots'
  ),
  createSubdivisionData(
    '1000 AND UP ',
    '2,424,500',
    'plus',
    '1,400/lot',
    'In excess of 1000 lots'
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
              // height: 'calc(100vh - 120px)',
              // maxHeight: { xs: 500, sm: 700, xl: 1000 },
              transition: '0.3s'
            }}
          >
            <Box mt={5}>
              <Typography variant="h3" sx={{ my: 2, maxWidth: 500 }}>
                Pricing
              </Typography>
            </Box>
            <Box mt={5}>
              <Typography variant="h6" sx={{ my: 2, maxWidth: 500 }}>
                Construction Survey
              </Typography>
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
                    {constructionRows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
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
            </Box>

            <Box mt={5}>
              <Typography variant="h6" sx={{ my: 2, maxWidth: 500 }}>
                Boundary Survey
              </Typography>
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
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
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
            </Box>

            <Box mt={5}>
              <Typography variant="h6" sx={{ my: 2, maxWidth: 500 }}>
                Location Survey
              </Typography>
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
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
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
            </Box>

            <Box mt={5}>
              <Typography variant="h6" sx={{ my: 2, maxWidth: 500 }}>
                Topographic Survey
              </Typography>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={1}></TableCell>
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
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
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
            </Box>

            <Box mt={5}>
              <Typography variant="h6" sx={{ my: 2, maxWidth: 500 }}>
                Subdivision Survey
              </Typography>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={1}>
                        No. Of Lots
                      </TableCell>
                      <TableCell align="center" colSpan={4}>
                        Fees
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subdivisionData.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.t1}</TableCell>
                        <TableCell>{row.t2}</TableCell>
                        <TableCell>{row.t3}</TableCell>
                        <TableCell>{row.t4}</TableCell>
                        <TableCell>{row.t5}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
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
