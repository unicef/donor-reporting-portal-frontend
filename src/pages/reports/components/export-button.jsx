import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Tooltip } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

import { selectConfig } from 'selectors/collections';
import { selectDonorCode, selectIsUnicefUser, selectMenuBarPage } from 'selectors/ui-flags';
import { buildExportUrl } from 'lib/export-url';

export default function ExportButton() {
  const config = useSelector(selectConfig);
  const donorCode = useSelector(selectDonorCode);
  const isUnicefUser = useSelector(selectIsUnicefUser);
  const pageName = useSelector(selectMenuBarPage);
  const canExport = Boolean(config?.source_id && Object.keys(config.source_id).length);

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
    <Tooltip title="Download the current results as a spreadsheet">
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
