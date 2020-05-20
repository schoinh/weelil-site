import './css/output.css';
import React from 'react';
import copyIcon from '../images/copyIcon.svg';

class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCopied: false,
      url : 'weelil.site/' + this.props.slug
    };
    
    this.handleCopyClick = this.handleCopyClick.bind(this);
    this.handleClass = this.handleClass.bind(this);
  }

  async handleCopyClick() {
    await navigator.clipboard.writeText(this.state.url);
    this.setState({ isCopied: true })
  }

  handleClass() {
    return this.state.isCopied ? 'result-block-copied' : 'result-block';
  }

  render() {
    console.log(this.state.isCopied)
    return (
      <span className={this.handleClass()}>
        <span id='url'>weelil.site/{this.props.slug}</span>
        <img id='copy' src={copyIcon} onClick={this.handleCopyClick}/>
      </span>
    )
  }
}

export default Output;