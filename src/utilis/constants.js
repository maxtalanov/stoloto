export const BASE_URL = 'http://localhost:3000';
export const BASE_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};
export const checkResponse = res => res.ok
  ? res.json()
  : Promise.reject(`Ошибка: ${res.status} - ${res.statusText}.`);
