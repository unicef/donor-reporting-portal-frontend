import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { selectUserProfileDonorId } from 'selectors/ui-flags';
import { usePermissions } from 'components/PermissionRedirect';
import { GAVI_REPORTS_PATH, GAVI_REPORTS_CTN_PATH, GAVI_STATEMENTS_ACC_PATH, THEMATIC_GRANTS_PATH } from 'lib/constants';
import DonorsList from './donors-list';
import UsersManagement from './users-portal';
import { setAssignedRole } from '../slices/ui';

import { selectUserProfile } from 'selectors/ui-flags';

export function UnassignedDonor({ children }) {
  const { isSuperUser, isUnicefUser } = usePermissions();
  const profile = useSelector(selectUserProfile);
  const noRoles = !profile.roles.length;
  const hasNoAssignedRole = noRoles && !isUnicefUser && !isSuperUser;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAssignedRole({ assignedRole: !hasNoAssignedRole }));
  }, [dispatch, hasNoAssignedRole]);

  return hasNoAssignedRole ? <Navigate to="/no-role" replace /> : children;
}

export function ProtectedRouteDonorsList({ children }) {
  return children;
}

function ProtectedRouteReportPageContent({ children, path }) {
  let { canViewDonors, isGaviDonor } = usePermissions();
  const usersDonor = useSelector(selectUserProfileDonorId);
  const { donorId } = useParams();
  const thematicPath = path === THEMATIC_GRANTS_PATH;

  if (
    (path === GAVI_REPORTS_PATH ||
      path === GAVI_REPORTS_CTN_PATH ||
      path === GAVI_STATEMENTS_ACC_PATH) &&
    isGaviDonor
  ) {
    canViewDonors = true;
  }

  const unassignedDonorAttempt = usersDonor
    ? Boolean(usersDonor !== Number(donorId) && !canViewDonors && !thematicPath)
    : Boolean(!canViewDonors);

  return unassignedDonorAttempt ? <Navigate to="/not-found" replace /> : children;
}

export function ProtectedRouteReportPage({ children, path }) {
  return (
    <ProtectedRouteReportPageContent path={path}>{children}</ProtectedRouteReportPageContent>
  );
}

function ProtectedRouteUserManagementContent() {
  const { isDonorAdmin, isSuperUser, isUnicefUser, isDonorUser } = usePermissions();
  const { donorId } = useParams();

  if (!donorId && (isUnicefUser || isSuperUser)) {
    return <DonorsList />;
  }

  if (isDonorAdmin || isDonorUser || (donorId && (isSuperUser || isUnicefUser))) {
    return <UsersManagement />;
  }

  return <Navigate to="/not-found" replace />;
}

export function ProtectedRouteUserManagement() {
  return <ProtectedRouteUserManagementContent />;
}

const ProtectedRouteProps = {
  children: PropTypes.node.isRequired
};

UnassignedDonor.propTypes = ProtectedRouteProps;
ProtectedRouteDonorsList.propTypes = ProtectedRouteProps;
ProtectedRouteReportPage.propTypes = {
  ...ProtectedRouteProps,
  path: PropTypes.string
};
ProtectedRouteReportPageContent.propTypes = {
  ...ProtectedRouteProps,
  path: PropTypes.string
};
ProtectedRouteUserManagement.propTypes = {
  children: PropTypes.node
};
