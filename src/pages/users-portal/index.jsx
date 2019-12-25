import React from 'react';
import UsersFilter from './components/users-filter';
import UsersTable from 'components/table/users-table';

export default function UsersManagement() {
  return (
    <>
      <UsersFilter />
      <UsersTable />
    </>
  );
}
