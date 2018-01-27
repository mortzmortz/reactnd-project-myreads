import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Shelf = ({ books, changeShelf, title }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <Book key={book.id} book={book} changeShelf={changeShelf} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Shelf;
