import React, { Fragment } from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';

class BooksApp extends React.Component {
  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default BooksApp;
