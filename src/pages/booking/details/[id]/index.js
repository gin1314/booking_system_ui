import { useState, useEffect, useCallback } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Dialog,
  Divider,
  Grid,
  Link,
  Typography
} from '@mui/material';
import _ from 'lodash';
import { BookingPreview } from 'src/components/dashboard/invoice';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useSettings from 'src/hooks/useSettings';
import ArrowLeftIcon from 'src/icons/ArrowLeft';
import ChevronRightIcon from 'src/icons/ChevronRight';
import gtm from 'src/lib/gtm';
import axios from 'src/lib/axios';



const InvoiceDetails = ({ booking }) => {
  // console.log(booking);
  const isMountedRef = useIsMountedRef();
  const { settings } = useSettings();
  const [invoice, setInvoice] = useState(null);
  const [viewPDF, setViewPDF] = useState(false);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getInvoice = useCallback(async () => {
    try {
      const response = await axios.get('/api/invoices/1');

      if (isMountedRef.current) {
        setInvoice(response.data.invoice);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getInvoice();
  }, [getInvoice]);

  if (!invoice) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Booking Details</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                Booking Details
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                {/* <Button
                  color="primary"
                  onClick={() => setViewPDF(true)}
                  sx={{ m: 1 }}
                  variant="outlined"
                >
                  Preview PDF
                </Button> */}
                {/* <PDFDownloadLink
                  document={<InvoicePDF invoice={invoice} />}
                  fileName="invoice"
                  style={{ textDecoration: 'none' }}
                >
                  <Button color="primary" sx={{ m: 1 }} variant="contained">
                    Download PDF
                  </Button>
                </PDFDownloadLink> */}
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <BookingPreview booking={booking} />
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps = async ({ req, res, query, params }) => {
  const { id } = params;
  const {
    cookies: { token }
  } = req;
  let booking;
  try {
    const apiResp = await fetch(
      `${process.env.apiBaseURLLocal}/booking/${id}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json'
        }
      }
    );

    booking = await apiResp.json();

    if (_.get(apiResp, 'status') >= 400) {
      return {
        redirect: {
          permanent: false,
          destination: '/page-not-found'
        }
      }
    }
  } catch (error) {
    console.error('erroerrr');
  }

  return {
    props: {
      booking
    }
  };
};

export default InvoiceDetails;
