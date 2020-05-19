import './Main.css';

import React from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function Main() {
  return (
    <Container>
      <div id='title'>Weelil Site</div>
      <p className='lead'>
        Take your long URL...<br/>
        <span className='url-line'>http://<span className='url' id='long-url'>www.reallylongwebsiteurl.com/itsnotoveryet/really/167345efadffa</span></span><br/>
        ...and make it little.<br/>
        <span className='url-line'>http://<span className='url' id='short-url'>weelil.site/#abc123</span></span>
      </p>;
      <form id='shorten-url'>
        <div className='form-row'>
          <div className='col-md-10'>
            <input className='form-control form-control-lg' id='user-input' type='text' placeholder='Enter a URL to shorten' required/><br/>
          </div>
          <div className='col-md-2'>
            <button type='submit' className='btn btn-lg'>Weelil It</button>
          </div>
        </div>
      </form>
      <div id='result-block'>
        <span id='new-url'>weelil.site/#<span id='slug'></span></span>
      </div>
      <div id='github'>
        Weelil Site on <a href='http://github.com/schoinh/weelil-site' target='_blank'><img id='github-logo' src='https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png'/></a>
      </div>
    </Container>
  )
}

export default Main;