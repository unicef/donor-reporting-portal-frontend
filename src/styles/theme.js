import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

blue.A400 = '#0199ff';
grey.A100 = '#e5eaf0';

/**
 * Shared brand tokens.
 *
 * Keep the UNICEF blue family in one place so that pages, the app bar and
 * generated charts/date pickers all stay visually consistent.
 */
export const BRAND = {
  navy: '#0B3B75',
  navyDeep: '#072C59',
  blue: '#1CABE2',
  blueDark: '#0E73A8',
  blueSoft: '#E7F6FD',
  ink: '#12263F',
  muted: '#58708B',
  border: 'rgba(11, 59, 117, 0.12)',
  surface: '#FFFFFF',
  background: '#F3F7FB',
  success: '#2E9E5B',
  warning: '#D98E04',
  error: '#D64545'
};

export const getColorTheme = () => ({
  ...blue,
  500: '#0099FF'
});

export default createTheme({
  palette: {
    primary: {
      ...grey,
      main: BRAND.blueDark,
      dark: BRAND.navy,
      light: '#8AD8F4',
      contrastText: '#FFFFFF',
      strong: BRAND.blue
    },
    secondary: {
      ...blue,
      main: BRAND.navy,
      dark: BRAND.navyDeep,
      light: '#3D7BB8',
      500: '#0099FF'
    },
    info: {
      main: BRAND.blue
    },
    tertiary: {
      main: '#FAFAFA'
    },
    success: {
      main: BRAND.success,
      secondary: '#BEF078'
    },
    warning: {
      main: BRAND.warning
    },
    error: {
      main: BRAND.error
    },
    text: {
      primary: BRAND.ink,
      secondary: BRAND.muted
    },
    divider: BRAND.border,
    background: {
      default: BRAND.background,
      paper: BRAND.surface
    },
    common: {
      arrayFormOuter: '#F5F5F5',
      arrayFormInner: '#E0E0E0',
      lightGreyBackground: '#F5F5F5',
      darkGreyBackground: '#EEEEEE',
      statusOk: '#189a58',
      orange: '#F39C38',
      purple: '#A996D8',
      blue: '#0099FF',
      green: '#72C300',
      gray: '#F6F6F6',
      lightGreen: '#ADEAC0',
      formLabel: 'rgba(0, 0, 0, 0.34)',
      grayText: '#757575'
    },
    eoiStatus: {
      completed: '#5B92E5',
      closed: '#233944',
      open: '#72C300',
      draft: '#A1A1A1'
    },
    userStatus: {
      invited: '#FF6D00',
      active: '#8BC34A',
      deactivated: '#263238'
    },
    dateColors: {
      dark: '#233944',
      green: '#72C300',
      red: '#EA4022',
      blue: '#0099FF',
      orange: '#fec832'
    },
    flags: {
      observation: '#A1A1A1',
      red: '#D50000',
      yellow: '#FFC400',
      escalated: '#FFA000',
      background: '#E5E5E5'
    }
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: 'clamp(2.25rem, 4vw, 3rem)',
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.015em'
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      lineHeight: 1.25
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.3
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.35
    },
    h6: {
      fontSize: '1.0625rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.55
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.01em',
      textTransform: 'none'
    },
    overline: {
      fontSize: '0.6875rem',
      fontWeight: 700,
      letterSpacing: '0.12em',
      lineHeight: 1.6,
      textTransform: 'uppercase'
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::selection': {
          backgroundColor: 'rgba(28, 171, 226, 0.28)'
        },
        '*::-webkit-scrollbar': {
          width: 10,
          height: 10
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: 'transparent'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(11, 59, 117, 0.2)',
          borderRadius: 8,
          '&:hover': {
            backgroundColor: 'rgba(11, 59, 117, 0.32)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 12
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${BRAND.border}`,
          boxShadow: '0 10px 30px rgba(11, 59, 117, 0.08)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: `linear-gradient(100deg, ${BRAND.navyDeep} 0%, ${BRAND.navy} 48%, #1479B4 100%)`,
          boxShadow: '0 2px 18px rgba(7, 44, 89, 0.28)'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: `1px solid ${BRAND.border}`,
          backgroundColor: '#FBFCFE'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingInline: 18,
          minHeight: 38
        },
        sizeSmall: {
          minHeight: 32,
          paddingInline: 14
        },
        contained: {
          '&:hover': {
            boxShadow: '0 8px 18px rgba(11, 59, 117, 0.2)'
          }
        },
        outlined: {
          borderColor: 'rgba(11, 59, 117, 0.22)',
          '&:hover': {
            borderColor: 'rgba(11, 59, 117, 0.45)',
            backgroundColor: 'rgba(11, 59, 117, 0.04)'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: BRAND.surface,
          borderRadius: 8,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(11, 59, 117, 0.35)'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 2,
            borderColor: BRAND.blue
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: BRAND.blueDark
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: BRAND.border,
          padding: '12px 16px'
        },
        head: {
          backgroundColor: '#F7FAFD',
          color: BRAND.muted,
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap'
        },
        body: {
          fontSize: '0.875rem'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.MuiTableRow-hover:hover': {
            backgroundColor: 'rgba(28, 171, 226, 0.06)'
          }
        }
      }
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: 'inherit',
          '&:hover': {
            color: BRAND.blueDark
          },
          '&.Mui-active': {
            color: BRAND.blueDark
          }
        },
        icon: {
          fontSize: 16
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${BRAND.border}`,
          marginTop: 0
        },
        toolbar: {
          minHeight: 52
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: BRAND.navy,
          borderRadius: 6,
          fontSize: '0.75rem',
          fontWeight: 400,
          padding: '6px 10px'
        },
        arrow: {
          color: BRAND.navy
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 600
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          padding: '20px 24px 8px'
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          width: '100%'
        },
        padding: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          minHeight: 44,
          margin: '2px 8px',
          padding: '8px 12px',
          borderRadius: 8,
          color: BRAND.ink,
          '&:hover': {
            backgroundColor: 'rgba(11, 59, 117, 0.05)'
          },
          '&.Mui-selected': {
            backgroundColor: BRAND.blueSoft,
            color: BRAND.navyDeep,
            '&:hover': {
              backgroundColor: '#D8F0FB'
            },
            '& .MuiListItemIcon-root': {
              color: BRAND.blueDark
            },
            '& .MuiListItemText-primary': {
              fontWeight: 600
            }
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 36,
          color: BRAND.muted
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '0.875rem',
          fontWeight: 500
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          cursor: 'pointer',
          textDecorationColor: 'currentColor',
          '&:hover': {
            textDecoration: 'none'
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          minHeight: 36,
          borderRadius: 6,
          margin: '2px 6px'
        },
        gutters: {
          paddingLeft: '12px',
          paddingRight: '12px'
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.54)',
          fontSize: '0.875rem',
          '&.Mui-focused': {
            color: getColorTheme()[500]
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        rootLabelIcon: {
          height: '48px'
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&checked': {
            color: getColorTheme()[500]
          }
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&checked': {
            color: getColorTheme()[500]
          },
          '&disabled': {
            color: getColorTheme()[200]
          }
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          height: 4
        }
      }
    }
  }
});
