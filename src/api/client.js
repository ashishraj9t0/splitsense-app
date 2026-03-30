// api/client.js — Axios with auto JWT refresh
import { API_URL } from '../config';
import { getAuthToken } from '../auth';

async function request(path, options = {}) {
  const token = getAuthToken();

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed (${response.status})`);
    error.response = {
      status: response.status,
      data,
    };
    throw error;
  }

  return { data };
}

export const api = {
  get(path) {
    return request(path, { method: 'GET' });
  },
  post(path, body) {
    return request(path, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
};
