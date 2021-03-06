import {
  createSelector
} from 'reselect';
import {
  selectMenuBarPage
} from './ui-flags';
import {
  THEMATIC_GRANTS
} from 'lib/constants';

export const selectReportFilter = state => state.reportFilter;

export const selectReportYear = createSelector(
  selectReportFilter,
  filter => filter.reportYear
);

export const selectTheme = createSelector(
  selectReportFilter,
  filter => filter.theme
);

export const selectMandatoryFilterSelected = createSelector(
  [selectReportFilter, selectMenuBarPage],
  (filter, pageName) => {
    if (pageName === THEMATIC_GRANTS) {
      return Boolean(filter.theme);
    }
    return Boolean(filter.reportYear);
  }
);
