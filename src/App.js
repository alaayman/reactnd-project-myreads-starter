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

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({ books: books }));
    });
  }

  changeBookShelf = (changedBook, shelf) => {
    let newList = [];
    console.log("start app change shelf");
    this.state.books.filter((book) => book.id === changedBook.id).length
      ? (newList = this.state.books.map((book) =>
          book.id === changedBook.id ? changedBook : book
        ))
      : (newList = [...this.state.books, changedBook]);

    console.log("new", newList);
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
