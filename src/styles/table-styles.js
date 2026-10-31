import { makeStyles } from 'styles/makeStyles';
import { lighten } from '@mui/material/styles';

export const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  highlight: theme.palette.mode === 'light' ? {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
  } : {
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
    flex: '0 0 auto'
  }
}));

export const useTableStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
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
    maxHeight: 'calc(100vh - 526px)',
    minHeight: 500
  },
  detailsPanel: {
    paddingRight: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  detailsHeader: {
    marginBlockStart: '5px',
    marginBlockEnd: '5px',
    fontWeight: '500'
  },
  icon: {
    marginRight: '10px',
    verticalAlign: 'middle'
  },
  dBlock: {
    display: 'block'
  }
}));
