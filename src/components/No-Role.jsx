import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import EmptyState from './EmptyState';

export default function NoRole() {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView();
  }, []);

  function signOut() {
    window.location.href = `/security/unicef-logout/`;
  }

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto' }}>
      <EmptyState
        icon={<LockOutlinedIcon />}
        title="No portal access assigned"
        description="You currently do not have access to the Donor Reporting Portal. Please reach out to your focal point to request a role."
        action={
          <Button variant="outlined" color="secondary" onClick={signOut}>
            Sign out
          </Button>
        }
      />
    </Box>
  );
}
