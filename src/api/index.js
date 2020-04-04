import axios from 'axios';
import {
  getCookie
} from './helpers';
import Qs from 'qs';

const currentDate = () => {
  let date = new Date();
  return date.getFullYear();
};

const backendPath = '/api';

const getBaseOptions = () => ({
  headers: {
    'X-CSRFToken': getCookie('csrftoken')
  },

  withCredentials: true,
  paramsSerializer: function (params) {
    return Qs.stringify(params, {
      arrayFormat: 'comma'
    });
  }
});

export async function get(uri, params = {}, options = getBaseOptions()) {
  const opt = {
    method: 'GET',
    params
  };
  const response = await axios.get(`${backendPath}${uri}`, {
    ...opt,
    ...options
  });
  return response.data;
}

async function post(uri, body = {}) {
  const response = await axios.post(`${backendPath}${uri}`, body, getBaseOptions());
  return response.data;
}

async function patch(uri, body) {
  const response = await axios.patch(`${backendPath}${uri}`, body, getBaseOptions());
  return response.data;
}

async function del(uri) {
  const response = await axios.delete(`${backendPath}${uri}`, getBaseOptions());
  return response.status === 204;
}

export function getUserRoles(params) {
  return get(process.env.REACT_APP_USER_ROLES_ENDPOINT, params);
}

export function getUserGroups() {
  return get(process.env.REACT_APP_USER_GROUPS_ENDPOINT, {
    search: 'Donor'
  });
}

export function getDonors() {
  return get(process.env.REACT_APP_REPORTS_DONORS_ENDPOINT);
}

export function getAdminDonors() {
  return get(process.env.REACT_APP_REPORTS_DONORS_ENDPOINT);
}

export async function createUser(user) {
  const url = process.env.REACT_APP_USERS_ENDPOINT;
  const res = await post(url, user);
  return res;
}

export async function getUser(user) {
  const url = process.env.REACT_APP_USERS_ENDPOINT;
  const res = await get(url, user);
  if (Array.isArray(res)) {
    return res[0];
  }
  return res;
}

export async function createRole(role) {
  const url = process.env.REACT_APP_USER_ROLES_ENDPOINT;
  const res = await post(url, role);
  return res;
}

export async function patchRole(role) {
  const url = `${process.env.REACT_APP_USER_ROLES_ENDPOINT}${role.id}/`;
  const res = await patch(url, role);
  return res;
}

export async function deleteRole(id) {
  const url = `${process.env.REACT_APP_USER_ROLES_ENDPOINT}${id}`;
  const res = await del(url);
  return res;
}

export function getGrants(id) {
  const url = process.env.REACT_APP_GRANTS_ENDPOINT.replace('<donor_id>', id);
  return get(url);
}

export function getExternalGrants(id) {
  const url = process.env.REACT_APP_EXTERNAL_GRANTS_ENDPOINT.replace('<donor_id>', id);
  return get(url);
}

export function getThemes() {
  return get(process.env.REACT_APP_THEMES_ENDPOINT);
}

export function getStaticAssets() {
  return get(process.env.REACT_APP_USER_STATIC_ENDPOINT);
}

export function getUserProfile() {
  return get(process.env.REACT_APP_PROFILE_ENDPOINT);
}

export function getOffices() {
  return get(process.env.REACT_APP_BUSINESS_AREA_ENDPOINT);
}

export async function getReports(params, year = currentDate()) {
  const computedUrl = process.env.REACT_APP_REPORTS_ENDPOINT.replace('<envvar>', process.env.REACT_APP_TENANT_NAME).replace('<folder>', `${year} Certified Reports`);
  return get(computedUrl, params);
}

export async function getUsGovReports(params, year) {
  const computedUrl = process.env.REACT_APP_REPORTS_ENDPOINT.replace('<envvar>', process.env.REACT_APP_TENANT_NAME).replace('<folder>', `${year} US Gov Certified Reports`);
  return get(computedUrl, params);
}

export async function getThematicReports(params) {
  const computedUrl = process.env.REACT_APP_REPORTS_ENDPOINT.replace('<envvar>', process.env.REACT_APP_TENANT_NAME).replace('<folder>', `Thematic%20Reports`);
  return get(computedUrl, params);
}
