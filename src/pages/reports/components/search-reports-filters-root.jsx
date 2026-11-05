import React, { useEffect, useRef } from 'react';

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

import { prop } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Button, Chip, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import useFilterStyles from 'styles/filter-styles';
import { onFetchSearchReports } from 'actions';
import SearchFilterMenuButton from './search-filter-menu-button';
import ExportButton from './export-button';

import useFiltersQueries from 'lib/use-filters-queries';
import { FORM_CONFIG } from 'lib/constants';
import { FILTERS_MAP } from '../lib/search-filters-map';
import { selectMenuBarPage } from 'selectors/ui-flags';
import { reportYearChanged } from 'slices/report-filter';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function SearchReportsFilter() {
  const dispatch = useDispatch();
  const classes = useFilterStyles();
  const pageName = useSelector(selectMenuBarPage);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(onFetchSearchReports(filterValues));
  }

  function handleClear() {
    clearFilters();
    const year = new Date().getFullYear();
    dispatch(reportYearChanged(year));
    dispatch(onFetchSearchReports({}));
  }

  const {
    handleSelectFilter,
    handleChangeFilterValue,
    filtersActiveState,
    filterValues,
    selectedFilters,
    clearFilters
  } = useFiltersQueries(FILTERS_MAP);

  const activeFilterCount = Object.values(filterValues || {}).filter(value => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== undefined && value !== null && value !== '';
  }).length;

  useEffect(() => {
    if (pageName) {
      dispatch(onFetchSearchReports(filterValues));
    }
  }, [pageName]);

  const prevPageName = usePrevious(pageName);

  useEffect(() => {
    if (prop('length', prevPageName)) {
      clearFilters({search: true});
      dispatch(onFetchSearchReports({}));
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
              Combine filters to narrow down the report library.
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
            <SearchFilterMenuButton
              onSelectFilter={handleSelectFilter}
              selected={filtersActiveState}
            />
            <ExportButton />
          </Box>
        </Box>

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

        {selectedFilters.length === 0 && (
          <Typography variant="body2" className={classes.filterSubtitle} sx={{ mt: 1 }}>
            Use “More filters” to add a field such as Grant, Country or Report type.
          </Typography>
        )}

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
