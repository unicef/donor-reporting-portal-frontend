import {
  GRANT_FIELD,
  GRANT_EXPIRY_BEFORE_FIELD,
  GRANT_EXPIRY_AFTER_FIELD,
  GRANT_ISSUE_YEAR,
  REPORT_TYPE_FIELD,
  REPORT_CATEGORY_FIELD,
  AWARD_TYPE_FIELD,
  REPORT_END_DATE_BEFORE_FIELD,
  REPORT_END_DATE_AFTER_FIELD,
  RECIPIENT_OFFICE_FIELD,
  TITLE_FIELD,
  FRAMEWORK_FIELD,
  EXTERNAL_REF_GRANT_FIELD,
  DONOR_DOCUMENT_FIELD,
  REPORT_GENERATED_FIELD,
  THEME_FIELD,
  MODIFIED_BEFORE_FIELD,
  MODIFIED_AFTER_FIELD,
  COUNTRY_NAME,
  CTN_NUMBER,
  GAVI_WBS,
  MOU_REFERENCE,
  SENT_GAVI_DATE_BEFORE_FIELD,
  SENT_GAVI_DATE_AFTER_FIELD,
  PREPAID_STATUS,
  VACCINE_TYPE,
  PURCHASE_ORDER,
  ALOOCATION_ROUND,
  VENDOR,
  APPROVAL_YEAR,
  SEARCH_FIELD,
  GRANT_NUMBER,
  UNICEF_WBS,
  MOU_NUMBER,

} from '../search-constants';

import { filter, keys } from 'ramda';

import {
  ReportEndDateBeforeFilter,
  ReportEndDateAfterFilter
} from '../components/report-end-date-filter';
import {
  ModifiedDateBeforeFilter,
  ModifiedDateAfterFilter
} from '../components/modified-date-filter.jsx';
import { GrantExpiryBeforeFilter, GrantExpiryAfterFilter } from '../components/grant-expiry-filter';
import GrantIssueYearFilter from '../components/grant-issue-year-filter';
import ReportTypeFilter from '../components/report-type-filter';
import ReportCategoryFilter from '../components/report-category-filter';
import RecipientOfficeFilter from '../components/recipient-office-filter';
import GrantsFilter from '../components/grants-filter';
import ExternalGrantsFilter from '../components/external-grants-filter';
import TitleSearchFilter from '../components/title-search-filter';
import FrameworkAgreementFilter from '../components/framework-agreement-filter';
import DonorDocumentFilter from '../components/donor-document-filter';
import ApprovalYearFilter from '../components/approval-year-filter';
import VaccineTypeFilter from '../components/vaccine-type-filter';
import AwardTypeFilter from '../components/award-type-filter';
import MOUReferenceFilter from '../components/mou-reference-filter';
import CountryFilter from '../components/country-filter';
import CTNNumberFilter from '../components/ctn-number-filter';
import GaviWBSFilter from '../components/gavi-wbs-filter';
import UNICEFWBSFilter from '../components/unicef-wbs-filter';
import MOUNumberFilter from '../components/mou-number-filter';
import {
  UNICEF_USER_ROLE,
  THEMATIC_GRANTS,
  SEARCH_REPORTS,
  POOLED_GRANTS,
  GAVI_REPORTS,
  GAVI_REPORTS_CTN,
  GAVI_STATEMENTS_ACC
} from 'lib/constants';
import ReportGeneratedFilter from '../components/report-generated-filter';
import ThemeFilter from '../components/theme-filter';
import { useSelector } from 'react-redux';
import { selectIsSuperUser, selectIsUnicefUser } from 'selectors/ui-flags';
import PrepaidStatusFilter from '../components/prepaid-status-filter';
import PurchaseOrderFilter from '../components/purchase-order-filter';
import GrantNumberFilter from '../components/grant-number-filter';
import AllocationRoundFilter from '../components/allocation-round-filter';
import { GaviDateAfterFilter, GaviDateBeforeFilter } from '../components/gavi-date-filter';
import VendorFilter from '../components/vendor-filter';
import SearchFilter from '../components/search-filter';

