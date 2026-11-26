import { getCookie } from 'api/helpers';

export const SESSION_LOGOUT_URL = '/accounts/logout/';

export async function ensureCsrfCookie() {
  if (getCookie('csrftoken')) {
    return;
  }
  await fetch('/admin/login/', {
    method: 'GET',
    credentials: 'include'
  });
}

/**
 * Logs out of the Django session. The endpoint is POST-only, so a real form
 * is submitted (carrying the CSRF token) and Django handles the session flush
 * and the redirect to LOGOUT_REDIRECT_URL.
 */
export async function logoutSession() {
  await ensureCsrfCookie();

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = SESSION_LOGOUT_URL;

  const csrfToken = getCookie('csrftoken');
  if (csrfToken) {
    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrfmiddlewaretoken';
    csrfInput.value = csrfToken;
    form.appendChild(csrfInput);
  }

  document.body.appendChild(form);
  form.submit();
}
