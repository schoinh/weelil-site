import React from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import Error404 from './Error404';
import Main from './Main';
import { getOriginalUrl } from '../apiCalls';

async function Redirect() {
  let { slug } = useParams();
  const originalUrl = await getOriginalUrl(slug);
  window.location.href = ('http://'+ originalUrl);
  return null;
}

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/:slug' component={Redirect}/>
        <Route component={Error404} />
      </Switch>
    </div>
  );
}

export default App;