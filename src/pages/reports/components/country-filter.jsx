import React from 'react';
import { FormControl, TextField } from '@mui/material';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function CountryFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="Country"
        className={classes.input}
        slotProps={{
          htmlInput: {
            'aria-label': 'description'
          }
        }}
        label="Country"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
}

CountryFilter.propTypes = FilterProps;
