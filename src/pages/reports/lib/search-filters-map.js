import {
  GRANT_FIELD,
  GRANT_EXPIRY_BEFORE_FIELD,
  GRANT_EXPIRY_AFTER_FIELD,
  GRANT_ISSUE_YEAR,
  REPORT_TYPE_FIELD,
  REPORT_CATEGORY_FIELD,
  REPORT_END_DATE_BEFORE_FIELD,
  REPORT_END_DATE_AFTER_FIELD,
  RECIPIENT_OFFICE_FIELD,
  TITLE_FIELD,
  FRAMEWORK_FIELD,
  EXTERNAL_REF_GRANT_FIELD,
  REPORT_GROUP_FIELD,
  REPORT_GENERATED_FIELD,
  THEME_FIELD
} from '../search-constants';

import {
  filter,
  keys
} from 'ramda';

import {
  ReportEndDateBeforeFilter,
  ReportEndDateAfterFilter
} from '../components/report-end-date-filter';
import {
  GrantExpiryBeforeFilter,
  GrantExpiryAfterFilter
} from '../components/grant-expiry-filter';
import GrantIssueYearFilter from '../components/grant-issue-year-filter';
import ReportTypeFilter from '../components/report-type-filter';
import ReportCategoryFilter from '../components/report-category-filter';
import RecipientOfficeFilter from '../components/recipient-office-filter';
import GrantsFilter from '../components/grants-filter';
import ExternalGrantsFilter from '../components/external-grants-filter';
import TitleSearchFilter from '../components/title-search-filter';
import FrameworkAgreementFilter from '../components/framework-agreement-filter';
import reportingGroupFilter from '../components/reporting-group-filter';
import {
  UNICEF_USER_ROLE,
  THEMATIC_GRANTS,
  SEARCH_REPORTS
} from 'lib/constants';
import ReportGeneratedFilter from '../components/report-generated-filter';
import ThemeFilter from '../components/theme-filter';
import {
  useSelector
} from 'react-redux';
import {
  selectIsSuperUser
} from 'selectors/ui-flags';

export const FILTERS_MAP = {
  [FRAMEWORK_FIELD]: {
    label: 'Framework Agreement',
    Component: FrameworkAgreementFilter,
    gridSize: 2
  },

  [GRANT_FIELD]: {
    label: 'Grant',
    Component: GrantsFilter,
    pageName: SEARCH_REPORTS
  },

  [EXTERNAL_REF_GRANT_FIELD]: {
    label: 'External Reference Grant',
    Component: ExternalGrantsFilter,
    pageName: SEARCH_REPORTS
  },

  [REPORT_CATEGORY_FIELD]: {
    label: 'Report Category',
    Component: ReportCategoryFilter
  },

  [REPORT_GROUP_FIELD]: {
    label: 'Document Type',
    Component: reportingGroupFilter,
    permissionGroup: UNICEF_USER_ROLE,
    pageName: SEARCH_REPORTS
  },

  [REPORT_TYPE_FIELD]: {
    label: 'Report Type',
    Component: ReportTypeFilter
  },

  [RECIPIENT_OFFICE_FIELD]: {
    label: 'Recipient Office',
    Component: RecipientOfficeFilter
  },

  [TITLE_FIELD]: {
    label: 'Title',
    Component: TitleSearchFilter,
    gridSize: 2
  },

  [GRANT_EXPIRY_BEFORE_FIELD]: {
    label: 'Grant Expiry Before Date',
    Component: GrantExpiryBeforeFilter,
    pageName: SEARCH_REPORTS
  },

  [GRANT_EXPIRY_AFTER_FIELD]: {
    label: 'Grant Expiry After Date',
    Component: GrantExpiryAfterFilter,
    pageName: SEARCH_REPORTS
  },

  [GRANT_ISSUE_YEAR]: {
    label: 'Grant Issue Year',
    Component: GrantIssueYearFilter,
    pageName: SEARCH_REPORTS,
    gridSize: 2
  },

  [REPORT_END_DATE_BEFORE_FIELD]: {
    label: 'Report End Before Date',
    Component: ReportEndDateBeforeFilter
  },

  [REPORT_END_DATE_AFTER_FIELD]: {
    label: 'Report End After Date',
    Component: ReportEndDateAfterFilter
  },

  [REPORT_GENERATED_FIELD]: {
    label: 'Report Generated By',
    Component: ReportGeneratedFilter,
    gridSize: 2,
    permissionGroup: UNICEF_USER_ROLE
  },

  [THEME_FIELD]: {
    label: 'Theme',
    Component: ThemeFilter,
    pageName: THEMATIC_GRANTS
  }
};

export const getPageFilters = (userGroup, currentPageName) => {
  const isSuperUser = useSelector(selectIsSuperUser);
  if (!userGroup || !currentPageName) {
    return [];
  }
  return keys(
    filter(({
      permissionGroup,
      pageName
    }) => {
      const hasPermission = isSuperUser ? true : permissionGroup ? permissionGroup === userGroup : true;
      const belongsOnPage = pageName ? pageName === currentPageName : true;
      return hasPermission && belongsOnPage;
    }, FILTERS_MAP)
  );
};
