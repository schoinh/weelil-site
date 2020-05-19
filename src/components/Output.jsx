import './css/output.css';
import React from 'react';

function Output(props) {
  return (
    <div id='result-block'>
      <span id='new-url'>weelil.site/{props.slug}</span>
    </div>
  )
}

export default Output;