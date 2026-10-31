import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { find, prop, propEq } from 'ramda';
import {
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  TextField
} from '@mui/material';
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
    <Grid className={classes.filterContainer} size={{ xs: 12 }}>
      <Grid container direction="row" spacing={1}>
        <Grid size={{ sm: 4, xs: 12 }}>
          <FormControl className={classes.formControl}>
            <TextField
              id="search"
              label="Search"
              className={classes.textField}
              value={searchQuery}
              onChange={setValueFromEvent(setSearchQuery)}
              margin="none"
            />
          </FormControl>
        </Grid>
        <Grid size={{ sm: 4, xs: 12 }}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="roles">{FORM_CONFIG.roles.label}</InputLabel>
            <Select
              value={selectedRoles}
              onChange={setValueFromEvent(setSelectedRoles)}
              multiple
              inputProps={{
                name: 'select-role',
                id: 'role'
              }}
            >
              {groups.map(group => (
                <MenuItem key={group.name} value={group.name}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid className={classes.button}>
          <Button
            className={classes.formBtn}
            color="secondary"
            onClick={() => {
              reset();
            }}
          >
            {FORM_CONFIG.clear.label}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
