import { BASE_HEADERS, BASE_URL, checkResponse } from './constants';

export const postTicket = (resultTicket) => {
  return fetch(`${BASE_URL}/`, {
    method: 'POST',
    headers: BASE_HEADERS,
    body: resultTicket,
  }).then(checkResponse);
};