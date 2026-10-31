import React from 'react';
import { useSelector } from 'react-redux';
import { FormControl, MenuItem } from '@mui/material';
import { StyledInputLabel, StyledSelect } from './styled-dropdown';
import { FORM_CONFIG } from 'lib/constants';
import { selectThemeCollection } from 'selectors/collections';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';
import clsx from 'clsx';

export default function ThemeFilter({ value = '', onChange, ...props }) {
  const { classes } = useGetFilterClasses();

  const themesCollection = useSelector(selectThemeCollection);
  return (
    <FormControl
      className={clsx(classes.formControl, props.disabled && classes.disabled)}
      {...props}
    >
      <StyledInputLabel htmlFor="select-theme">{FORM_CONFIG.theme.label}</StyledInputLabel>
      <StyledSelect
        value={value}
        onChange={onChange}
        label={FORM_CONFIG.theme.label}
        inputProps={{
          name: 'select-theme',
          id: 'select-theme'
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {themesCollection.map(theme => (
          <MenuItem key={theme.id} value={theme.name}>
            {theme.name}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
}

ThemeFilter.propTypes = FilterProps;
