import './css/output.css';
import React, { Component } from 'react';
import copyIcon from '../images/copyIcon.svg';

class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCopied: 'false',
      url : 'weelil.site/' + this.props.slug
    };
    
    this.handleCopyClick = this.handleCopyClick.bind(this);
  }

  async handleCopyClick() {
    await navigator.clipboard.writeText(this.state.url);
    this.setState({ isCopied: 'true' })
  }

  render() {
    return (
      <span id={this.state.isCopied ? 'copied-result-block' : 'result-block'}>
        <span id='url'>weelil.site/{this.props.slug}</span>
        <img id='copy' src={copyIcon} onClick={this.handleCopyClick}/>
      </span>
    )
  }
}

export default Output;