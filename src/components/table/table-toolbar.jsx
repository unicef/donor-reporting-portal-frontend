import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useToolbarStyles } from 'styles/table-styles';
import { Toolbar, Typography } from '@mui/material';
import clsx from 'clsx';
import { selectPageName } from 'selectors/ui-flags';
import { capitalize } from 'lib/helpers';
import { PAGE_TITLE_MAP } from 'lib/constants';

export default function EnhancedTableToolbar({ children, count }) {
  const classes = useToolbarStyles();
  const page = useSelector(selectPageName);

  return (
    <Toolbar className={clsx(classes.root)}>
      <div className={classes.title}>
        <Typography variant="subtitle1" id="tableTitle" className={classes.titleText} noWrap>
          {capitalize(PAGE_TITLE_MAP[page] || '')}
        </Typography>
      </div>
      <div className={classes.spacer} />
      {typeof count === 'number' && (
        <Typography variant="body2" className={classes.count}>
          {count.toLocaleString()} {count === 1 ? 'result' : 'results'}
        </Typography>
      )}
      {children}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  children: PropTypes.node,
  count: PropTypes.number
};
