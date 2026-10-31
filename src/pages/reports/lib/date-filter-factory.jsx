import React, { useState, useEffect, useMemo } from 'react';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FormControl } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { format, isValid, parse } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FilterProps } from './dropdown-filter-factory';
import { getColorTheme } from 'styles/theme';
import { DATE_FORMAT, DISPLAY_FORMAT } from '../constants';

export default function DateFilterFactory(label) {
  function DateFilter({ value, onChange }) {
    const { classes } = useGetFilterClasses();
    const theme = useTheme();
    const [date, setDate] = useState(new Date());

    const pickerTheme = useMemo(
      () => createTheme(theme, { palette: { primary: getColorTheme() } }),
      [theme]
    );

    useEffect(() => {
      const newDate = value ? parse(value, DATE_FORMAT, new Date()) : null;
      setDate(newDate && isValid(newDate) ? newDate : null);
    }, [value]);

    const handleDateChange = newDate => {
      const newValue = newDate && isValid(newDate) ? format(newDate, DATE_FORMAT) : null;
      onChange({ target: { value: newValue } });
    };

    return (
      <FormControl className={classes.formControl}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={pickerTheme}>
            <DatePicker
              format={DISPLAY_FORMAT}
              label={label}
              value={date}
              onChange={handleDateChange}
              closeOnSelect={false}
              slotProps={{
                field: { clearable: true },
                actionBar: { actions: ['clear', 'cancel', 'accept'] },
                textField: {
                  className: classes.textField,
                  margin: 'none',
                  size: 'small',
                  variant: 'outlined'
                }
              }}
            />
          </ThemeProvider>
        </LocalizationProvider>
      </FormControl>
    );
  }

  DateFilter.propTypes = FilterProps;
  return DateFilter;
}
