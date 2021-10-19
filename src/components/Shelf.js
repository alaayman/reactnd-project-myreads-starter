import React, { Component } from "react";
import Book from "./Book";

export default class Shelf extends Component {
  render() {
    const { books, shelf } = this.props;

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelf.name}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books
                .filter((book) => book.shelf === shelf.id)
                .map((book) => (
                  <li>
                    <Book book={book} />
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
