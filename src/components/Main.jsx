import './Main.css';

import React from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
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
      <Form>
        <Form.Row>
          <Col md={10}>
            <Form.Control size='lg' id='user-input' type='text' placeholder='Enter a URL to shorten' required/><br/>
          </Col>
          <Col md={2}>
            <Button type='submit' size='lg'>Weelil It</Button>
          </Col>
        </Form.Row>
      </Form>
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