// import { Link as RouterLink } from "react-router-dom";
import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  Typography
} from '@mui/material';
// import AuthBanner from "components/authentication/AuthBanner";
import {
  LoginAmplify,
  LoginAuth0,
  LoginFirebase,
  LoginJWT
} from 'src/components/authentication/login';
// import Logo from '../../components/Logo';
import useAuth from 'src/hooks/useAuth';
import router from 'next/router';

const platformIcons = {
  Amplify: '/static/icons/amplify.svg',
  Auth0: '/static/icons/auth0.svg',
  Firebase: '/static/icons/firebase.svg',
  JWT: '/static/jbs_logo.jpg'
};

const Login = () => {
  const { platform } = useAuth();

  return (
    <>
      <Helmet>
        <title>Login | Book for survey</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        {/* <AuthBanner /> */}
        <Container maxWidth="sm" sx={{ py: '80px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 8
            }}
          >
            {/* <RouterLink to="/"></RouterLink> */}
          </Box>
          <Box sx={{ mb: 3 }}>
            <Card>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  p: 4
                }}
              >
                <Box sx={{ m: 2 }}>
                  <Button
                    color="primary"
                    // disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={() => router.push('/booking')}
                  >
                    Want to book? Click here
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 4
              }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3
                }}
              >
                <div>
                  <Typography color="textPrimary" gutterBottom variant="h5">
                    Log in on the internal platform
                  </Typography>
                  {/* <Typography color="textSecondary" variant="body2">
                    Log in on the internal platform
                  </Typography> */}
                </div>
                <Box
                  sx={{
                    height: 64,
                    '& > img': {
                      maxHeight: '100%',
                      width: 'auto'
                    }
                  }}
                >
                  <img alt="Auth platform" src={platformIcons[platform]} />
                </Box>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3
                }}
              >
                {platform === 'Amplify' && <LoginAmplify />}
                {platform === 'Auth0' && <LoginAuth0 />}
                {platform === 'Firebase' && <LoginFirebase />}
                {platform === 'JWT' && <LoginJWT />}
              </Box>
              <Divider sx={{ my: 3 }} />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
