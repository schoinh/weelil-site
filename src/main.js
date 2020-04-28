import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
const fetch = require('node-fetch');

$(() => {
  $('#shorten-url').submit(event => {
    event.preventDefault(); // NOTE: need this?
    const userInput = normalize($('#user-input').val());
    
    const params = {
      'operation': 'create',
      'longUrl': userInput
    };

    fetch('https://9h1dsm837f.execute-api.us-west-2.amazonaws.com/url/url', {
      method: 'post',
      body: JSON.stringify(params),
      })
      .then(res => console.log(res));

    $('form')[0].reset();
  })
})

// Removes 'https://', 'http://', and/or 'www.'
const normalize = input => {
  let noHttp = input.split('//');
  if (noHttp.length > 1) noHttp.shift();
  return noHttp[0].split('www.').join('');
}