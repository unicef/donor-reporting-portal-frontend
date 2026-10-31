import React from 'react';
import { FormControl, TextField } from '@mui/material';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function GaviWBSFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="GAVI WBS"
        className={classes.input}
        slotProps={{
          htmlInput: {
            'aria-label': 'description'
          }
        }}
        label="GAVI WBS"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
}

GaviWBSFilter.propTypes = FilterProps;
