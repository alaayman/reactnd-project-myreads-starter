import React from "react";
import "./App.css";
import SearchBooks from "./components/SearchBooks";
import ListBooks from "./components/ListBooks";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false,
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({ books: books }));
    });
  }

  changeBookShelf = (changedBook, shelf) => {
    let newList = [];

    this.state.books.filter((book) => book.id === changedBook.id).length
      ? (newList = this.state.books.map((book) =>
          book.id === changedBook.id ? changedBook : book
        ))
      : (newList = [...this.state.books, changedBook]);

    this.setState({
      books: newList,
    });

    BooksAPI.update(changedBook, shelf);
  };

  removeSearchPage = (show) => this.setState({ showSearchPage: show });

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks
            setShowSearchPage={this.removeSearchPage}
            changeShelf={this.changeBookShelf}
          />
        ) : (
          <>
            <ListBooks
              books={this.state.books}
              changeShelf={this.changeBookShelf}
            />

            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default BooksApp;
