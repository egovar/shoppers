const server = 'https://bs-bags.ru/api/shoppers';

export const request = async (url, payload) => {
  console.log('request started ', server + url, ': ', payload);
  const stream = await fetch(server + url, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    body: payload ? JSON.stringify(payload) : undefined
  });
  return await stream.json();
};
