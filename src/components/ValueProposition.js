import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import GradientText from 'docs/src/components/typography/GradientText';
import StoreIcon from '@mui/icons-material/Store';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import Home from '@mui/icons-material/Home';
import SectionHeadline from './SectionHeadline';

const content = [
  {
    icon: <StoreIcon fontSize="small" color="primary" />,
    title: 'Commercial',
    description:
      "ALTA / ACSM Land Title Surveys, Plats of survey, Design and Layout and more"
  },
  {
    icon: <Home fontSize="small" color="primary" />,
    title: 'Residential',
    description:
      'Including Plats of Highway, Plats of Topography, Plats of Annexation, Plats of Vacation'
  },
  {
    icon: <HandymanRoundedIcon fontSize="small" color="primary" />,
    title: 'Construction',
    description:
      'Design and Layout for Subdivisions and Construction'
  }/* ,
  {
    icon: <AccessibilityNewRounded fontSize="small" color="primary" />,
    title: 'Dedicated to accessibility',
    description:
      "We believe in building for everyone. That's why accessibility is one of our highest priorities with every new feature we ship."
  } */
];

const ValueProposition = () => {
  return (
    <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <SectionHeadline
        overline="Why Choose JBS Land Surveying?"
        title={
          <Typography
            variant="h2"
            sx={{ mt: 1, mb: { xs: 2, sm: 4 }, maxWidth: 500 }}
          >
            Our Surveying Services
          </Typography>
        }
      />
      <Grid container spacing={2}>
        {content.map(({ icon, title, description }) => (
          <Grid key={title} item xs={12} sm={8} md={4}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {icon}
                <Typography
                  fontWeight="bold"
                  component="h3"
                  color="text.primary"
                  variant="body2"
                  sx={{ ml: 1 }}
                >
                  {title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ValueProposition;
