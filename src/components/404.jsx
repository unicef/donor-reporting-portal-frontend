import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import EmptyState from './EmptyState';
import { useNav } from './Drawer';

export default function NotFound() {
  const { trackPageView } = useMatomo();
  const { goHome } = useNav();

  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto' }}>
      <EmptyState
        icon={<SearchOffOutlinedIcon />}
        title="Page not found"
        description="The page you are looking for may have moved, or you may not have access to it."
        action={
          <Button variant="contained" color="secondary" onClick={goHome}>
            Back to reports
          </Button>
        }
      />
    </Box>
  );
}
