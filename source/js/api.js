import { setInactiveFilterState } from './page-state.js';

const GET_LINK = 'https://23.javascript.pages.academy/keksobooking/data';
const POST_LINK = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(GET_LINK)
    .then((response) => {
      if (response.ok) {
        const promos = response.json();
        return promos;
      } else {
        onError();
        setInactiveFilterState();
      }
    })
    .then((promos) => onSuccess(promos))
    .catch(() => onError());
};

const sendData = (onSuccess, onError, body) => {
  fetch(POST_LINK,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      response.ok ? onSuccess() : onError();
    })
    .catch(() => onError());
};

export { getData, sendData };
