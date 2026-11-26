export const BACKEND_REPORTS_FIELDS = {
  title: 'title',
  recipientOffice: 'recipient_office',
  grant: 'grant_number',
  reportType: 'report_type',
  donorDocument: 'donor_document',
  reportEndDate: 'report_end_date',
  grantExpiryDate: 'grant_expiry_date'
};

export const BACKEND_THEMATIC_FIELDS = {
  title: 'title',
  theme: 'theme',
  recipientOffice: 'recipient_office',
  reportType: 'report_type',
  reportEndDate: 'report_end_date'
};

// QUERY PARAM FIELD NAMES FOR BACKEND
export const SEARCH_FIELD = 'search';
export const FRAMEWORK_FIELD = 'framework_agreement';
export const COUNTRY_FIELD = 'recipient_office';
export const GRANT_FIELD = 'grant_number';
export const EXTERNAL_REF_GRANT_FIELD = 'external_reference';
export const REPORT_TYPE_FIELD = 'report_type';
export const REPORT_GROUP_FIELD = 'report_group';
export const AWARD_TYPE_FIELD = 'award_type';
export const REPORT_END_DATE_FIELD = 'report_end_date';
export const REPORT_END_DATE_BEFORE_FIELD = 'report_end_date__lte';
export const REPORT_END_DATE_AFTER_FIELD = 'report_end_date__gte';
export const REPORT_PERIOD_FIELD = 'report_period';
export const REPORT_GENERATED_FIELD = 'report_generated_by';
export const THEME_FIELD = 'theme';
export const GRANT_EXPIRY_DATE_FIELD = 'grant_expiry_date';
export const GRANT_EXPIRY_BEFORE_FIELD = 'grant_expiry_date__lte';
export const GRANT_EXPIRY_AFTER_FIELD = 'grant_expiry_date__gte';
export const GRANT_ISSUE_YEAR = 'grant_issue_year';
export const REPORT_CATEGORY_FIELD = 'donor_report_category';
export const DONOR_DOCUMENT_FIELD = 'donor_document';
export const RECERTIFIED_FIELD = 'recertified';
export const RECIPIENT_OFFICE_FIELD = 'recipient_office';
export const MODIFIED_BEFORE_FIELD = 'modified__lte';
export const MODIFIED_AFTER_FIELD = 'modified__gte';
// GAVI
export const COUNTRY_NAME = 'country_name__contains';
export const CTN_NUMBER = 'number__contains';
export const GAVI_WBS = 'g_a_v_i_w_b_s__contains';
export const MOU_REFERENCE = 'm_o_u_r_eference';
export const SENT_GAVI_DATE_BEFORE_FIELD = 'sent_to_g_a_v_i_date__lte';
export const SENT_GAVI_DATE_AFTER_FIELD = 'sent_to_g_a_v_i_date__gte';
export const PREPAID_STATUS = 'prepaid_status';
export const PURCHASE_ORDER = 'purchase_order__contains';
export const GRANT_NUMBER = 'grant_number__contains';
export const ALOOCATION_ROUND = 'allocation_round__contains';
export const VENDOR = 'vendor__contains';
export const VACCINE_TYPE = 'vaccine_type__in';
export const APPROVAL_YEAR = 'approval_year';
export const SOA_DATE = 's_o_a_issue_date';
export const UNICEF_WBS = 'u_n_i_c_e_f_w_b_s';
export const MOU_NUMBER = 'm_o_u_number';
export const MATERIAL_CODE = 'material_code';

// PROPERTIES TO BE USED FOR QUERY
export const QUERY_PROPERTY_GRANT = 'code';
export const QUERY_PROPERTY_RECIPIENT_OFFICE = 'name';

export const EARLIEST_REPORTS_YEAR = 2019;

export const DATE_FORMAT = 'yyyy-MM-dd';
export const DISPLAY_FORMAT = 'yyyy-MMM-dd';
