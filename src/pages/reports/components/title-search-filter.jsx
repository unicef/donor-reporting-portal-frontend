import React from 'react';
import { FormControl, TextField } from '@mui/material';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function TitleSearchFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="Search Filename"
        className={classes.input}
        slotProps={{
          htmlInput: {
            'aria-label': 'description'
          }
        }}
        label="Filename"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
}

TitleSearchFilter.propTypes = FilterProps;
