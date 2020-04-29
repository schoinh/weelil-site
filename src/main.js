import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
const fetch = require('node-fetch');
const crossroads = require('crossroads');

// UI for shortening URLs
$(() => {
  $('#shorten-url').submit(async event => {
    event.preventDefault();
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
    const newSlug = await res.text();

    $('#slug').text(newSlug);
    $('#result-block').slideDown();
  })
})

// Remove 'https://', 'http://', and/or 'www.' from input
const normalize = input => {
  let noHttp = input.split('//');
  if (noHttp.length > 1) noHttp.shift();
  return noHttp[0].split('www.').join('');
}

// Router for redirecting user to original URL
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

  window.location.replace('https://'+ originalUrl);
})

// Call router when 'redirect' is triggered 
window.addEventListener('redirect', function() {
  let url = window.location.href;
  let path = url.split('/').pop().slice(1);
  crossroads.parse(path);
});

// Trigger redirect on page load
window.dispatchEvent(new Event('redirect'));