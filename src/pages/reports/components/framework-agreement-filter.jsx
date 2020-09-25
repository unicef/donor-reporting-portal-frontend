import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function FrameworkAgreementFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="Search framework agreement"
        className={classes.input}
        inputProps={{
          'aria-label': 'framework'
        }}
        onChange={onChange}
        label="Search framework agreement"
        value={value}
      />
    </FormControl>
  );
}

FrameworkAgreementFilter.propTypes = FilterProps;
