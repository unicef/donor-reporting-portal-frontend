import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, TableCell, TableRow, Typography } from '@mui/material';

// Shown inside a table's body while its API request is in flight, so the user
// can see that the rows they are waiting for are on the way.
export default function TableLoadingRow({ colSpan, label }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
          <CircularProgress size={22} color="secondary" />
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}

TableLoadingRow.propTypes = {
  colSpan: PropTypes.number.isRequired,
  label: PropTypes.string
};

TableLoadingRow.defaultProps = {
  label: 'Loading...'
};
