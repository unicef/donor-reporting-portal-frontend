import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  pickBy
} from 'ramda';
import {
  hasValue
} from './helpers';

function parseQuery(search) {
  const params = new URLSearchParams(search);
  const entries = params.entries();
  const object = {};
  for (const [key, value] of entries) {
    try {
      object[key] = JSON.parse(value);
    } catch {
      object[key] = value;
    }
  }
  return object;
}

function stringifyQuery(query) {
  let stringified = new URLSearchParams(query).toString();
  // replaces encoded commas with real commas
  return stringified.replace('%2C', ',');
}

export default function useQuery([defaultQuery, setValue], method = 'replace') {
  const navigate = useNavigate();
  const {
    search
  } = useLocation();
  const hasParams = search.indexOf('=') > -1;

  const setValueWithQuery = newQuery => {
    const nonEmpties = pickBy(hasValue, newQuery);
    const nextSearch = stringifyQuery(nonEmpties);
    setValue(newQuery);
    navigate(window.location.pathname + '?' + nextSearch + window.location.hash, { replace: method === 'replace' });
  };

  return [hasParams ? {
    ...defaultQuery,
    ...parseQuery(search)
  } : defaultQuery, setValueWithQuery];
}
