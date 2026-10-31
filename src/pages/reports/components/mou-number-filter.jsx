import React from 'react';
import { FormControl, TextField } from '@mui/material';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function MOUNumberFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="MOU Number"
        className={classes.input}
        slotProps={{
          htmlInput: {
            'aria-label': 'description'
          }
        }}
        label="MOU Number"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
}

MOUNumberFilter.propTypes = FilterProps;
