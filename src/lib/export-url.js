import {
  COVAX,
  GAVI_REPORTS,
  GAVI_REPORTS_CTN,
  GAVI_STATEMENTS_ACC,
  POOLED_GRANTS,
  SEARCH_REPORTS,
  THEMATIC_GRANTS
} from 'lib/constants';

// Mirrors the parameters used by the search sagas so that an export always
// contains exactly the records currently shown in the table.
export function getExportRequest({
  pageName,
  sourceIds = {},
  gaviDonorCode,
  donorCode,
  isUnicefUser
}) {
  const sourceIdFor = (internalKey, externalKey) =>
    isUnicefUser ? sourceIds[internalKey] : sourceIds[externalKey];

  switch (pageName) {
    case GAVI_REPORTS:
      return {
        serializer: 'gavi',
        sourceId: sourceIds.gavi,
        donorCode: gaviDonorCode,
        extraParams: { m_o_u_r_eference__not: 'ADJUSTING CTNS' }
      };

    case GAVI_REPORTS_CTN:
      return {
        serializer: 'gavi',
        sourceId: sourceIds.gavi,
        donorCode: gaviDonorCode,
        extraParams: { m_o_u_r_eference: 'ADJUSTING CTNS' }
      };

    case COVAX:
      return {
        serializer: 'gavi',
        sourceId: sourceIds.gavi,
        donorCode: gaviDonorCode,
        extraParams: { m_o_u_r_eference: 'MOU 11 CTN - DEVICES,MOU 11 CTN - VACCINES' }
      };

    case GAVI_STATEMENTS_ACC:
      return {
        serializer: 'soa',
        sourceId: sourceIds.gavi_soa,
        donorCode: gaviDonorCode,
        extraParams: {}
      };

    case THEMATIC_GRANTS:
      return {
        sourceId: sourceIdFor('thematic_internal', 'thematic_external'),
        extraParams: {}
      };

    case POOLED_GRANTS:
      return {
        sourceId: sourceIdFor('pool_internal', 'pool_external'),
        donorCode,
        extraParams: {}
      };

    case SEARCH_REPORTS:
    default:
      return {
        sourceId: sourceIdFor('internal', 'external'),
        donorCode,
        extraParams: {}
      };
  }
}

export function buildExportUrl({
  pageName,
  sourceIds,
  gaviDonorCode,
  donorCode,
  isUnicefUser,
  search = ''
}) {
  const {
    serializer,
    sourceId,
    donorCode: exportDonorCode,
    extraParams
  } = getExportRequest({
    pageName,
    sourceIds,
    gaviDonorCode,
    donorCode,
    isUnicefUser
  });

  if (!sourceId) {
    return null;
  }

  const params = new URLSearchParams(search);
  params.delete('serializer');

  if (serializer) {
    params.set('serializer', serializer);
  }

  params.set('source_id', sourceId);

  if (exportDonorCode) {
    params.set('donor_code', exportDonorCode);
  } else {
    params.delete('donor_code');
  }

  Object.entries(extraParams).forEach(([key, value]) => {
    params.set(key, value);
  });

  return `/api/sharepoint/search/export/?${params.toString()}`;
}
