export const DRAWER_WIDTH = 224;
export const FORM_CONFIG = {
  grant: {
    label: 'Grant'
  },
  externalGrant: {
    label: 'Partner Reference No'
  },
  theme: {
    label: 'Theme'
  },
  roles: {
    label: 'Roles'
  },
  role: {
    label: 'Role'
  },
  clear: {
    label: 'Clear'
  },
  submit: {
    label: 'Submit'
  },
  search: {
    label: 'Search'
  },
  grantIssueYear: {
    label: 'Grant Issue Year'
  },
  reportType: {
    label: 'Report Type'
  },
  reportCategory: {
    label: 'Report Category'
  },
  reportYear: {
    label: 'Library'
  },
  reportingGroup: {
    label: 'Reporting Group'
  },
  recertified: {
    label: 'Recertified'
  },
  donorDocument: {
    label: 'Document Type'
  },
  offices: {
    label: 'Recipient Office'
  }
};

export const USERS_PORTAL = 'users-portal';
export const REPORTS = 'reports';
export const SEARCH_REPORTS = 'reports';
export const THEMATIC_GRANTS = 'thematic-grants';
export const POOLED_GRANTS = 'pooled-grants';
export const USERS_PORTAL_PATH = `/${USERS_PORTAL}`;
export const REPORTS_PATH = `/${REPORTS}`;
export const SEARCH_REPORTS_PATH = `/${SEARCH_REPORTS}`;
export const TRAINING_LINK = 'https://unicef.sharepoint.com/sites/DFAM-DRP/DocumentLibrary1/Forms/AllItems.aspx?viewid=b5d1ef12%2D2815%2D458e%2Da2d3%2D8fcc9f75e7e0&id=%2Fsites%2FDFAM%2DDRP%2FDocumentLibrary1%2FGo%20Live%20Planning%2FTraining';

// export const TABLE_PAGES = [REPORTS, THEMATIC_GRANTS, USERS_PORTAL];
export const TABLE_PAGES = [SEARCH_REPORTS, POOLED_GRANTS, THEMATIC_GRANTS, USERS_PORTAL];
export const THEMATIC_GRANTS_PATH = `/${THEMATIC_GRANTS}`;
export const POOLED_GRANTS_PATH = `/${POOLED_GRANTS}`;
export const BACKEND_PROPERTIES_USER_LAST_LOGIN = 'user_last_login';
export const BACKEND_PROPERTIES_USER_FIRST_NAME = 'user_first_name';
export const BACKEND_PROPERTIES_USER_LAST_NAME = 'user_last_name';

// User Roles
export const DONOR_ADMIN_ROLE = 'Donor Admin';
export const DONOR_USER_ROLE = 'Donor User';
export const UNICEF_USER_ROLE = 'UNICEF User';

export const PAGE_TITLE_MAP = {
  [REPORTS]: 'Reports',
  [SEARCH_REPORTS]: 'Reports',
  [THEMATIC_GRANTS]: 'Thematic Grants',
  [POOLED_GRANTS]: 'Pooled Grants'
};

export const PAGE_DROPDOWN_NAME_MAP = {
  [SEARCH_REPORTS]: 'year',
  [THEMATIC_GRANTS]: 'theme'
};

export const USER_ROLE_PATCH_SUCCESS_MESSAGE = 'User role successfully changed.';
export const USER_ROLE_CREATED_MESSAGE = 'User role created successfully.';
