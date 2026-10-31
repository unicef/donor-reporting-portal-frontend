import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FormControl, MenuItem } from '@mui/material';
import { StyledInputLabel, StyledSelect } from '../components/styled-dropdown';
import { useGetFilterClasses } from 'styles/filter-styles';
import clsx from 'clsx';

export default function DropdownFilterFactory(selector, description, filterProp = 'description', showNone = false) {
  const Component = ({ value = '', onChange, ...props }) => {
    const { classes } = useGetFilterClasses();
    let options = useSelector(selector) || [];

    // if (description == "Library") {
    //   options = [
    //     { code: 2019, label: '2019 Certified Reports' },
    //     { code: 2020, label: '2020 Certified Reports' },
    //     { code: 2021, label: '2021 Certified Reports' },
    //     { code: '2020-08 Grant Documents Internal', label: '2020_08_GrantDocuments_Internal' },
    //     { code: '2020-08 Grant Documents External', label: '2020_08_GrantDocuments_External' }
    //   ]
    // }

    return (
      <FormControl
        className={clsx(classes.formControl, props.disabled && classes.disabled)}
        {...props}
      >
        <StyledInputLabel htmlFor={description}>{description}</StyledInputLabel>
        <StyledSelect
          value={value}
          onChange={onChange}
          label={description}
          inputProps={{
            name: 'option',
            id: description
          }}
        >
          {showNone && (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}
          {options.map(option => (
            <MenuItem key={option.code} value={option[filterProp]}>
              {option[filterProp]}
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
  disabled: PropTypes.bool,
  filterProp: PropTypes.string
};
