import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import * as BooksAPI from '../BooksAPI';
import { Book } from '../components';

class SearchBooks extends Component {
  static propTypes = {
    getBookShelf: PropTypes.func.isRequired,
    updateShelf: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired,
  };

  state = {
    query: '',
    results: [],
  };

  handleChange = event => {
    const { value } = event.target;
    if (value) {
      this.setState(
        {
          query: value,
        },
        () => this.performSearh(value)
      );
    } else {
      this.setState({
        results: [],
      });
    }
  };

  performSearh = debounce(query => {
    BooksAPI.search(query).then(resp => {
      const results = resp.length ? resp : [];
      const resultsWithShelves = results.map(book => {
        book.shelf = this.props.getBookShelf(book.id);
        return book;
      });
      this.setState({
        results: resultsWithShelves,
      });
    });
  }, 500);

  // TODO: change shelf in results here

  render() {
    const { updateShelf, shelves } = this.props;
    const { results } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.length
              ? results.map(book => (
                  <Book
                    key={book.id}
                    book={book}
                    updateShelf={updateShelf}
                    shelves={shelves}
                  />
                ))
              : 'No results found'}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
