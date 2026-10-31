import React, { useState, useEffect } from 'react';
import { without } from 'ramda';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FormControl, MenuItem } from '@mui/material';
import { StyledInputLabel, StyledSelect } from '../components/styled-dropdown';
import { useGetFilterClasses } from 'styles/filter-styles';

export default function DropdownMultiFilterFactory(selector, description, filterProp = 'description', filterKey = 'code', optionLabel = 'description') {
  const Component = ({ value, onChange }) => {
    const { classes } = useGetFilterClasses();
    const [multiVal, setMultiVal] = useState([]);

    function wrappedOnChangeHandler({ target }) {
      const selectedValue = target.value;
      if (selectedValue.length && selectedValue.includes('')) {
        setMultiVal([]);
        return;
      }
      return handleChangeMulti(selectedValue);
    }

    const options = useSelector(selector);

    const handleChangeMulti = selectedValue => {
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
      const transformedValue = typeof value === 'string' ? value.split(',') : Array.of(value); // we toString because useQuery hook JSON.parses number strings
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
        <StyledInputLabel htmlFor={description}>{description}</StyledInputLabel>
        <StyledSelect
          multiple
          value={multiVal}
          onChange={wrappedOnChangeHandler}
          label={description}
          inputProps={{
            name: 'option',
            id: description
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map(option => (
            <MenuItem
              key={option[filterKey]}
              value={option[filterProp]}
              selected={isSelected(option[filterKey])}
            >
              {option[optionLabel]}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    );
  };
  Component.propTypes = FilterProps;
  return Component;
}

export const FilterProps = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  selector: PropTypes.func,
  filterProp: PropTypes.string
};
