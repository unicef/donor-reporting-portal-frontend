import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';
import { getSubheadingFromParams } from 'lib/params';
import { selectDonorName, selectDonorCode, selectIsUnicefUser } from 'selectors/ui-flags';
import IconTextButton from './IconTextButton';
import { CloudDownload } from '@material-ui/icons';
import { selectConfig } from 'selectors/collections';
import { UNICEF_GAVI_KEY } from 'lib/constants';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: ' 100%',
      margin: 0,
      padding: `16px 24px 0 24px`
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#244784'
    },
    description: {
      fontSize: '1rem'
    },
    content: {
      minHeight: 64,
      paddingBottom: theme.spacing(1)
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%',
      paddingRight: '24px'
    }
  })
);

function ContentHeader({ children, location }) {
  const classes = useStyles();
  const donorName = useSelector(selectDonorName);
  const donorCode = useSelector(selectDonorCode);
  const showExport = window.location.pathname.includes('gavi-reports');
  const title = getSubheadingFromParams(location.pathname, donorName, donorCode);
  const config = useSelector(selectConfig);
  const isUnicefUser = useSelector(selectIsUnicefUser);

  function onExportClick() {
    let extraParam = '';    
    let gaviKey = isUnicefUser ? UNICEF_GAVI_KEY : config.source_id.gavi;

    if (window.location.pathname.includes('gavi-reports-ctn')) {
      extraParam = '&m_o_u_r_eference=ADJUSTING CTNS';
    } else if (window.location.pathname.includes('gavi-reports')) {
      extraParam = '&m_o_u_r_eference__not=ADJUSTING CTNS';
    } else if (window.location.pathname.includes('covax')) {
      extraParam = '&m_o_u_r_eference=MOU 11 CTN - DEVICES,MOU 11 CTN - VACCINES';
    }
    const searchParams = window.location.search.replace('?', '&');
    const downloadUrl = `${window.location.origin}/api/sharepoint/search/export/?serializer=gavi&donor_code=${config.gavi_donor_code}&source_id=${gaviKey}${searchParams}${extraParam}`;
    window.open(downloadUrl, '_blank');
  }

  return (
    <Grid
      alignItems="center"
      justify="space-between"
      className={`${classes.root} ${classes.content}`}
      container
    >
      <Grid className={classes.header}>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        {showExport && (
          <IconTextButton
            icon={<CloudDownload />}
            text="EXPORT"
            onClick={onExportClick}
            textProps={{
              type: 'body2'
            }}
          />
        )}
      </Grid>
      {children}
    </Grid>
  );
}

export default withRouter(ContentHeader);
ContentHeader.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node
};
