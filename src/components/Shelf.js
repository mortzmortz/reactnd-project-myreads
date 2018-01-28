import React from 'react';
import PropTypes from 'prop-types';
import { Book } from '../components';

const Shelf = ({ books, setShelf, title }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <Book key={book.id} book={book} setShelf={setShelf} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  setShelf: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Shelf;
