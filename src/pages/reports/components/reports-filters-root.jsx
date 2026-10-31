import React, { useEffect, useRef, useState } from 'react';

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

import { prop } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Button, Paper } from '@mui/material';

import useFilterStyles from 'styles/filter-styles';
import { onFetchReports } from 'actions';
import FilterMenuButton from './filter-menu-button';

import useFiltersQueries from 'lib/use-filters-queries';
import { FORM_CONFIG } from 'lib/constants';
import { FILTERS_MAP } from '../lib/filters-map';
import MandatoryFilters from './mandatory-filters';
import { selectMenuBarPage } from 'selectors/ui-flags';
import { REPORTS } from 'lib/constants';
import { selectReportYear } from 'selectors/filter';
import { reportYearChanged } from 'slices/report-filter';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function ReportsFilter() {
  const dispatch = useDispatch();
  const classes = useFilterStyles();
  const pageName = useSelector(selectMenuBarPage);
  const reportPageName = useSelector(selectMenuBarPage);
  const reportYear = useSelector(selectReportYear);
  const [showValidation, setShowValidation] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!reportYear && reportPageName === REPORTS) {
      setShowValidation(true);
      return;
    }
    dispatch(onFetchReports(filterValues));
  }

  function handleClear() {
    clearFilters();
    const year = new Date().getFullYear();
    dispatch(reportYearChanged(year));
    dispatch(onFetchReports({}));
  }

  const {
    handleSelectFilter,
    handleChangeFilterValue,
    filtersActiveState,
    filterValues,
    selectedFilters,
    clearFilters
  } = useFiltersQueries(FILTERS_MAP);

  useEffect(() => {
    if (reportYear) {
      setShowValidation(false);
    }
  }, [reportYear])

  useEffect(() => {
    if (pageName) {
      dispatch(onFetchReports(filterValues));
    }
  }, [pageName]);

  const prevPageName = usePrevious(pageName);

  useEffect(() => {
    if (prop('length', prevPageName)) {
      clearFilters();
      dispatch(onFetchReports({}));
    }
  }, [pageName]);

  return (
    <>
      <Paper className={classes.filterPaper}>
        <form onSubmit={handleSubmit}>
          {showValidation && (
            <Grid container sx={{ alignContent: 'flex-start' }}>
              <span className={classes.validationWarning}>You must select a Report Year in order to submit.</span>
            </Grid>
          )}
          <Grid container spacing={0} direction="row" sx={{ alignItems: 'flex-end' }}>
            {reportPageName === REPORTS && (
              <Grid style={{ width: '240px' }}><MandatoryFilters className={classes.yearFilter} /></Grid>
            )}
            <Grid><FilterMenuButton onSelectFilter={handleSelectFilter} selected={filtersActiveState} /></Grid>
          </Grid>
          <Box sx={{ display: 'flex', flex: '1 1 auto', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Grid
              className={classes.filterComponents}
              container
              direction="row"
              sx={{ flex: '1 1 auto' }}
              spacing={1.5}
            >
              {selectedFilters.map((filter, idx) => {
                const { Component: FilterComponent } = FILTERS_MAP[filter];

                return (
                  <Grid className={classes.filterBox} key={idx} size={{ sm: FILTERS_MAP[filter].gridSize || 3 }}>
                    <FilterComponent
                      onChange={handleChangeFilterValue(filter)}
                      value={filterValues[filter]}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 1.5 }}>
            <Button variant="outlined" color="secondary" onClick={handleClear}>
              {FORM_CONFIG.clear.label}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
              {FORM_CONFIG.submit.label}
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
}

      // ReportsFilter.whyDidYouRender = true;
