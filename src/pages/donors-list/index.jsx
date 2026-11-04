import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Box,
  Chip,
  InputAdornment,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

import { makeStyles } from 'styles/makeStyles';
import { selectDonors } from 'selectors/collections';
import Loader from 'components/Loader';
import EmptyState from 'components/EmptyState';
import { selectLoading } from 'selectors/ui-flags';
import { usePagination } from 'components/table/lib/pagination';
import { SEARCH_REPORTS } from 'lib/constants';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 920,
    margin: '0 auto',
    paddingTop: theme.spacing(1)
  },
  header: {
    marginBottom: theme.spacing(2.5)
  },
  eyebrow: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5)
  },
  title: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    marginBottom: theme.spacing(0.75)
  },
  subtitle: {
    color: theme.palette.text.secondary,
    maxWidth: 560
  },
  paper: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(11, 59, 117, 0.06)',
    position: 'relative'
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  },
  searchField: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 420
    }
  },
  countChip: {
    alignSelf: 'flex-start',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
    fontWeight: 600
  },
  tableWrapper: {
    overflow: 'auto',
    maxHeight: '62vh'
  },
  link: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  codeChip: {
    fontFamily: 'monospace',
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor: theme.palette.background.default
  },
  emptyCell: {
    borderBottom: 'none'
  },
  loadingBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2
  }
}));

export default function DonorsList() {
  const classes = useStyles();

  const [query, setQuery] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const loading = useSelector(selectLoading);

  const { page, rowsPerPage, resetPagination, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  const donors = useSelector(selectDonors);
  const pageName = useSelector(state => state.ui.menuBarPage) || SEARCH_REPORTS;
  const hasSearch = query.trim().length > 0;

  useEffect(() => {
    setFilteredList(donors);
  }, [donors]);

  function handleSearch(e) {
    resetPagination();
    const { value } = e.target;
    setQuery(value);
    const normalized = value.toLowerCase();
    setFilteredList(
      donors.filter(({ name, code }) =>
        `${name || ''} ${code || ''}`.toLowerCase().includes(normalized)
      )
    );
  }

  return (
    <Box className={classes.root}>
      <Loader loading={loading} fullscreen />
      <Box className={classes.header}>
        <Typography variant="overline" className={classes.eyebrow} component="p">
          Donor library
        </Typography>
        <Typography variant="h4" className={classes.title} component="h1">
          Select a donor
        </Typography>
        <Typography className={classes.subtitle}>
          Choose the donor whose reports you would like to view. You can search by name or donor
          code.
        </Typography>
      </Box>

      <Paper className={classes.paper} elevation={0}>
        {loading && <LinearProgress className={classes.loadingBar} color="secondary" />}
        <Box className={classes.searchBar}>
          <TextField
            className={classes.searchField}
            placeholder="Search donors by name or code"
            value={query}
            onChange={handleSearch}
            size="small"
            slotProps={{
              htmlInput: { 'aria-label': 'Search donors by name or code' },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                )
              }
            }}
          />
          <Chip
            className={classes.countChip}
            size="small"
            label={`${filteredList.length} ${filteredList.length === 1 ? 'donor' : 'donors'}`}
          />
        </Box>

        <div className={classes.tableWrapper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Donor</TableCell>
                <TableCell width={160}>Code</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                  <TableRow hover key={row.code}>
                    <TableCell component="th" scope="row">
                      <Link className={classes.link} to={`/${pageName}/${row.id}`}>
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Chip className={classes.codeChip} size="small" label={row.code} />
                    </TableCell>
                  </TableRow>
                ))}

              {!loading && filteredList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} className={classes.emptyCell}>
                    <EmptyState
                      icon={<BusinessOutlinedIcon />}
                      title={hasSearch ? 'No donors match your search' : 'No donors available'}
                      description={
                        hasSearch
                          ? 'Try a different donor name or code.'
                          : 'Donors will appear here once they have been configured for your account.'
                      }
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
