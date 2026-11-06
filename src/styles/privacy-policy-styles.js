import { makeStyles } from 'styles/makeStyles';

export const usePrivacyPolicyStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 880,
    margin: '0 auto',
    padding: theme.spacing(3, 2, 6),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 3, 8)
    }
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  iconBadge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    flexShrink: 0,
    borderRadius: 14,
    color: theme.palette.secondary.main,
    backgroundColor: `${theme.palette.secondary.main}14`
  },
  title: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    letterSpacing: '-0.01em',
    marginTop: theme.spacing(0.25)
  },
  subtitle: {
    marginTop: theme.spacing(0.75),
    maxWidth: 620
  },
  card: {
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 16,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    lineHeight: 1.7,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4)
    },
    '& h2': {
      color: theme.palette.text.primary,
      fontSize: '1.15rem',
      fontWeight: 700,
      lineHeight: 1.35,
      margin: theme.spacing(3, 0, 1),
      '&:first-of-type': {
        marginTop: 0
      }
    },
    '& p': {
      margin: theme.spacing(0, 0, 1.5)
    },
    '& strong': {
      color: theme.palette.text.primary
    },
    '& ul': {
      margin: theme.spacing(0, 0, 2),
      paddingLeft: theme.spacing(3)
    },
    '& li': {
      marginBottom: theme.spacing(0.75)
    },
    '& a': {
      color: theme.palette.secondary.dark,
      fontWeight: 600,
      textDecoration: 'underline',
      textUnderlineOffset: '2px'
    }
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3)
  }
}));
