import React, { Component } from "react";

export default class Book extends Component {
  state = {
    book: this.props.book,
  };

  handleShelfChange = (e) => {
    let changedBook = this.state.book;
    changedBook.shelf = e.target.value;
    this.setState({
      book: changedBook,
    });
    this.props.changeShelf(this.state.book, e.target.value);
  };

  render() {
    const { book } = this.state;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                book.imageLinks === null || book.imageLinks === undefined
                  ? ""
                  : `url(${book.imageLinks.thumbnail}`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={book.shelf ? book.shelf : "none"}
              onChange={this.handleShelfChange}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? (
            book.authors.map((author) => <p key={author}>{author}</p>)
          ) : (
            <p />
          )}
        </div>
      </div>
    );
  }
}
