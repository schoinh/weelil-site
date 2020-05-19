import React from 'react';

function Error404() {
  var textStyles = {
    textAlign: 'center'
  };

  return (
    <div>
      <div style={textStyles}>
        <h2>Uh oh... This page does not exist!</h2>
      </div>
    </div>
  );
}

export default Error404;