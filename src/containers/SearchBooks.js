import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Book } from '../components';

class SearchBooks extends Component {
  static propTypes = {
    setShelf: PropTypes.func.isRequired,
    updateSearchResults: PropTypes.func.isRequired,
    searchResults: PropTypes.array.isRequired,
  };

  state = {
    query: '',
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState(
      {
        query: value,
      },
      () => this.props.updateSearchResults(value)
    );
  };

  render() {
    const { setShelf, searchResults } = this.props;
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
            {searchResults.length
              ? searchResults.map(book => (
                  <Book key={book.id} book={book} setShelf={setShelf} />
                ))
              : 'No results found'}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
