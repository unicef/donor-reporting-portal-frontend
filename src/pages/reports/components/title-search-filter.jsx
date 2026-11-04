import React from 'react';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function TitleSearchFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        fullWidth
        placeholder="Search filename"
        slotProps={{
          htmlInput: {
            'aria-label': 'Search filename'
          },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            )
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
