import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import * as BooksAPI from '../BooksAPI';
import { Book } from '../components';

class SearchBooks extends Component {
  static propTypes = {
    getShelfFromId: PropTypes.func.isRequired,
    updateShelf: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired,
  };

  state = {
    query: '',
    isFetching: false,
    results: [],
  };

  handleChange = event => {
    const { value } = event.target;
    if (value) {
      this.setState(
        {
          query: value,
          isFetching: true,
        },
        () => this.performSearh(value)
      );
    } else {
      this.setState({
        query: '',
        isFetching: false,
        results: [],
      });
    }
  };

  performSearh = debounce(query => {
    BooksAPI.search(query).then(resp => {
      const results = resp.length ? resp : [];
      const resultsWithShelves = results.map(book => {
        book.shelf = this.props.getShelfFromId(book.id);
        return book;
      });
      this.setState({
        isFetching: false,
        results: query ? resultsWithShelves : [],
      });
    });
  }, 500);

  // TODO: updateShelf: change shelf in results here

  render() {
    const { updateShelf, shelves } = this.props;
    const { results, query, isFetching } = this.state;
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
          {query &&
            (isFetching ? (
              <p>
                <i>Searching</i>
              </p>
            ) : results.length ? (
              <p>Found {results.length} books for you.</p>
            ) : (
              <p>
                No books found for <i>{query}</i>. Try another term.
              </p>
            ))}
          <ol className="books-grid">
            {results.map(book => (
              <Book
                key={book.id}
                book={book}
                updateShelf={updateShelf}
                shelves={shelves}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
