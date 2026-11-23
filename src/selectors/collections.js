import {
  createSelector
} from 'reselect';
export const selectGrants = state => state.grants;
export const selectExternalGrants = state => state.externalGrants;
export const selectThemeCollection = state => state.themes;
export const selectDonors = state => state.donors;
export const selectGavi = state => state.gavi;
export const selectStaticAssets = state => state.staticAssets;
export const selectMetadata = state => state.metadata;
export const selectReports = state => state.reports;
export const selectOffices = state => state.offices;
export const selectSearchReports = state => state.searchReports;
export const selectConfig = state => state.config;

export const selectSearchReportsData = createSelector(
  selectSearchReports,
  reports => reports.items
);
export const selectResultCount = createSelector(
  [selectReports, selectSearchReports],
  (reports, searchReports) => {
    if (typeof searchReports?.total_rows === 'number') {
      return searchReports.total_rows;
    }
    return Array.isArray(reports) ? reports.length : undefined;
  }
);
export const selectYears = createSelector(
  selectStaticAssets,
  assets => assets.report_years
);
export const selectApprovalYear = createSelector(
  selectStaticAssets,
  assets => assets.approval_year
);
export const selectReportType = createSelector(
  selectMetadata,
  assets => assets.report_type
);
export const selectDonorDocuments = createSelector(
  selectMetadata,
  assets => assets.donor_document
);
export const selectVaccineTypes = createSelector(
  selectMetadata,
  assets => assets.vaccine_type
);
export const selectDonorCategory = createSelector(
  selectMetadata,
  assets => assets.donor_reporting_category
);
export const selectReportingGroup = createSelector(
  selectMetadata,
  assets => assets.reporting_group
);
export const selectIsRecertified = createSelector(
  selectMetadata,
  assets => assets.recertified
);
export const selectAwardType = createSelector(
  selectMetadata,
  assets => assets.award_type
);
