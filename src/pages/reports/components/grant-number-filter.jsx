import React from 'react';
import { FormControl, TextField } from '@mui/material';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function GrantNumberFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="Grant Number"
        className={classes.textField}
        slotProps={{
          htmlInput: {
            'aria-label': 'description'
          }
        }}
        label="Grant Number"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
}

GrantNumberFilter.propTypes = FilterProps;
