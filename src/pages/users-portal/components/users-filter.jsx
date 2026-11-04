import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { find, prop, propEq } from 'ramda';
import {
  Box,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  TextField,
  InputAdornment,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import useFilterStyles from 'styles/filter-styles';
import { selectDonorUserGroups } from 'selectors/user';
import { FORM_CONFIG } from '../../../lib/constants';
import { onFetchUserRoles } from 'actions';
import { setValueFromEvent } from 'lib/helpers';
import { setUserRoles } from 'slices/user-roles';

export default function UsersFilter() {
  const classes = useFilterStyles();
  const dispatch = useDispatch();
  const groups = useSelector(selectDonorUserGroups);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);

  function reset() {
    setSelectedRoles([]);
    setSearchQuery('');
  }

  useEffect(() => {
    const queryObj = {
      group__in: selectedRoles.map(name => prop('id', find(propEq(name, 'name'), groups))).join(),
      search: searchQuery || undefined
    };

    dispatch(onFetchUserRoles(queryObj));
    return () => dispatch(setUserRoles([]));
  }, [searchQuery, selectedRoles]);

  return (
    <Box className={classes.filterContainer}>
      <Box className={classes.filterHeader}>
        <Box className={classes.filterHeaderText}>
          <Typography variant="subtitle1" className={classes.filterTitle} component="h2">
            Filters
          </Typography>
          <Typography variant="body2" className={classes.filterSubtitle}>
            Search users by name or email, and narrow down by role.
          </Typography>
        </Box>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          size="small"
          startIcon={<RestartAltIcon />}
          onClick={reset}
        >
          {FORM_CONFIG.clear.label}
        </Button>
      </Box>

      <Grid container direction="row" spacing={1.5}>
        <Grid size={{ sm: 5, xs: 12 }}>
          <TextField
            id="search"
            fullWidth
            label="Search"
            placeholder="Name or email"
            value={searchQuery}
            onChange={setValueFromEvent(setSearchQuery)}
            margin="none"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                )
              }
            }}
          />
        </Grid>
        <Grid size={{ sm: 5, xs: 12 }}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="role">{FORM_CONFIG.roles.label}</InputLabel>
            <Select
              value={selectedRoles}
              onChange={setValueFromEvent(setSelectedRoles)}
              multiple
              inputProps={{
                name: 'select-role',
                id: 'role'
              }}
              renderValue={selected => (selected.length ? selected.join(', ') : 'All roles')}
            >
              {groups.map(group => (
                <MenuItem key={group.name} value={group.name}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
