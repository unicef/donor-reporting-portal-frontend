import React, { useEffect } from 'react';
import { Box, Button, Stack } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import EmptyState from './EmptyState';
import { logoutSession } from 'lib/session-logout';

export default function NoRole() {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView();
  }, []);

  function signOutAzure() {
    window.location.href = `/security/unicef-logout/`;
  }

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto' }}>
      <EmptyState
        icon={<LockOutlinedIcon />}
        title="No portal access assigned"
        description="You currently do not have access to the Donor Reporting Portal. Please reach out to your focal point to request a role."
        action={
          <Stack direction="row" spacing={1.5} flexWrap="wrap" justifyContent="center">
            <Button variant="outlined" color="secondary" onClick={signOutAzure}>
              Sign out from Azure
            </Button>
            <Button variant="outlined" color="secondary" onClick={logoutSession}>
              Log out
            </Button>
          </Stack>
        }
      />
    </Box>
  );
}
