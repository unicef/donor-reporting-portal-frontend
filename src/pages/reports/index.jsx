import React from 'react';
import ReportsFilter from 'pages/reports/reports-filter';
import ReportsTable from 'components/table/reports';

export default function ReportsPage() {
  return (
    <>
      <ReportsFilter />
      <ReportsTable />
    </>
  );
}
