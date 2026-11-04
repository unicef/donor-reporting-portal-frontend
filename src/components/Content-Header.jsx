import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { makeStyles } from 'styles/makeStyles';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { CloudDownloadOutlined } from '@mui/icons-material';
import { getSubheadingFromParams } from 'lib/params';
import { selectDonorName, selectDonorCode, selectIsUnicefUser } from 'selectors/ui-flags';
import { selectConfig } from 'selectors/collections';
import { UNICEF_GAVI_KEY } from 'lib/constants';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: 0,
    padding: theme.spacing(3, 2, 0),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 3, 0)
    }
  },
  content: {
    minHeight: 56,
    paddingBottom: theme.spacing(1)
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  eyebrow: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.25)
  },
  title: {
    color: theme.palette.secondary.main,
    fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: '-0.01em'
  },
  exportButton: {
    flexShrink: 0,
    whiteSpace: 'nowrap'
  }
}));

function ContentHeader({ children }) {
  const location = useLocation();
  const classes = useStyles();
  const donorName = useSelector(selectDonorName);
  const donorCode = useSelector(selectDonorCode);
  const config = useSelector(selectConfig);
  const isUnicefUser = useSelector(selectIsUnicefUser);
  const showExport = window.location.pathname.includes('gavi-reports');
  const title = getSubheadingFromParams(location.pathname, donorName, donorCode).replace(/\s+/g, ' ').trim();

  if (!title && !showExport) {
    return null;
  }

  function onExportClick() {
    let extraParam = '';
    let gaviKey = isUnicefUser ? UNICEF_GAVI_KEY : config.source_id.gavi;

    if (window.location.pathname.includes('gavi-reports-ctn')) {
      extraParam = '&m_o_u_r_eference=ADJUSTING CTNS';
    } else if (window.location.pathname.includes('gavi-reports')) {
      extraParam =
        '&m_o_u_r_eference__not_in=ADJUSTING CTNS,MOU 11 CTN - DEVICES,MOU 11 CTN - VACCINES';
    } else if (window.location.pathname.includes('covax')) {
      extraParam = '&m_o_u_r_eference=MOU 11 CTN - DEVICES,MOU 11 CTN - VACCINES';
    }
    const searchParams = window.location.search.replace('?', '&');
    const downloadUrl = `${window.location.origin}/api/sharepoint/search/export/?serializer=gavi&donor_code=${config.gavi_donor_code}&source_id=${gaviKey}${searchParams}${extraParam}`;
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <Box className={`${classes.root} ${classes.content}`}>
      <Box className={classes.header}>
        <Box>
          {title && (
            <Typography variant="overline" className={classes.eyebrow} component="p">
              Donor reporting
            </Typography>
          )}
          <Typography className={classes.title} variant="h5" component="h1">
            {title}
          </Typography>
        </Box>
        {showExport && (
          <Tooltip title="Download the current GAVI results as a spreadsheet">
            <Button
              className={classes.exportButton}
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={<CloudDownloadOutlined />}
              onClick={onExportClick}
            >
              Export
            </Button>
          </Tooltip>
        )}
      </Box>
      {children}
    </Box>
  );
}

export default ContentHeader;
ContentHeader.propTypes = {
  children: PropTypes.node
};
