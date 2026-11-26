import { logoutSession, SESSION_LOGOUT_URL } from './session-logout';

describe('logoutSession', () => {
  let submitSpy;

  beforeEach(() => {
    document.cookie = 'csrftoken=test-token; path=/';
    submitSpy = jest.spyOn(HTMLFormElement.prototype, 'submit').mockImplementation(() => {});
  });

  afterEach(() => {
    submitSpy.mockRestore();
    document.cookie = 'csrftoken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.querySelector(`form[action="${SESSION_LOGOUT_URL}"]`)?.remove();
  });

  it('posts a form to the Django logout endpoint with the CSRF token', async () => {
    await logoutSession();

    const form = document.querySelector(`form[action="${SESSION_LOGOUT_URL}"]`);
    expect(form).not.toBeNull();
    expect(form.method.toLowerCase()).toBe('post');
    expect(form.querySelector('input[name="csrfmiddlewaretoken"]').value).toBe('test-token');
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
});
