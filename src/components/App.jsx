import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';
import Main from './Main';
const fetch = require('node-fetch');

const redirect = async slug => {
  const getParams = {
    'operation': 'read',
    'shortUrlSlug': slug
  }
  const getRes = await fetch('https://9h1dsm837f.execute-api.us-west-2.amazonaws.com/url/url', {
    method: 'post',
    body: JSON.stringify(getParams)
  });
  const originalUrl = await getRes.text();

  window.location.href = ('http://'+ originalUrl);
  return null;
}

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/:slug' component={redirect} />
        <Route component={Error404} />
      </Switch>
    </div>
  );
}

export default App;