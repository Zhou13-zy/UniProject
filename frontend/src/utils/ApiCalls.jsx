export function apiCall (method, headers, body, path) {
  return new Promise((resolve, reject) => {
    const init = {
      method: method,
      mode: 'cors',
      headers: headers,
      body: method === 'GET' ? undefined : JSON.stringify(body),
    };
    fetch(`http://localhost:5001/v1/${path}`, init)
      .then(response => {
        return response.json();
      })
      .then(body => {
        if (body.error) alert(body.error);
        else resolve(body);
      })
      .catch(err => console.log(err.message));
  });
}