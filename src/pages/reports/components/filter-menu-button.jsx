import React, {
  useState
} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Button, Checkbox } from '@mui/material';
import { menuClasses } from '@mui/material/Menu';
import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import FilterListIcon from '@mui/icons-material/FilterList';
import useFilterStyles from 'styles/filter-styles';
import { FILTERS_MAP, useGetPageFilters } from '../lib/filters-map';
import { selectUserGroup, selectMenuBarPage, selectIsSuperUser } from 'selectors/ui-flags';

export default function FilterMenuButton({ onSelectFilter, selected }) {
  const classes = useFilterStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const userGroup = useSelector(selectUserGroup);
  const isSuperUser = useSelector(selectIsSuperUser);
  const group = userGroup || isSuperUser;
  const pageName = useSelector(selectMenuBarPage);
  const usersFilters = useGetPageFilters(group, pageName);

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
        elevation={1}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 102
        }}
      >
        {usersFilters.map(filter => (
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
  selected: PropTypes.object
};

export function FilterButton(props) {
  const classes = useFilterStyles();

  return (
    <Button className={clsx(classes.filterBox, classes.filterBtn)} size="small" {...props}>
      <FilterListIcon className={classes.filterIcon} />
      More Filters
    </Button>
  );
}

const StyledMenuItem = styled(MenuItem)({
  '& .MuiListItemText-root': {
    margin: 0
  }
});

export const StyledMenu = styled(Menu)(({ theme }) => ({
  [`& .${menuClasses.paper}`]: {
    padding: `${theme.spacing(1)} 0`,
    borderRadius: 8,
    minWidth: 180
  }
}));
