import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBooks from "./components/SearchBooks";
import ListBooks from "./components/ListBooks";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  // getting data from api and setting the state
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({ books: books }));
    });
  }

  // Had a lot of trouble with that one tried different approaches until succeeding
  // taking the call from Book and replacing the (changed book with shelf added) to Books state
  changeBookShelf = (changedBook, shelf) => {
    let newList = [];
    // Find if the book exist if so map books and replace changed book
    // If the book dont exist just add it to books
    this.state.books.filter((book) => book.id === changedBook.id).length
      ? (newList = this.state.books.map((book) =>
          book.id === changedBook.id ? changedBook : book
        ))
      : (newList = [...this.state.books, changedBook]);

    // console.log("new", newList);
    this.setState({
      books: newList,
    });
    BooksAPI.update(changedBook, shelf);
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              myBooks={this.state.books}
              changeShelf={this.changeBookShelf}
            />
          )}
        />
        <Route
          path="/"
          exact
          render={() => (
            <div>
              <ListBooks
                books={this.state.books}
                changeShelf={this.changeBookShelf}
              />
              <div className="open-search">
                <Link to="/search">
                  <button type="button">Add a book </button>
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
