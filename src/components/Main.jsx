import React from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Output from './Output';

import './css/main.css';
import githubLogo from '../images/GitHub_Logo.png';
import { shortenUrl } from '../apiCalls';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      input: '',
      outputSlug: '',
      isOutputVisible: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleInputChange(event) {
    this.setState({ input: event.target.value });
  }

  async handleButtonClick() {
    this.setState({ isOutputVisible: false });
    if (this.state.input) {
      const output = await shortenUrl(this.state.input);
      this.setState({ outputSlug: output, isOutputVisible: true });
    }
  }

  render() {
    return (
      <Container>
        <div id='title'>Weelil Site</div>
        <p className='lead'>
          Take your long URL...<br/>
          <span className='url-line'>http://<span className='url' id='long-url'>www.reallylongwebsiteurl.com/itsnotoveryet/really/167345efadffa</span></span><br/>
          ...and make it little.<br/>
          <span className='url-line'>http://<span className='url' id='short-url'>weelil.site/abc123</span></span>
        </p>
        <Form>
          <Form.Row>
            <Col md={10}>
              <Form.Control required
                size='lg'
                type='text'
                placeholder='Enter a URL to shorten'
                value={this.state.input}
                onChange={this.handleInputChange}
              /><br/>
            </Col>
            <Col md={2}>
              <Button size='lg' onClick={this.handleButtonClick}>Weelil It</Button>
            </Col>
          </Form.Row>
        </Form>
        {this.state.isOutputVisible &&
          <Output slug={this.state.outputSlug}/>
        }
        <div id='github'>
          Weelil Site on <a href='http://github.com/schoinh/weelil-site' target='_blank'><img id='github-logo' src={githubLogo}/></a>
        </div>
      </Container>
    )
  }
}

export default Main;