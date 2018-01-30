import React from 'react';
import PropTypes from 'prop-types';
import { SelectShelf } from '../components';

const Book = ({ book, shelves, updateShelf }) => {
  const { authors, imageLinks, title } = book;

  const handleChange = shelf => {
    updateShelf(book, shelf);
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageLinks.thumbnail})`,
            }}
          />
          <SelectShelf
            book={book}
            updateShelf={handleChange}
            shelves={shelves}
          />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors ? authors[0] : ''}</div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired,
  shelves: PropTypes.array.isRequired,
};

export default Book;
