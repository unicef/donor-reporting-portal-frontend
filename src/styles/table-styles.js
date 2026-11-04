import { makeStyles } from 'styles/makeStyles';
import { lighten } from '@mui/material/styles';

export const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    gap: theme.spacing(1),
    minHeight: 64,
    flexWrap: 'wrap',
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  highlight:
    theme.palette.mode === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 1 auto',
    minWidth: 0
  },
  titleText: {
    color: theme.palette.secondary.main,
    fontWeight: 600
  },
  count: {
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap'
  }
}));

export const useTableStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(11, 59, 117, 0.06)'
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  cell: {
    paddingRight: 14,
    maxWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  overflow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  titleCell: {
    width: '20%',
    whiteSpace: 'nowrap'
  },
  dateCell: {
    whiteSpace: 'nowrap'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  addBtn: {
    minWidth: 125
  },
  emptyLine: {
    borderBottom: 'none',
    textAlign: 'center'
  },
  tableContainer: {
    maxHeight: 'calc(100vh - 470px)',
    minHeight: 320,
    '@media (max-height: 800px)': {
      minHeight: 260
    }
  },
  detailsRow: {
    backgroundColor: '#F7FAFD'
  },
  detailsPanel: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
    gap: theme.spacing(1.5, 3),
    padding: theme.spacing(1, 0.5)
  },
  detailsHeader: {
    margin: 0,
    marginBottom: theme.spacing(0.25),
    color: theme.palette.text.secondary,
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase'
  },
  icon: {
    marginRight: '10px',
    verticalAlign: 'middle'
  },
  dBlock: {
    display: 'block'
  },
  loadingBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2
  },
  tableWrap: {
    position: 'relative'
  }
}));
