import {
  keys
} from 'ramda';
import {
  USERS_PORTAL_PATH,
  // REPORTS_PATH,
  THEMATIC_GRANTS_PATH,
  SEARCH_REPORTS_PATH,
  POOLED_GRANTS_PATH
} from './constants';

export const PAGE_TITLES_MAP = {
  [USERS_PORTAL_PATH]: 'User Management',
  // [REPORTS_PATH]: 'Reports',
  [THEMATIC_GRANTS_PATH]: 'Thematic Grants',
  [POOLED_GRANTS_PATH]: 'Pooled Grants',
  [SEARCH_REPORTS_PATH]: 'Reports'
};

export function getSubheadingFromParams(pathname, donorName = '') {
  const pathMatch = keys(PAGE_TITLES_MAP).find(path => pathname.includes(path));
  const pageName = PAGE_TITLES_MAP[pathMatch];
  if (!pageName) {
    return '';
  }
  return `${pageName} ${donorName && 'for'} ${donorName}`;
}
