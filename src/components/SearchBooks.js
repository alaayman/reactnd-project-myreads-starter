import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

export default class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      books: [],
    };
  }

  changeQuery = (query) => {
    this.setState({ query: query });
    // Checking for error or null query
    BooksAPI.search(query)
      .then((apiBooks) => {
        if (!query || apiBooks.error) {
          this.setState({ books: [] });
        } else {
          this.syncBooks(this.props.myBooks, apiBooks);
        }
      })
      .catch((error) => {
        console.log(error); // did'nt work !!!!
        this.setState({ books: [] });
      });
  };

  // Tried to do it with props from App.js but didn't work
  // so used same logic from App changeBookShelf
  changeSearchShelf = (changedBook) => {
    let newList = [];
    this.state.books.filter((book) => book.id === changedBook.id).length
      ? (newList = this.state.books.map((book) =>
          book.id === changedBook.id ? changedBook : book
        ))
      : (newList = [...this.state.books, changedBook]);
    this.setState({
      books: newList,
    });
  };

  // Called whenever the search query change to sync books from App with search results
  syncBooks = (myBooks, apiBooks) => {
    // console.log("api", apiBooks);
    let newBooks = [];
    newBooks = apiBooks.map((apiBook) =>
      myBooks.find((myBook) => apiBook.id === myBook.id)
        ? myBooks.find((myBook) => apiBook.id === myBook.id)
        : apiBook
    );
    this.setState({ books: newBooks });
  };

  render() {
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button className="close-search">Close</button>
            </Link>
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
                    <Book
                      book={book}
                      changeShelf={this.props.changeShelf}
                      changSearchShelf={this.changeSearchShelf}
                    />
                  </li>
                ))
              ) : (
                <h4>no books found</h4>
              )}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
