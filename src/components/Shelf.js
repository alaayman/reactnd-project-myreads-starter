import React, { Component } from "react";
import Book from "./Book";

// Populate the shelfs with filtering books
export default class Shelf extends Component {
  render() {
    const { books, shelf, changeShelf } = this.props;

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelf.name}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books
                .filter((book) => book.shelf === shelf.id)
                .map((book) => (
                  <li key={book.id}>
                    <Book book={book} changeShelf={changeShelf} />
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
