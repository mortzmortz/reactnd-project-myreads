import React from 'react';
import PropTypes from 'prop-types';
import ShelfChanger from './ShelfChanger';

const Book = ({ book, changeShelf }) => {
  const { authors, imageLinks, title } = book;

  const handleChange = shelf => {
    changeShelf(book, shelf);
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
          <ShelfChanger book={book} changeShelf={handleChange} />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors[0]}</div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default Book;
