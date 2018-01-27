import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Shelf from '../components/Shelf';

class ShowBooks extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      const { currentlyReading, wantToRead, read } = this.sortBooks(books);
      this.setState({
        currentlyReading,
        wantToRead,
        read,
      });
    });
  }

  sortBooks = books => {
    let currentlyReading = [];
    let wantToRead = [];
    let read = [];
    books.forEach(book => {
      if (book.shelf === 'currentlyReading') currentlyReading.push(book);
      if (book.shelf === 'wantToRead') wantToRead.push(book);
      if (book.shelf === 'read') read.push(book);
    });
    return {
      currentlyReading,
      wantToRead,
      read,
    };
  };

  getBookFromId = id => {
    return BooksAPI.get(id);
  };

  resolveBooksFromIds = bookIds => {
    return Promise.all(bookIds.map(id => this.getBookFromId(id)));
  };

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(resp => {
      Object.entries(resp).forEach(([shelf, bookIds]) => {
        this.resolveBooksFromIds(bookIds).then(books => {
          this.setState({
            [shelf]: books,
          });
        });
      });
    });
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <Shelf
              title="Currently Reading"
              books={this.state.currentlyReading}
              changeShelf={this.changeShelf}
            />
            <Shelf
              title="Want to Read"
              books={this.state.wantToRead}
              changeShelf={this.changeShelf}
            />
            <Shelf
              title="Read"
              books={this.state.read}
              changeShelf={this.changeShelf}
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
