import React, { useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useNav } from './Drawer';
import { useMatomo } from '@datapunt/matomo-tracker-react';

export default function NotFound() {
  const { trackPageView } = useMatomo();
  const { goHome } = useNav();

  useEffect(() => {
    trackPageView()
  }, []);

  return (
    <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <Grid size={{ xs: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              404
          </Typography>
            <Typography variant="h5" component="h2" />
            <Typography>Page not found.</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={goHome} size="small">
              Back
          </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid >
  );
}
