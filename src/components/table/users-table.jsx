import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useTableStyles } from 'styles/table-styles';
import EnhancedTableHead from './table-head';
import EnhancedTableToolbar from './table-toolbar';
import AddUserModal from 'pages/users-portal/components/add-user-modal';
import { Button, Box } from '@mui/material';
import { selectUserRoles } from 'selectors/user';
import { BACKEND_PROPERTIES_USER_LAST_LOGIN } from '../../lib/constants';
import { stableSort, getSorting } from './lib';
import { selectLoading, selectUserDonor } from 'selectors/ui-flags';
import UserRowItem from './user-row-item';
import DeleteUserDialog from 'components/DeleteUserDialog';
import { deleteUserRole } from 'actions';
import { useDispatch } from 'react-redux';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { usePermissions } from '../../components/PermissionRedirect';
import {selectConfig} from 'selectors/collections';

let headCells = [
  { id: 'user_first_name', numeric: false, disablePadding: false, label: 'Name', sortable: true },
  { id: 'user_email', numeric: false, disablePadding: false, label: 'Email', sortable: true },
  { id: 'group_name', numeric: false, disablePadding: false, label: 'Role', sortable: true },
  { id: 'notification_period', numeric: false, disablePadding: false, label: 'Notification Period', sortable: true },
  {
    id: BACKEND_PROPERTIES_USER_LAST_LOGIN,
    numeric: false,
    disablePadding: false,
    label: 'Status',
    sortable: true
  },
  { id: 'actions', numeric: false, disablePadding: false, label: 'Actions', sortable: false }
];

export default function UsersTable() {
  const { trackPageView } = useMatomo();
  const classes = useTableStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState({});
  const [deleteUser, setDeleteUser] = useState({});
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const users = useSelector(selectUserRoles);
  const donor = useSelector(selectUserDonor);
  const config = useSelector(selectConfig);
  const isGaviDonor = donor.code === config.gavi_donor_code;
  const { isDonorAdmin, isSuperUser } = usePermissions();
  const hasEditRights = isDonorAdmin || isSuperUser;

  const onCloseAddUserModal = () => {
    setEditingUser({});
    setAddUserModalOpen(false);
  };

  const openAddUserModal = () => setAddUserModalOpen(true);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickEdit = (user) => {
    setEditingUser(user);
    openAddUserModal();
  }

  const handleClickDelete = (user) => {
    setDeleteUser(user);
    setOpen(true);
  }

  const handleCancelDelete = () => {
    setOpen(false);
  }

  const handleConfirmDelete = () => {
    dispatch(deleteUserRole(deleteUser.id))
    setOpen(false);
  }

  useEffect(() => {
    trackPageView()
  }, []);

  const emptyRows =
    users.length === 0 ? 1 : rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);
  const loading = useSelector(selectLoading);
  if (!hasEditRights) {
    headCells = headCells.filter(x => x.id !== 'actions');
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {hasEditRights && (
          <EnhancedTableToolbar>
            <Box sx={{ display: 'flex' }}>
              <Button
                onClick={openAddUserModal}
                className={classes.addBtn}
                color="secondary"
                variant="contained"
              >
                Add User
              </Button>
            </Box>
          </EnhancedTableToolbar>
        )}
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              cells={headCells}
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {stableSort(users, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <UserRowItem user={user} isGaviDonor={isGaviDonor} key={index} showActions={hasEditRights} onClickEdit={(user) => handleClickEdit(user)} onClickDelete={(user) => handleClickDelete(user)} />
                ))}

              <TableRow>
                <TableCell colSpan={4} className={classes.emptyLine}>
                  {!loading && users.length == 0 && (
                    <Typography color="primary">0 results returned</Typography>
                  )}
                </TableCell>
              </TableRow>
              {users.length > 1 && emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <AddUserModal open={addUserModalOpen} onClose={onCloseAddUserModal} userProp={editingUser} />
      <DeleteUserDialog open={open} onCancel={handleCancelDelete} onConfirmDelete={handleConfirmDelete} />
    </div>
  );
}