export const FILTERS_MAP = {
  [SEARCH_FIELD]: {
    label: 'Search',
    Component: SearchFilter,
    pageName: [SEARCH_REPORTS, POOLED_GRANTS, THEMATIC_GRANTS, GAVI_REPORTS, GAVI_REPORTS_CTN]
  },

  [THEME_FIELD]: {
    label: 'Theme',
    Component: ThemeFilter,
    pageName: [THEMATIC_GRANTS]
  },

  [EXTERNAL_REF_GRANT_FIELD]: {
    label: 'Partner Reference No',
    Component: ExternalGrantsFilter
  },

  [REPORT_TYPE_FIELD]: {
    label: 'Report Type',
    Component: ReportTypeFilter
  },

  [REPORT_CATEGORY_FIELD]: {
    label: 'Report Category',
    Component: ReportCategoryFilter
  },

  [AWARD_TYPE_FIELD]: {
    label: 'Award Type',
    Component: AwardTypeFilter
  },

  [GRANT_FIELD]: {
    label: 'Grant No',
    Component: GrantsFilter
  },

  [FRAMEWORK_FIELD]: {
    label: 'Framework Agreement',
    Component: FrameworkAgreementFilter,
    gridSize: 2,
    pageName: [SEARCH_REPORTS, POOLED_GRANTS]
  },

  [DONOR_DOCUMENT_FIELD]: {
    label: 'Document Type',
    Component: DonorDocumentFilter
  },

  [RECIPIENT_OFFICE_FIELD]: {
    label: 'Recipient Office',
    Component: RecipientOfficeFilter,
    pageName: [SEARCH_REPORTS, POOLED_GRANTS]
  },

  [TITLE_FIELD]: {
    label: 'Filename',
    Component: TitleSearchFilter,
    gridSize: 2,
    pageName: [SEARCH_REPORTS, POOLED_GRANTS],
    permissionGroup: UNICEF_USER_ROLE
  },

  [GRANT_EXPIRY_BEFORE_FIELD]: {
    label: 'Grant Expiry Before Date',
    Component: GrantExpiryBeforeFilter,
    pageName: [SEARCH_REPORTS, POOLED_GRANTS],
    permissionGroup: UNICEF_USER_ROLE
  },

  [GRANT_EXPIRY_AFTER_FIELD]: {
    label: 'Grant Expiry After Date',
    Component: GrantExpiryAfterFilter,
    pageName: [SEARCH_REPORTS, POOLED_GRANTS],
    permissionGroup: UNICEF_USER_ROLE
  },

  [REPORT_END_DATE_BEFORE_FIELD]: {
    label: 'Report End Before Date',
    Component: ReportEndDateBeforeFilter,
    permissionGroup: UNICEF_USER_ROLE
  },

  [REPORT_END_DATE_AFTER_FIELD]: {
    label: 'Report End After Date',
    Component: ReportEndDateAfterFilter,
    permissionGroup: UNICEF_USER_ROLE
  },

  [GRANT_ISSUE_YEAR]: {
    label: 'Grant Issue Year',
    Component: GrantIssueYearFilter,
    gridSize: 2,
    permissionGroup: UNICEF_USER_ROLE
  },

  [REPORT_GENERATED_FIELD]: {
    label: 'Report Generated By',
    Component: ReportGeneratedFilter,
    gridSize: 2,
    pageName: [SEARCH_REPORTS, POOLED_GRANTS],
    permissionGroup: UNICEF_USER_ROLE
  },

  [MODIFIED_BEFORE_FIELD]: {
    label: 'Modified Before Date',
    Component: ModifiedDateBeforeFilter
  },

  [MODIFIED_AFTER_FIELD]: {
    label: 'Modified After Date',
    Component: ModifiedDateAfterFilter
  },

  [CTN_NUMBER]: {
    label: 'CTN Number',
    Component: CTNNumberFilter,
    pageName: [GAVI_REPORTS, GAVI_REPORTS_CTN]
  },

  [MOU_REFERENCE]: {
    label: 'MOU Reference',
    Component: MOUReferenceFilter,
    pageName: [GAVI_REPORTS]
  },

  [SENT_GAVI_DATE_BEFORE_FIELD]: {
    label: 'Sent To GAVI Date Before',
    Component: GaviDateBeforeFilter,
    pageName: [GAVI_REPORTS, GAVI_REPORTS_CTN, GAVI_STATEMENTS_ACC]
  },

  [SENT_GAVI_DATE_AFTER_FIELD]: {
    label: 'Sent To GAVI Date After',
    Component: GaviDateAfterFilter,
    pageName: [GAVI_REPORTS, GAVI_REPORTS_CTN, GAVI_STATEMENTS_ACC]
  },

  [GAVI_WBS]: {
    label: 'GAVI WBS',
    Component: GaviWBSFilter,
    pageName: [GAVI_REPORTS, GAVI_REPORTS_CTN, GAVI_STATEMENTS_ACC]
  },

  [UNICEF_WBS]: {
    label: 'UNICEF WBS',
    Component: UNICEFWBSFilter,
    pageName: [GAVI_STATEMENTS_ACC]
  },

  [MOU_NUMBER]: {
    label: 'MOU Number',
    Component: MOUNumberFilter,
    pageName: [GAVI_STATEMENTS_ACC]
  },

  [COUNTRY_NAME]: {
    label: 'Country',
    Component: CountryFilter,
    pageName: [GAVI_REPORTS, GAVI_REPORTS_CTN, GAVI_STATEMENTS_ACC]
  },

  [PURCHASE_ORDER]: {
    label: 'Purchase Order',
    Component: PurchaseOrderFilter,
    pageName: [GAVI_REPORTS, GAVI_REPORTS_CTN]
  },

  [GRANT_NUMBER]: {
    label: 'Grant Number',
    Component: GrantNumberFilter,
    pageName: [GAVI_STATEMENTS_ACC]
  },
  
  [PREPAID_STATUS]: {
    label: 'Prepaid Status',
    Component: PrepaidStatusFilter,
    pageName: [GAVI_REPORTS, GAVI_REPORTS_CTN]
  },

  [ALOOCATION_ROUND]: {
    label: 'Allocation Round',
    Component: AllocationRoundFilter,
    pageName: [GAVI_REPORTS, GAVI_REPORTS_CTN]
  },

  [VENDOR]: {
    label: 'Vendor',
    Component: VendorFilter,
    pageName: [GAVI_REPORTS, GAVI_REPORTS_CTN]
  },

  [VACCINE_TYPE]: {
    label: 'Vaccine Type',
    Component: VaccineTypeFilter,
    pageName: [GAVI_REPORTS, GAVI_REPORTS_CTN, GAVI_STATEMENTS_ACC]
  },

  [APPROVAL_YEAR]: {
    label: 'Approval Year',
    Component: ApprovalYearFilter,
    pageName: [GAVI_REPORTS, GAVI_REPORTS_CTN, GAVI_STATEMENTS_ACC]
  }
};

export const getPageFilters = (userGroup, currentPageName) => {
  const isSuperUserOrUnicefUser = useSelector(selectIsSuperUser) || useSelector(selectIsUnicefUser);

  if (!(userGroup || isSuperUserOrUnicefUser) || !currentPageName) {
    return [];
  }
  const isGaviPage = String(currentPageName).startsWith('gavi-');
  if (isGaviPage) {
    return keys(
      filter(({ pageName }) => {
        return pageName ? pageName.some(page => page === currentPageName) : false;
      }, FILTERS_MAP)
    );
  } else {
    return keys(
      filter(({ permissionGroup, pageName }) => {
        const hasPermission = isSuperUserOrUnicefUser
          ? true
          : permissionGroup
          ? permissionGroup === userGroup
          : true;
        const belongsOnPage = pageName ? pageName.some(page => page === currentPageName) : true;
        return hasPermission && belongsOnPage;
      }, FILTERS_MAP)
    );
  }
};
