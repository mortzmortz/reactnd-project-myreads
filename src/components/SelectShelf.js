import React from 'react';
import PropTypes from 'prop-types';

const SelectShelf = ({ book, shelves, updateShelf }) => {
  const handleChange = event => {
    updateShelf(event.target.value);
  };

  return (
    <div className="book-shelf-changer">
      <select value={book.shelf || 'none'} onChange={handleChange}>
        <option value="disabled" disabled>
          Move to...
        </option>
        {shelves.map(shelf => (
          <option value={shelf.key} key={shelf.key}>
            {shelf.title}
          </option>
        ))}
        <option value="none">None</option>
      </select>
    </div>
  );
};

SelectShelf.propTypes = {
  book: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired,
  shelves: PropTypes.array.isRequired,
};

export default SelectShelf;
