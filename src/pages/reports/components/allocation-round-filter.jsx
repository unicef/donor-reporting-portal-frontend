import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function AllocationRoundFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="Allocation Round"
        className={classes.input}
        inputProps={{
          'aria-label': 'description'
        }}
        label="Allocation Round"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
}

AllocationRoundFilter.propTypes = FilterProps;
