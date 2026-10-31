import React, { useState, useEffect } from 'react';
import { without } from 'ramda';
import { useSelector } from 'react-redux';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FormControl, MenuItem } from '@mui/material';
import { FORM_CONFIG } from 'lib/constants';
import { selectYears } from 'selectors/collections';
import { StyledInputLabel, StyledSelect } from './styled-dropdown';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function ReportPeriodFilter({ value, onChange }) {
  const { classes } = useGetFilterClasses();
  const [multiVal, setMultiVal] = useState([]);
  const years = useSelector(selectYears);

  const handleChangeMulti = ({ target }) => {
    const selectedValue = target.value;

    if (multiVal.includes(selectedValue)) {
      setMultiVal(without(selectedValue, multiVal));
    } else {
      setMultiVal(selectedValue);
    }
  };

  useEffect(() => {
    if (!value) {
      return;
    }
    const transformedValue =
      typeof value === 'string' ? value.split(',').map(Number) : Array.of(value); // we toString because useQuery hook JSON.parse's number strings
    if (multiVal !== transformedValue) {
      setMultiVal(transformedValue);
    }
  }, [value]);

  useEffect(() => {
    // set the url param value
    const newValue = multiVal.join(',');
    onChange(newValue);
  }, [multiVal]);

  function isSelected(itemValue) {
    return multiVal.includes(itemValue);
  }

  return (
    <FormControl className={classes.formControl}>
      <StyledInputLabel htmlFor="year-select">{FORM_CONFIG.reportPeriod.label}</StyledInputLabel>
      <StyledSelect
        multiple
        value={multiVal}
        onChange={handleChangeMulti}
        label={FORM_CONFIG.reportPeriod.label}
        inputProps={{
          name: 'year',
          id: 'year-select'
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {years.map(year => (
          <MenuItem key={year.code} value={year.code} selected={isSelected(year.code)}>
            {year.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
}

ReportPeriodFilter.propTypes = FilterProps;
