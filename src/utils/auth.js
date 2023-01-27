export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      console.log(res);
      try {
        if (res.status === 200) {
          return res.json();
        }
      } catch (e) {
        console.log('sdada');
        return e;
      }
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}
