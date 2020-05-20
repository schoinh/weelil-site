import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Router basename={process.env.PUBLIC_URL}>
          <Component />
      </Router>
    </AppContainer>,
    document.getElementById('react-app-root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}