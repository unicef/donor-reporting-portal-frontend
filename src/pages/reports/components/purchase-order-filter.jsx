import React from 'react';
import { FormControl, TextField } from '@mui/material';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function PurchaseOrderFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="Purchase Order"
        className={classes.textField}
        slotProps={{
          htmlInput: {
            'aria-label': 'description'
          }
        }}
        label="Purchase Order"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
}

PurchaseOrderFilter.propTypes = FilterProps;
