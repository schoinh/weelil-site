import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
const fetch = require('node-fetch');
const crossroads = require('crossroads');

crossroads.addRoute('{slugPath}', async slugPath => {
  const getParams = {
    'operation': 'read',
    'shortUrlSlug': slugPath
  }
  const getRes = await fetch('https://9h1dsm837f.execute-api.us-west-2.amazonaws.com/url/url', {
    method: 'post',
    body: JSON.stringify(getParams)
  });
  const originalUrl = await getRes.text();

  console.log(originalUrl);
  window.location.replace('https://'+ originalUrl);
})

//Listen to hash changes
window.addEventListener('popstate', function() {
  let url = window.location.href;
  let toParse = url.split('/').pop();
  crossroads.parse(toParse);
});

// trigger hashchange on first page load
window.dispatchEvent(new CustomEvent('popstate'));

$(() => {
  $('#shorten-url').submit(async event => {
    event.preventDefault(); // NOTE: need this?
    $('#result-block').slideUp();

    const userInput = normalize($('#user-input').val());
    const params = {
      'operation': 'create',
      'longUrl': userInput
    };

    const res = await fetch('https://9h1dsm837f.execute-api.us-west-2.amazonaws.com/url/url', {
      method: 'post',
      body: JSON.stringify(params),
    });
    const slug = await res.text();

    $('#slug').text(slug);
    $('#result-block').slideDown();
  })
})

// Removes 'https://', 'http://', and/or 'www.'
const normalize = input => {
  let noHttp = input.split('//');
  if (noHttp.length > 1) noHttp.shift();
  return noHttp[0].split('www.').join('');
}