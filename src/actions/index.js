import {
  createAction
} from '@reduxjs/toolkit';

export const initDonorsList = createAction('initDonorsList');
export const onFetchUserRoles = createAction('onFetchUserRoles');
export const onFetchUserGroups = createAction('onFetchUserGroups');
export const onFetchUserProfile = createAction('onFetchUserProfile');
export const initDonorsFilter = createAction('initDonorsFilter');
export const onFilterUsers = createAction('onFilterUsers');
export const onCreateUser = createAction('onCreateUser');
export const userRoleEdited = createAction('userRoleEdited');
export const createUserSuccess = createAction('createUserSuccess');
export const resetCreatedUser = createAction('resetCreatedUser');
export const onCreateUserRole = createAction('onCreateUserRole');
export const redirectToLogin = createAction('redirectToLogin');
export const onFetchReports = createAction('onFetchReports');
export const initCertifiedReportsPage = createAction('initCertifiedReportsPage');
export const initPooledGrantsPage = createAction('initPooledGrantsPage');
export const initThematicGrantsPage = createAction('initThematicGrantsPage');
export const initGaviReportsPage = createAction('initGaviReportsPage');
export const initGaviStatementsPage = createAction('initGaviStatementsPage');
export const initSearchReportsPage = createAction('initSearchReportsPage');
export const initConfig = createAction('initConfig');
export const deleteUserRole = createAction('deleteUserRole');
export const onFetchSearchReports = createAction('onFetchSearchReports');
