import { makeStyles } from 'styles/makeStyles';
import clsx from 'clsx';

const useFilterStyles = makeStyles(theme =>
  ({
    filterContainer: {
      borderRadius: 8,
      padding: `${theme.spacing(3)} ${theme.spacing(2)} ${theme.spacing(2)}`,
      background: theme.palette.common.white
    },
    button: {
      display: 'flex',
      justifyContent: 'flex-start'
    },
    filterComponents: {
      margin: 0
    },
    filterIcon: {
      fontSize: 20,
      height: 20,
      paddingRight: theme.spacing(1),
      width: 20,
      boxSizing: 'initial'
    },
    filterBox: {
      maxWidth: 360
    },
    validationWarning: {
      color: 'red'
    },
    btn: {
      backgroundColor: '#e5eaf0'
    },
    selectMenu: {
      borderRadius: 8,
      lineHeight: '24px',
      padding: 4
    },
    filterBtn: {
      cursor: 'pointer',
      padding: '4px 16px 4px 12px',
      fontWeight: 400,
      fontSize: 14,
      borderRadius: 14,
      lineHeight: theme.spacing(3),
      border: `1px solid #e5eaf0;`
    },
    filterPaper: {
      padding: 16
    },
    yearFilter: {
      backgroundColor: '#fafafa',
      width: 240
    },
    filterMenu: {
      marginRight: 32
    },
    textField: {
      marginRight: theme.spacing(2)
    },
    formBtn: {
      fontSize: '0.875rem',
      marginLeft: theme.spacing(1)
    },
    formControl: {
      width: '100%',
      '& .MuiInputBase-root, & .MuiPickersInputBase-root': {
        minHeight: 44
      },
      '& .MuiPickersSectionList-root': {
        paddingTop: 10.5,
        paddingBottom: 10.5
      },
      '& .MuiSelect-select': {
        paddingTop: 10,
        paddingBottom: 10
      },
      '& .MuiOutlinedInput-input': {
        paddingTop: 10.5,
        paddingBottom: 10.5,
        fontSize: '0.875rem'
      },
      '& .MuiInputLabel-root': {
        fontSize: '0.875rem'
      }
    },
    formControlLabel: {
      left: theme.spacing(1)
    },
    labelShrink: {
      left: 0
    },
    disabled: {
      opacity: 0.5
    },
    placeholder: {
      overflowX: 'hidden',
      textOverflow: 'ellipsis',
      color: 'currentColor',
      opacity: theme.palette.mode === 'light' ? 0.42 : 0.5,
      font: 'inherit',
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.ease
      })
    },
    chips: {
      '& > *': {
        margin: `0 ${theme.spacing(0.5)}`,
        height: 28
      }
    },
    checkBox: {
      padding: 6,
      margin: `0 ${theme.spacing(1)} 0 0`,
      height: 18,
      width: 18
    },
    loneLabel: {
      marginBottom: theme.spacing(1.5),
      '&.hidden': {
        visibility: 'hidden'
      }
    }
  })
);
export default useFilterStyles;

export const useGetFilterClasses = () => {
  const classes = useFilterStyles();

  const labelClasses = {
    formControl: classes.formControlLabel,
    shrink: classes.labelShrink
  };

  const labelProps = {
    classes: labelClasses
  };

  const selectProps = {
    classes: {
      selectMenu: clsx(classes.btn, classes.selectMenu)
    },
    disableUnderline: true
  };

  return {
    classes,
    labelProps,
    selectProps
  };
};
