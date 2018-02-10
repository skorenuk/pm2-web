import fetch from 'axios';

function errorHandler(error) {
  console.log(error);
  alert(error.message);
}

export function fetchData(url, data) {
  return fetch({
    url,
    method: data != null ? 'POST': 'GET',
    data,
  }).catch(errorHandler);
}
