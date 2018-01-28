import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Shelf } from '../components';

class ShowBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    setShelf: PropTypes.func.isRequired,
  };

  filterByShelf = shelf => {
    const { books } = this.props;
    return books.filter(book => book.shelf === shelf);
  };

  render() {
    const { setShelf } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <Shelf
              title="Currently Reading"
              books={this.filterByShelf('currentlyReading')}
              setShelf={setShelf}
            />
            <Shelf
              title="Want to Read"
              books={this.filterByShelf('wantToRead')}
              setShelf={setShelf}
            />
            <Shelf
              title="Read"
              books={this.filterByShelf('read')}
              setShelf={setShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ShowBooks;
