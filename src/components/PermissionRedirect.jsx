import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  REPORTS_PATH,
  DONOR_ADMIN_ROLE,
  DONOR_USER_ROLE,
  GAVI_REPORTS_PATH,
  POOLED_GRANTS_PATH,
  POOLED_GRANTS
} from '../lib/constants';
import {
  selectUserGroup,
  selectUserProfileDonorId,
  selectIsSuperUser,
  selectUserProfileDonor,
  selectIsUnicefUser,
  selectMenuBarPage
} from 'selectors/ui-flags';
import { selectConfig } from 'selectors/collections';

export const usePermissions = () => {
  const userGroup = useSelector(selectUserGroup);
  const isUnicefUser = useSelector(selectIsUnicefUser);
  const isDonorAdmin = userGroup === DONOR_ADMIN_ROLE;
  const isDonorUser = userGroup === DONOR_USER_ROLE;
  const isSuperUser = useSelector(selectIsSuperUser);
  const donor = useSelector(selectUserProfileDonor);
  const config = useSelector(selectConfig);
  const donorCode = donor && donor.code;
  const gaviDonorCode = config && config.gavi_donor_code;
  const isGaviDonor = Boolean(donorCode && gaviDonorCode && donorCode === gaviDonorCode);

  const canViewDonors = isUnicefUser || isSuperUser;
  return {
    isUnicefUser,
    isDonorAdmin,
    isSuperUser,
    isDonorUser,
    canViewDonors,
    isGaviDonor
  };
};

export default function PermissionRedirect() {
  const usersDonorId = useSelector(selectUserProfileDonorId);
  const { canViewDonors, isGaviDonor } = usePermissions();
  const tab = useSelector(selectMenuBarPage);
  if (isGaviDonor) {
    return <Navigate to={`${GAVI_REPORTS_PATH}`} replace />;
  } else if (canViewDonors) {
    return <Navigate to="/donors" replace />;
  } else if (tab === POOLED_GRANTS) {
    return <Navigate to={`${POOLED_GRANTS_PATH}/${usersDonorId}`} replace />;
  } else {
    return <Navigate to={`${REPORTS_PATH}/${usersDonorId}`} replace />;
  }
}
