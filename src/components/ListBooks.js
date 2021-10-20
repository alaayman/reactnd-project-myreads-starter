import React, { Component } from "react";
import Shelf from "./Shelf";
import * as BooksAPI from "../BooksAPI";

export default class ListBooks extends Component {
  state = {
    shelfs: [
      { id: "currentlyReading", name: "Currently Reading" },
      { id: "wantToRead", name: "Want to Read" },
      { id: "read", name: "Read" },
    ],
    books: [],
  };

  changeBookShelf = (changedBook, shelf) => {
    let newList = this.state.books;
    newList = newList.map((book) => {
      if (book.id === changedBook.id) {
        book.shelf = shelf;
        return book;
      } else return book;
    });
    this.setState({
      books: newList,
    });
    BooksAPI.update(changedBook, shelf);
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {this.state.shelfs.map((shelf) => (
            <Shelf
              key={shelf.id}
              shelf={shelf}
              books={this.state.books}
              changeShelf={this.changeBookShelf}
            />
          ))}
        </div>
      </div>
    );
  }
}
