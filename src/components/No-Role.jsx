import React, { useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { useMatomo } from '@datapunt/matomo-tracker-react';

export default function NoRole() {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView()
  }, []);

  return (
    <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <Grid size={{ xs: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Unassigned Role
          </Typography>
            <Typography variant="h5" component="h2" />
            <Typography>You currently do not have access to Donor Reporting Portal, please reach out your focal point.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid >
  );
}
