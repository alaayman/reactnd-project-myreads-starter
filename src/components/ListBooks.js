import React, { Component } from "react";
import Shelf from "./Shelf";

export default class ListBooks extends Component {
  state = {
    shelfs: [
      { id: "currentlyReading", name: "Currently Reading" },
      { id: "wantToRead", name: "Want to Read" },
      { id: "read", name: "Read" },
    ],
  };

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
              books={this.props.books}
              changeShelf={this.props.changeShelf}
            />
          ))}
        </div>
      </div>
    );
  }
}
