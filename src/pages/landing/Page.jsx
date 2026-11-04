import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Divider,
  Link,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { makeStyles } from 'styles/makeStyles';
import bgImage from './img/home-bkg-3.jpg';
import circleLogo from 'assets/images/unicef_circle_logo.png';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { BRAND } from 'styles/theme';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    color: '#FFFFFF',
    backgroundImage: `linear-gradient(115deg, rgba(7, 44, 89, 0.96) 0%, rgba(11, 59, 117, 0.9) 45%, rgba(20, 121, 180, 0.72) 100%), url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  shell: {
    minHeight: '100vh',
    maxWidth: 1240,
    margin: '0 auto',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 5)
    }
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5)
  },
  brandLogo: {
    height: 34,
    width: 'auto',
    display: 'block'
  },
  brandName: {
    fontSize: '0.875rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
    color: 'rgba(255, 255, 255, 0.86)'
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(4),
    flexDirection: 'column',
    padding: theme.spacing(6, 0),
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      gap: theme.spacing(8),
      padding: theme.spacing(6, 0, 7)
    }
  },
  copy: {
    maxWidth: 620,
    width: '100%'
  },
  eyebrow: {
    marginBottom: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    color: '#FFFFFF',
    border: '1px solid rgba(255, 255, 255, 0.24)',
    fontWeight: 600,
    letterSpacing: '0.06em'
  },
  title: {
    fontSize: 'clamp(2.35rem, 5vw, 3.5rem)',
    fontWeight: 700,
    lineHeight: 1.08,
    letterSpacing: '-0.03em',
    marginBottom: theme.spacing(2)
  },
  accent: {
    color: '#9BE3FA'
  },
  lead: {
    maxWidth: 540,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.0625rem',
    lineHeight: 1.7
  },
  features: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1.25)
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1, 1.5),
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.16)',
    color: 'rgba(255, 255, 255, 0.92)',
    fontSize: '0.8125rem',
    fontWeight: 500
  },
  featureIcon: {
    fontSize: 17,
    color: '#9BE3FA'
  },
  card: {
    width: '100%',
    maxWidth: 410,
    padding: theme.spacing(4),
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    color: BRAND.ink,
    boxShadow: '0 24px 70px rgba(4, 28, 57, 0.36)',
    borderRadius: 20
  },
  cardLogo: {
    width: 68,
    height: 68,
    objectFit: 'contain',
    display: 'block',
    marginBottom: theme.spacing(2.5)
  },
  cardTitle: {
    color: BRAND.navy,
    fontWeight: 700,
    marginBottom: theme.spacing(1)
  },
  cardText: {
    color: BRAND.muted,
    marginBottom: theme.spacing(3)
  },
  signInBtn: {
    minHeight: 48,
    fontSize: '0.9375rem'
  },
  divider: {
    margin: theme.spacing(3, 0, 2)
  },
  browserNote: {
    color: BRAND.muted,
    display: 'block'
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    borderTop: '1px solid rgba(255, 255, 255, 0.16)',
    paddingTop: theme.spacing(2.5),
    color: 'rgba(255, 255, 255, 0.62)',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  },
  footerLink: {
    color: 'rgba(255, 255, 255, 0.86)',
    textDecoration: 'underline',
    textUnderlineOffset: 3,
    '&:hover': {
      color: '#FFFFFF'
    }
  }
}));

const features = [
  { label: 'Certified reports', Icon: DescriptionOutlinedIcon },
  { label: 'Secure access', Icon: VerifiedUserOutlinedIcon },
  { label: 'User management', Icon: ManageAccountsOutlinedIcon }
];

export default function LandingPage() {
  const classes = useStyles();

  function signIn() {
    const url = window.location.origin;
    window.location.href = `${url}/social/login/unicef-azuread-b2c-oauth2/`;
  }

  return (
    <Box className={classes.root} component="main">
      <Box className={classes.shell}>
        <Box className={classes.brand}>
          <img src={circleLogo} className={classes.brandLogo} alt="" aria-hidden="true" />
          <Typography className={classes.brandName}>UNICEF</Typography>
        </Box>

        <Box className={classes.content}>
          <Box className={classes.copy}>
            <Chip
              className={classes.eyebrow}
              label="UNICEF internal platform"
              size="small"
              icon={<VerifiedUserOutlinedIcon sx={{ color: '#FFFFFF !important', fontSize: 16 }} />}
            />
            <Typography variant="h1" className={classes.title} component="h1">
              Welcome to the{' '}
              <Box component="span" className={classes.accent}>
                Donor Reporting Portal
              </Box>
            </Typography>
            <Typography className={classes.lead}>
              Find certified donor reports, grant documentation and account information in one
              secure workspace. Sign in with your UNICEF credentials to continue.
            </Typography>

            <Stack className={classes.features} direction="row" flexWrap="wrap">
              {features.map(({ label, Icon }) => (
                <Box className={classes.feature} key={label}>
                  <Icon className={classes.featureIcon} />
                  {label}
                </Box>
              ))}
            </Stack>
          </Box>

          <Paper className={classes.card} elevation={0}>
            <img src={circleLogo} className={classes.cardLogo} alt="UNICEF" />
            <Typography variant="h4" className={classes.cardTitle} component="h2">
              Sign in to continue
            </Typography>
            <Typography className={classes.cardText}>
              Use your UNICEF account to access the portal. You will be redirected to the secure
              sign-in service.
            </Typography>
            <Button
              className={classes.signInBtn}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<LoginOutlinedIcon />}
              onClick={signIn}
            >
              Sign in
            </Button>
            <Divider className={classes.divider} />
            <Typography variant="caption" className={classes.browserNote}>
              This site works best in the latest versions of Google Chrome, Safari, Microsoft Edge
              and Firefox.
            </Typography>
          </Paper>
        </Box>

        <Box className={classes.footer}>
          <Typography variant="caption">© {new Date().getFullYear()} UNICEF</Typography>
          <Link
            className={classes.footerLink}
            component={RouterLink}
            to="/privacy-policy"
            variant="caption"
            underline="always"
          >
            Privacy policy
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
