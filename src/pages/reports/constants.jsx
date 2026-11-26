export const BACKEND_REPORTS_FIELDS = {
  title: 'title',
  grant: 'grant_number',
  donorReportCategory: 'donor_report_category',
  donorDocument: 'donor_document',
  reportType: 'report_type',
  recipientOffice: 'recipient_office',
  modified: 'modified'
};

export const BACKEND_THEMATIC_FIELDS = {
  title: 'title',
  theme: 'theme',
  recipientOffice: 'recipient_office',
  reportType: 'report_type',
  reportEndDate: 'report_end_date',
  modified: 'modified'
};

export const BACKEND_GAVI_FIELDS = {
  name: 'name',
  ctnNumber: 'number',
  country: 'country_name',
  mouNumber: 'mou_number',
  approvalYear: 'approval_year',
  sentDate: 'sent_to_g_a_v_i_date',
  gaviWBS: 'g_a_v_i_w_b_s',
  allocationRound: 'allocation_round',
  purchaseOrder: 'purchase_order',
  grantNumber: 'grant_number',
  unicefWBS: 'u_n_i_c_e_f_w_b_s',
  soaDate: 's_o_a_issue_date'
};

// QUERY PARAM FIELD NAMES FOR BACKEND
export const FRAMEWORK_FIELD = 'framework_agreement__contains';
export const COUNTRY_FIELD = 'recipient_office';
export const GRANT_FIELD = 'grant_number__in';
export const EXTERNAL_REF_GRANT_FIELD = 'external_reference';
export const REPORT_TYPE_FIELD = 'report_type__in';
export const REPORT_GROUP_FIELD = 'report_group__in';
export const REPORT_END_DATE_FIELD = 'report_end_date';
export const REPORT_END_DATE_BEFORE_FIELD = 'report_end_date__lte';
export const REPORT_END_DATE_AFTER_FIELD = 'report_end_date__gte';
export const REPORT_PERIOD_FIELD = 'report_period';
export const REPORT_GENERATED_FIELD = 'report_generated_by__contains';
export const THEME_FIELD = 'theme';
export const GRANT_EXPIRY_DATE_FIELD = 'grant_expiry_date';
export const GRANT_EXPIRY_BEFORE_FIELD = 'grant_expiry_date__lte';
export const GRANT_EXPIRY_AFTER_FIELD = 'grant_expiry_date__gte';
export const GRANT_ISSUE_YEAR = 'grant_issue_year__in';
export const REPORT_CATEGORY_FIELD = 'donor_report_category__in';
export const DONOR_DOCUMENT_FIELD = 'donor_document';
export const RECERTIFIED_FIELD = 'recertified';
export const RECIPIENT_OFFICE_FIELD = 'recipient_office__contains';

// PROPERTIES TO BE USED FOR QUERY
export const QUERY_PROPERTY_GRANT = 'code';
export const QUERY_PROPERTY_RECIPIENT_OFFICE = 'name';

export const EARLIEST_REPORTS_YEAR = 2019;

export const DATE_FORMAT = 'yyyy-MM-dd';
export const DISPLAY_FORMAT = 'yyyy-MMM-dd';
