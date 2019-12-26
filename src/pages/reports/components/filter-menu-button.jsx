import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Button, withStyles, Checkbox } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import FilterListIcon from '@material-ui/icons/FilterList';
import useFilterStyles from 'styles/filter-styles';
import { FILTERS_MAP, getPageFilters } from '../lib/filters-map';
import { selectUserGroup, selectMenuBarPage } from 'selectors/ui-flags';

export default function FilterMenuButton({ onSelectFilter, selected, filters }) {
  const classes = useFilterStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const group = useSelector(selectUserGroup);
  const pageName = useSelector(selectMenuBarPage);
  // const usersFilters = getPageFilters(group, pageName);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <FilterButton onClick={handleClick} />
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {filters.map(filter => (
          <StyledMenuItem
            key={FILTERS_MAP[filter].label}
            onClick={onSelectFilter(filter)}
            selected={selected[filter]}
          >
            <Checkbox
              className={classes.checkBox}
              edge="start"
              checked={selected[filter]}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={FILTERS_MAP[filter].label} />
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </>
  );
}

FilterMenuButton.propTypes = {
  onSelectFilter: PropTypes.func.isRequired,
  selected: PropTypes.object,
  filters: PropTypes.array.isRequired
};

export function FilterButton(props) {
  const classes = useFilterStyles();

  return (
    <Button className={classes.filterBtn} size="small" {...props}>
      <FilterListIcon className={classes.filterIcon} />
      Filter
    </Button>
  );
}

const StyledMenuItem = withStyles({
  root: {
    '& .MuiListItemText-root': {
      margin: 0
    }
  }
})(MenuItem);

export const StyledMenu = withStyles(theme => ({
  paper: {
    padding: `${theme.spacing(1)}px 0`,
    borderRadius: 8,
    minWidth: 180
  }
}))(props => (
  <Menu
    elevation={1}
    getContentAnchorEl={null}
    anchorOrigin={{
      horizontal: 'right',
      vertical: 'top'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 102
    }}
    {...props}
  />
));
