import React from 'react';
import PropTypes from 'prop-types';
import { useGetFilterClasses } from 'styles/filter-styles';
import { InputLabel, Select } from '@mui/material';

export function StyledInputLabel(props) {
  const { labelProps } = useGetFilterClasses();

  return <InputLabel {...props} {...labelProps} />;
}

StyledInputLabel.propTypes = {
  props: PropTypes.object
};

export function StyledSelect(props) {
  const { selectProps } = useGetFilterClasses();
  return <Select {...props} {...selectProps} />;
}

StyledSelect.propTypes = {
  props: PropTypes.object
};
