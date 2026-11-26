import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Tooltip } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

import { selectConfig, selectResultCount } from 'selectors/collections';
import { selectDonorCode, selectIsUnicefUser, selectMenuBarPage } from 'selectors/ui-flags';
import { buildExportUrl } from 'lib/export-url';

const MAX_EXPORT_RESULTS = 250;
const FILTER_HINT = `Export is available only when there are fewer than ${MAX_EXPORT_RESULTS} documents. Add or refine filters to reduce the number of documents in the current results.`;

function getTooltipTitle(resultCount, isWithinLimit) {
  if (!isWithinLimit) {
    return typeof resultCount === 'number'
      ? `There are ${resultCount.toLocaleString()} documents in the current results. ${FILTER_HINT}`
      : FILTER_HINT;
  }
  return `Download the current results as a spreadsheet. ${FILTER_HINT}`;
}

export default function ExportButton() {
  const config = useSelector(selectConfig);
  const donorCode = useSelector(selectDonorCode);
  const isUnicefUser = useSelector(selectIsUnicefUser);
  const pageName = useSelector(selectMenuBarPage);
  const resultCount = useSelector(selectResultCount);
  const hasExportSource = Boolean(config?.source_id && Object.keys(config.source_id).length);
  const isWithinLimit = Number.isFinite(resultCount) && resultCount < MAX_EXPORT_RESULTS;
  const canExport = hasExportSource && isWithinLimit;

  function handleExport() {
    const url = buildExportUrl({
      pageName,
      sourceIds: config?.source_id,
      gaviDonorCode: config?.gavi_donor_code,
      donorCode,
      isUnicefUser,
      search: window.location.search
    });

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <Tooltip title={getTooltipTitle(resultCount, isWithinLimit)}>
      <span>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          startIcon={<CloudDownloadOutlinedIcon />}
          onClick={handleExport}
          disabled={!canExport}
        >
          Export
        </Button>
      </span>
    </Tooltip>
  );
}
