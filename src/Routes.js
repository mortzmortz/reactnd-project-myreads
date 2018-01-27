import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import ShowBooks from './views/ShowBooks';
import SearchBooks from './views/SearchBooks';

const Routes = (
  <Router>
    <App>
      <div className="app">
        <Route component={Header} />
        <main>
          <Route exact path="/" component={ShowBooks} />
          <Route path="/search" component={SearchBooks} />
        </main>
      </div>
    </App>
  </Router>
);

export default Routes;
