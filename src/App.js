import React from 'react';
import { Route } from 'react-router-dom';
import flatten from 'lodash/flatten';
import * as BooksAPI from './BooksAPI';
import { Header } from './components';
import { ShowBooks, SearchBooks } from './components';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  static shelves = [
    { key: 'currentlyReading', title: 'Currently Reading' },
    { key: 'wantToRead', title: 'Want to Read' },
    { key: 'read', title: 'Read' },
  ];

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books,
      });
    });
  }

  resolveBooksFromIds = bookIds => {
    return Promise.all(bookIds.map(id => BooksAPI.get(id)));
  };

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(resp => {
      const bookIds = flatten(Object.values(resp));
      this.resolveBooksFromIds(bookIds).then(books => {
        this.setState({
          books,
        });
      });
    });
  };

  getShelfFromId = bookId => {
    const book = this.state.books.find(book => book.id === bookId);
    return book ? book.shelf : 'none';
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route component={Header} />
        <main>
          <Route
            exact
            path="/"
            render={() => (
              <ShowBooks
                books={books}
                updateShelf={this.updateShelf}
                shelves={BooksApp.shelves}
              />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <SearchBooks
                getShelfFromId={this.getShelfFromId}
                updateShelf={this.updateShelf}
                shelves={BooksApp.shelves}
              />
            )}
          />
        </main>
      </div>
    );
  }
}

export default BooksApp;
