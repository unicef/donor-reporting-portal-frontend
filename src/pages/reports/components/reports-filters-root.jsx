import React, { useEffect, useRef, useState } from 'react';

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

import { prop } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Grid, Box, Button, Chip, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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

  const activeFilterCount =
    (reportYear ? 1 : 0) +
    Object.values(filterValues || {}).filter(value => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== null && value !== '';
    }).length;

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
    <Paper className={classes.filterPaper} variant="outlined">
      <form onSubmit={handleSubmit}>
        <Box className={classes.filterHeader}>
          <Box className={classes.filterHeaderText}>
            <Typography variant="subtitle1" className={classes.filterTitle} component="h2">
              Filters
            </Typography>
            <Typography variant="body2" className={classes.filterSubtitle}>
              Choose a report library and refine the results.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {activeFilterCount > 0 && (
              <Chip
                size="small"
                className={classes.activeChip}
                label={`${activeFilterCount} active`}
                aria-live="polite"
              />
            )}
            <FilterMenuButton onSelectFilter={handleSelectFilter} selected={filtersActiveState} />
          </Box>
        </Box>

        {showValidation && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            You must select a Report Year in order to submit.
          </Alert>
        )}

        <Box sx={{ display: 'flex', flex: '1 1 auto', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Grid
            className={classes.filterComponents}
            container
            direction="row"
            sx={{ flex: '1 1 auto' }}
            spacing={1.5}
          >
            {reportPageName === REPORTS && (
              <Grid className={classes.filterBox} size={{ xs: 12, sm: 3 }}>
                <MandatoryFilters className={classes.yearFilter} />
              </Grid>
            )}
            {selectedFilters.map((filter, idx) => {
              const { Component: FilterComponent } = FILTERS_MAP[filter];

              return (
                <Grid
                  className={classes.filterBox}
                  key={idx}
                  size={{ xs: 12, sm: FILTERS_MAP[filter].gridSize || 3 }}
                >
                  <FilterComponent
                    onChange={handleChangeFilterValue(filter)}
                    value={filterValues[filter]}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Box className={classes.filterActions}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            startIcon={<SearchIcon />}
          >
            {FORM_CONFIG.submit.label}
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            startIcon={<RestartAltIcon />}
            onClick={handleClear}
          >
            {FORM_CONFIG.clear.label}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

      // ReportsFilter.whyDidYouRender = true;
