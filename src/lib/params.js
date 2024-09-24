import { keys } from 'ramda';
import {
  USERS_PORTAL_PATH,
  // REPORTS_PATH,
  THEMATIC_GRANTS_PATH,
  SEARCH_REPORTS_PATH,
  POOLED_GRANTS_PATH,
  GAVI_REPORTS_PATH,
  GAVI_REPORTS_CTN_PATH,
  GAVI_STATEMENTS_ACC_PATH,
  COVAX_PATH
} from './constants';

export const PAGE_TITLES_MAP = {
  [USERS_PORTAL_PATH]: 'User Management',
  // [REPORTS_PATH]: 'Reports',
  [THEMATIC_GRANTS_PATH]: 'Thematic Grants',
  [GAVI_REPORTS_PATH]: 'Gavi Reports',
  [COVAX_PATH]: 'Covax',
  [GAVI_REPORTS_CTN_PATH]: 'Gavi Adjusting CTNs',
  [GAVI_STATEMENTS_ACC_PATH]: 'Gavi Statements of Account',
  [POOLED_GRANTS_PATH]: 'Pooled Grants',
  [SEARCH_REPORTS_PATH]: 'Reports'
};

export function getSubheadingFromParams(pathname, donorName = '', donorCode = '') {
  const pathMatch = keys(PAGE_TITLES_MAP).find(path => pathname === path);
  const pageName = PAGE_TITLES_MAP[pathMatch];
  if (!pageName) {
    return '';
  }
  if (donorCode !== '') {
    donorCode = `[${donorCode}]`;
  }
  return `${pageName} ${donorName && 'for'} ${donorName} ${donorCode}`;
}
