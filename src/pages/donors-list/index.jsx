import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { makeStyles } from 'styles/makeStyles';
import { Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, TablePagination, InputBase } from '@mui/material';

import { selectDonors } from 'selectors/collections';
import Loader from 'components/Loader';
import clsx from 'clsx';
import { selectLoading } from 'selectors/ui-flags';
import { usePagination } from 'components/table/lib/pagination';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    overflowX: 'auto'
  },
  link: {
    textDecoration: 'inherit',
    color: theme.palette.secondary.main,
    fontWeight: 500
  },
  tableWrapper: {
    overflow: 'auto',
    maxHeight: '65vh'
  },
  inputRoot: {
    backgroundColor: theme.palette.background.paper,
    width: 400,
    display: 'flex',
    alignItems: 'center',
    height: theme.spacing(6),
    paddingRight: theme.spacing(1)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  inputActive: {
    backgroundColor: theme.palette.common.white
  }
}));

export default function DonorsList() {
  const classes = useStyles();

  const [query, setQuery] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const loading = useSelector(selectLoading);

  const { page, rowsPerPage, resetPagination, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const donors = useSelector(selectDonors);
  const pageName = useSelector(state => state.ui.menuBarPage);

  useEffect(() => {
    if (donors.length) {
      setFilteredList(donors);
    }
  }, [donors]);

  function handleSearch(e) {
    resetPagination();
    const { value } = e.target;
    setQuery(value);
    setFilteredList(donors.filter(({ name, code }) => name.toLowerCase().includes(value.toLowerCase()) ||
     code.toLowerCase().includes(value.toLowerCase())));
  }

  return (
    <Grid container direction="row" sx={{ justifyContent: 'center' }}>
      <Loader loading={loading} fullscreen />
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography>Select Donor:</Typography>

        <Paper className={clsx(classes.root)}>
          <div className={classes.tableWrapper}>
            <Table stickyHeader className={clsx(classes.table)}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} className={clsx(searchActive && classes.inputActive)}>
                    <InputBase
                      placeholder="Search"
                      className={classes.input}
                      inputProps={{
                        'aria-label': 'description'
                      }}
                      onChange={handleSearch}
                      value={query}
                      onFocus={() => setSearchActive(true)}
                      onBlur={() => setSearchActive(false)}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => (
                    <TableRow hover key={row.code}>
                      <TableCell component="th" scope="row">
                        <Link className={classes.link} to={`/${pageName}/${row.id}`}>
                          {`${row.name} [${row.code}]`}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={donors.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
