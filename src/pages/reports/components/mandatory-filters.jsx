import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YearFilter from './report-year-filter';
import { selectReportYear } from 'selectors/filter';
import { reportYearChanged } from 'slices/report-filter';
import { Grid } from '@mui/material';
import useFilterStyles from 'styles/filter-styles';
import { parseEventValue } from 'lib/helpers';
import { setCurrentlyLoadedDonor } from 'slices/ui';

export default function MandatoryFilters() {
  const dispatch = useDispatch();
  const classes = useFilterStyles();
  const reportYear = useSelector(selectReportYear);

  useEffect(() => {
    dispatch(reportYearChanged(''))
    return function cleanup() {
      dispatch(setCurrentlyLoadedDonor(''))
    }
  }, [])

  return (
    <Grid style={{ width: '100%' }}>
      <Grid className={classes.filterBox}>
        <YearFilter
          onChange={val => dispatch(reportYearChanged(parseEventValue(val)))}
          value={reportYear}
        />
      </Grid>
    </Grid>
  );
}
