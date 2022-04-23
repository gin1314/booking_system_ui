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
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              sx={{ height: '100%', mx: 'auto' }}
            >
              <Grid item md={7} lg={6} sx={{ m: 'auto' }}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
                    JBS Land Surveying and Titling Services
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ mb: 3, maxWidth: 500 }}
                  >
                    JBS Land Surveying Services is a full service WBE/DBE
                    surveying firm capable of handling all of your surveying
                    needs.
                  </Typography>
                  <GetStartedButtons
                    sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
                  />
                </Box>
              </Grid>
              <Grid
                item
                md={5}
                lg={6}
                sx={{
                  maxHeight: '100%',
                  display: { xs: 'none', md: 'initial' }
                }}
              >
                <Box
                  // ref={rightRef}
                  id="hero-container-right-area"
                  aria-hidden="true"
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'primaryDark.900'
                        : 'grey.50',
                    minWidth: '50vw',
                    minHeight: 500,
                    height: 'calc(100vh - 120px)',
                    maxHeight: { md: 700, xl: 1000 },
                    borderBottomLeftRadius: 10,
                    transition: 'max-height 0.3s',
                    position: 'relative',
                    overflow: 'hidden'
                    // ...rightSx
                  }}
                >
                  <Box sx={{ mt: 30 }}>
                    <img src="/static/man-surveying.jpg" />
                  </Box>
                </Box>
              </Grid>
            </Grid>
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
