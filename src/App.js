import React from 'react';
import { Route } from 'react-router-dom';
import debounce from 'lodash/debounce';
import flatten from 'lodash/flatten';
import * as BooksAPI from './BooksAPI';
import { Header } from './components';
import { ShowBooks, SearchBooks } from './containers';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
  };

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

  setShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(resp => {
      const bookIds = flatten(Object.values(resp));
      this.resolveBooksFromIds(bookIds).then(books => {
        this.setState({
          books,
        });
      });
    });
  };

  findBookById = (books, id) => {
    return books.filter(book => book.id === id)[0];
  };

  updateSearchResults = debounce(query => {
    if (query) {
      // get results from query
      BooksAPI.search(query).then(resp => {
        let searchResults = resp.length ? resp : [];
        searchResults.map(result => {
          // is book already stored?
          const bookInBooks = this.findBookById(this.state.books, result.id);
          if (bookInBooks) {
            // set current shelf
            result.shelf = bookInBooks.shelf;
          }
          return result;
        });
        this.setState({
          searchResults,
        });
      });
    } else {
      this.setState({
        searchResults: [],
      });
    }
  }, 500);

  render() {
    const { books, searchResults } = this.state;
    return (
      <div className="app">
        <Route component={Header} />
        <main>
          <Route
            exact
            path="/"
            render={() => <ShowBooks books={books} setShelf={this.setShelf} />}
          />
          <Route
            path="/search"
            render={() => (
              <SearchBooks
                searchResults={searchResults}
                updateSearchResults={this.updateSearchResults}
                setShelf={this.setShelf}
              />
            )}
          />
        </main>
      </div>
    );
  }
}

export default BooksApp;
