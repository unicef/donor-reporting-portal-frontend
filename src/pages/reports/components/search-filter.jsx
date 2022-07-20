import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function SearchFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="Search"
        className={classes.input}
        inputProps={{
          'aria-label': 'framework'
        }}
        onChange={onChange}
        label="Search"
        value={value}
      />
    </FormControl>
  );
}

SearchFilter.propTypes = FilterProps;
