import { makeStyles } from 'styles/makeStyles';
import clsx from 'clsx';

const useFilterStyles = makeStyles(theme =>
  ({
    filterContainer: {
      borderRadius: 12,
      padding: `${theme.spacing(2.5)} ${theme.spacing(2.5)} ${theme.spacing(2)}`,
      background: theme.palette.common.white,
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: '0 8px 24px rgba(11, 59, 117, 0.05)'
    },
    filterPaper: {
      padding: theme.spacing(2),
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 12,
      boxShadow: '0 8px 24px rgba(11, 59, 117, 0.05)',
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(2.5)
      }
    },
    filterHeader: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    filterHeaderText: {
      minWidth: 0
    },
    filterTitle: {
      color: theme.palette.secondary.main,
      fontWeight: 600
    },
    filterSubtitle: {
      color: theme.palette.text.secondary
    },
    activeChip: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.secondary.dark,
      fontWeight: 700
    },
    filterActions: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: theme.spacing(1.25),
      marginTop: theme.spacing(2)
    },
    filterGrid: {
      marginTop: theme.spacing(0.5)
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
      maxWidth: 360,
      width: '100%'
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
      padding: '6px 16px 6px 12px',
      fontWeight: 500,
      fontSize: 14,
      borderRadius: 8,
      lineHeight: theme.spacing(3),
      border: `1px solid ${theme.palette.divider}`,
      '&:hover': {
        backgroundColor: theme.palette.background.default
      }
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
