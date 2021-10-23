import React, { Component } from "react";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.book,
    };
  }

  // calling the changeShelf prop from App.js
  handleShelfChange = (e) => {
    // console.log("started change in book");
    let changedBook = this.state.book;
    changedBook.shelf = e.target.value;
    this.setState({
      book: changedBook,
    });
    this.props.changeShelf(this.state.book, e.target.value);
    // console.log("after calling app from book change shelf");
    // this.props.changSearchShelf(this.state.book);
  };

  render() {
    const { book } = this.props;
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
            <p>no authors listed</p>
          )}
        </div>
      </div>
    );
  }
}
