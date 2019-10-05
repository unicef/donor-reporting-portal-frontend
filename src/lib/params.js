import { keys } from 'ramda';
import { USERS_PORTAL_PATH } from '../constants';

export const PAGE_TITLES_MAP = {
  [USERS_PORTAL_PATH]: 'User Management'
};

export function getSubheadingFromParams(pathname) {
  console.log('TCL: getSubheadingFromParams -> pathname', pathname);
  const pathMatch = keys(PAGE_TITLES_MAP).find(path => pathname.includes(path));
  return PAGE_TITLES_MAP[pathMatch] || 'Reports';
}
