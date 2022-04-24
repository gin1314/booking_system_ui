import * as React from 'react';
import { useRouter } from 'next/router';
import { styled, alpha } from '@mui/material/styles';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
// import IconImage from 'docs/src/components/icon/IconImage';
// import ROUTES from 'docs/src/route';
// import FEATURE_TOGGLE from 'docs/src/featureToggle';
// import Link from 'docs/src/modules/components/Link';

const Navigation = styled('nav')(({ theme }) => ({
  '& ul': {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    display: 'flex'
  },
  '& li': {
    color: theme.palette.text.primary,
    ...theme.typography.body2,
    fontWeight: 700,
    '& > a, & > div': {
      display: 'inline-block',
      color: 'inherit',
      textDecoration: 'none',
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      '&:hover, &:focus': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.primaryDark[700]
            : theme.palette.grey[50],
        color:
          theme.palette.mode === 'dark'
            ? theme.palette.primaryDark[200]
            : theme.palette.grey[700],
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'initial'
        }
      }
    },
    '& > div': {
      cursor: 'default'
    }
  }
}));

export default function HeaderNavBar() {
  return (
    <Navigation>
      <ul role="menubar" /* onKeyDown={handleLeftRightArrow} */>
        {/* <li role="none">
          <Link role="menuitem" href={'/pricing'}>
            Pricing
          </Link>
        </li>
        <li role="none">
          <Link role="menuitem" href={'/about-us'}>
            About us
          </Link>
        </li> */}
        <li role="none">
          <Link role="menuitem" href={'/login'}>
            Admin/Engineer Login
          </Link>
        </li>
      </ul>
    </Navigation>
  );
}
