import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Shelf } from '../components';

const ShowBooks = ({ books, shelves, updateShelf }) => {
  const getBooksFromShelf = shelf => {
    return books.filter(book => book.shelf === shelf);
  };

  return (
    <div className="list-books">
      <div className="list-books-content">
        <div>
          {shelves.map(shelf => (
            <Shelf
              key={shelf.key}
              title={shelf.title}
              books={getBooksFromShelf(shelf.key)}
              updateShelf={updateShelf}
              shelves={shelves}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

ShowBooks.propTypes = {
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
  shelves: PropTypes.array.isRequired,
};

export default ShowBooks;
