import React, { Component } from "react";

export default class Book extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = this.props.book.shelf;
  // }

  handleShelfChange = (e) => {
    // let changedBook = this.state.book;
    // changedBook.shelf = e.target.value;
    this.props.changeShelf(this.props.book, e.target.value);
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
              backgroundImage: `url(${book.imageLinks.thumbnail}`,
            }}
          />
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={this.handleShelfChange}>
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
          {book.authors.map((author) => (
            <p key={author}>{author}</p>
          ))}
        </div>
      </div> // ToDo
    );
  }
}
