const fetch = require('node-fetch');

export const shortenUrl = async rawInput => {
  const userInput = normalize(rawInput);
  const params = {
    'operation': 'create',
    'longUrl': userInput
  };

  const res = await fetch('https://9h1dsm837f.execute-api.us-west-2.amazonaws.com/url/url', {
    method: 'post',
    body: JSON.stringify(params),
  });
  const newSlug = await res.text();
  return newSlug;
}

// Remove 'https://', 'http://', and/or 'www.' from input
const normalize = input => {
  let noHttp = input.split('//');
  if (noHttp.length > 1) noHttp.shift();
  return noHttp[0].split('www.').join('');
}

export const getOriginalUrl = async slug => {
  const params = {
    'operation': 'read',
    'shortUrlSlug': slug
  }
  const res = await fetch('https://9h1dsm837f.execute-api.us-west-2.amazonaws.com/url/url', {
    method: 'post',
    body: JSON.stringify(params)
  });
  const originalUrl = await res.text();
  return originalUrl;
};