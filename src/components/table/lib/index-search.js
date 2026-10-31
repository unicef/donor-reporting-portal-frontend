import React from 'react';
import {
  format
} from 'date-fns';

import {
  BACKEND_PROPERTIES_USER_LAST_LOGIN
} from '../../../lib/constants';
import {
  DISPLAY_FORMAT,
  BACKEND_REPORTS_FIELDS
} from 'pages/reports/constants';
import {
  getUserStatusStr
} from '../user-row-item';
import {
  getRecipientOfficeStr
} from '../search-reports-table';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  onFetchSearchReports
} from 'actions';
import {
  selectSearchReports
} from 'selectors/collections';

export function desc(a, b, func) {
  if (func(b) < func(a)) {
    return -1;
  }
  if (func(b) > func(a)) {
    return 1;
  }
  return 0;
}

export function descByOrderBy(orderBy) {
  return el => el[orderBy];
}

export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function getSorting(order, orderBy) {
  let func = descByOrderBy(orderBy);
  if (orderBy === BACKEND_PROPERTIES_USER_LAST_LOGIN) {
    func = getUserStatusStr;
  }
  if (orderBy === BACKEND_REPORTS_FIELDS['recipientOffice']) {
    func = getRecipientOfficeStr;
  }
  return order === 'desc' ? (a, b) => desc(a, b, func) : (a, b) => -desc(a, b, func);
}

export const useTable = (defaultOrderBy = '') => {
  const reportsData = useSelector(selectSearchReports);
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(defaultOrderBy);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const getEmptyRows = rows =>
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const getParamsObj = (params) => {
    const paramsString = params.split('?')[1];
    return JSON.parse('{"' + paramsString.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function(key, value) {
      return key === "" ? value : decodeURIComponent(value)
    })
  }

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    const next = reportsData.next;
    const prev = reportsData.previous;
    const paramsObjNext = next ? getParamsObj(next) : '';
    const paramsObjPrev = prev ? getParamsObj(prev) : '';
    (newPage + 1) > page ? dispatch(onFetchSearchReports(paramsObjNext)) : dispatch(onFetchSearchReports(paramsObjPrev))
    setPage(newPage)
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return {
    orderBy,
    order,
    setOrder,
    setOrderBy,
    setPage,
    page,
    rowsPerPage,
    setRowsPerPage,
    getEmptyRows,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage
  };
};

export function getDisplayDate(dateStr) {
  try {
    return dateStr ? format(new Date(dateStr), DISPLAY_FORMAT) : '';
  } catch {
    return dateStr;
  }
}

export function getDisplayValue(value, defaultValue = '—') {
  return value ? value : defaultValue;
}

export function arrayToTooltip(arr) {
  if (arr && arr.length) {
    return arr.join ? arr.join(', ') : arr;
  }
  return '';
}
