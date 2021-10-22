import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

export default class SearchBooks extends Component {
  state = {
    query: "",
    books: [],
  };

  changeQuery = (query) => {
    if (query !== null) {
      this.setState({ query: query.trim() });
      this.getBookList(query);
    } else this.setState({ books: [] });
  };

  getBookList = (query) => {
    console.log(query);
    BooksAPI.search(query).then((apiBooks) => {
      this.setState({ books: apiBooks });
    });
  };

  render() {
    const { setShowSearchPage } = this.props;
    console.log(this.state.books);
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <button
              className="close-search"
              onClick={() => setShowSearchPage(false)}
            >
              Close
            </button>
            <div className="search-books-input-wrapper">
              <input
                value={this.state.query}
                onChange={(e) => this.changeQuery(e.target.value)}
                type="text"
                placeholder="Search by title or author"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.books.length ? (
                this.state.books.map((book) => (
                  <li key={book.id}>
                    <Book book={book} changeShelf={this.props.changeShelf} />
                  </li>
                ))
              ) : (
                <h3>no books found</h3>
              )}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
