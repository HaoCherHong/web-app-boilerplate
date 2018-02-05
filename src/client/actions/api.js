import config from 'config';
require('isomorphic-fetch');

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function resolveUrl(base, path) {
  return /(.+)\/?$/.exec(base)[1] + /\/*(.+)/.exec(path)[1];
}

export default function api(url, method = 'get', body = null) {
  const headers = {
    'Content-Type': 'application/json'
  };

  return fetch(resolveUrl(config.api, url), {
    credentials: 'same-origin',
    method,
    // mode: 'no-cors',
    headers,
    body: body && JSON.stringify(body)
  })
    .then(checkStatus)
    .then(res => res.json());
}