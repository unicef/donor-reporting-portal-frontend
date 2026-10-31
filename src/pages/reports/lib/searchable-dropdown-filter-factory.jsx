import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose, equals } from 'ramda';

import { useSelector } from 'react-redux';
import { FormControl, TextField } from '@mui/material';
import { useGetFilterClasses } from 'styles/filter-styles';
import { makeStyles } from 'styles/makeStyles';
import { Autocomplete } from '@mui/material';

const useStyles = makeStyles({
  root: {
    '&> :first-of-type': {
      margin: 0
    }
  }
});

export default function SearchableDropdownFilterFactory(selector, label, getValueFromObj) {
  const Component = ({ value = '', onChange, ...props }) => {
    const { classes } = useGetFilterClasses();
    const options = useSelector(selector) || [];
    const [dropdownValue, setDropdownValue] = useState(null);
    const classes2 = useStyles();

    useEffect(() => {
      const val = options.find(
        compose(
          equals(value),
          getValueFromObj
        )
      );
      setDropdownValue(val);
    }, [value, options]);

    return (
      <FormControl className={classes.formControl}>
        <Autocomplete
          size="small"
          options={options}
          value={dropdownValue}
          onChange={(event, newValue) => {
            onChange(getValueFromObj(newValue));
          }}
          classes={classes2}
          renderInput={params => (
            <TextField
              className={classes.input}
              {...params}
              label={label}
              margin="none"
              size="small"
              fullWidth
            />
          )}
          {...props}
        />
      </FormControl>
    );
  };
  Component.propTypes = FilterProps;
  return Component;
}

SearchableDropdownFilterFactory.propTypes = {
  selector: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  getValueFromObj: PropTypes.func.isRequired
};

export const FilterProps = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  filterProp: PropTypes.string
};
