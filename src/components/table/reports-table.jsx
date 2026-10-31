import React from 'react';
import { useSelector } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Link, Tooltip, TableContainer } from '@mui/material';
import FiberNewIcon from '@mui/icons-material/FiberNew';

import { useTableStyles } from 'styles/table-styles';
import EnhancedTableToolbar from './table-toolbar';
import EnhancedTableHead from './table-head';
import { selectReports } from 'selectors/collections';
import { usePermissions } from 'components/PermissionRedirect';
import { useTable, getDisplayDate, stableSort, getSorting } from './lib';
import clsx from 'clsx';
import {
  BACKEND_REPORTS_FIELDS,
  BACKEND_THEMATIC_FIELDS,
  EXTERNAL_REF_GRANT_FIELD
} from '../../pages/reports/constants';
import { selectMenuBarPage } from 'selectors/ui-flags';
import { THEMATIC_GRANTS, REPORTS } from 'lib/constants';

export function getRecipientOfficeStr(report) {
  const recipientOffices = report.recipient_office || [];
  return recipientOffices.sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1)).join(',');
}

const certifiedReportsTableHeadings = [
  { id: BACKEND_REPORTS_FIELDS['title'], label: 'Filename', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['recipientOffice'], label: 'Recipient Office', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['reportType'], label: 'Report Type', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['reportEndDate'], label: 'Report End Date', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['grant'], label: 'Grant', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['grantExpiryDate'], label: 'Grant Expiry', sortable: true }
];

const thematicReportsTableHeadings = [
  { id: BACKEND_THEMATIC_FIELDS['title'], label: 'Filename', sortable: true },
  { id: BACKEND_THEMATIC_FIELDS['theme'], label: 'Theme', sortable: true },
  { id: BACKEND_THEMATIC_FIELDS['recipientOffice'], label: 'Recipient Office', sortable: true },
  { id: BACKEND_THEMATIC_FIELDS['reportType'], label: 'Report Type', sortable: true },
  { id: BACKEND_THEMATIC_FIELDS['reportEndDate'], label: 'Report End Date', sortable: true }
];

const externalRefCell = {
  id: EXTERNAL_REF_GRANT_FIELD,
  label: 'Partner Ref Grant',
  sortable: true
};

// inserts extra column for non-unicef users as per requirements
const getHeadCells = (isUnicefUser, cells) => {
  if (!isUnicefUser) {
    return [...cells.slice(0, 2), externalRefCell, ...cells.slice(2)];
  }
  return cells;
};

export default function ReportsTable() {
  const classes = useTableStyles();

  const { isUnicefUser } = usePermissions();

  const rows = useSelector(selectReports);
  const pageName = useSelector(selectMenuBarPage);
  const certifiedReports = pageName === REPORTS;
  const headCells =
    pageName === THEMATIC_GRANTS
      ? thematicReportsTableHeadings
      : getHeadCells(isUnicefUser, certifiedReportsTableHeadings);

  const {
    orderBy,
    order,
    page,
    rowsPerPage,
    getEmptyRows,
    handleRequestSort,
    handleChangeRowsPerPage,
    handleChangePage
  } = useTable();
  const shouldShowExternalGrants = certifiedReports && !isUnicefUser;
  const emptyRows = getEmptyRows(rows);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer className={classes.tableContainer} aria-label="sticky table">
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              cells={headCells}
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell
                        className={clsx(classes.cell, classes.titleCell)}
                        sx={{ paddingRight: '14px', maxWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        <Tooltip title={row.title ? row.title : ''}>
                          <Typography className={classes.overflow}>
                            <Link color="secondary" href={row.download_url} target="_blank">
                              {row.is_new && <FiberNewIcon fontSize="small" color="error" />}
                              {row.title}
                            </Link>
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      {row.theme && (
                        <Tooltip title={row.theme ? row.theme : ''}>
                          <TableCell className={classes.cell} align="left">
                            {row.theme}
                          </TableCell>
                        </Tooltip>
                      )}
                      <Tooltip title={row.recipientOffice ? row.recipientOffice : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.recipient_office ? row.recipient_office.join(', ') : row.recipientOffice}
                        </TableCell>
                      </Tooltip>
                      {shouldShowExternalGrants && (
                        <Tooltip title={row.external_reference ? row.external_reference : ''}>
                          <TableCell className={classes.cell} align="left">{row.external_reference}</TableCell>
                        </Tooltip>
                      )}
                      <Tooltip title={row.report_type ? row.report_type : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.report_type}
                        </TableCell>
                      </Tooltip>
                      <Tooltip title={row.report_end_date ? getDisplayDate(row.report_end_date) : ''}>
                        <TableCell className={clsx(classes.cell, classes.dateCell)} align="left">
                          {getDisplayDate(row.report_end_date)}
                        </TableCell>
                      </Tooltip>
                      {certifiedReports && (
                        <Tooltip title={row.grant_number ? row.grant_number : ''}>
                          <TableCell className={classes.cell} align="left">
                            {row.grant_number}
                          </TableCell>
                        </Tooltip>
                      )}
                      {certifiedReports && (
                        <Tooltip title={row.grant_expiry_date ? getDisplayDate(row.grant_expiry_date) : ''}>
                          <TableCell className={clsx(classes.cell, classes.dateCell)} align="left">
                            {getDisplayDate(row.grant_expiry_date)}
                          </TableCell>
                        </Tooltip>
                      )}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* <DocViewer fileType={docFileType} filePath={doc} /> */}
      </Paper >
    </div >
  );
}
