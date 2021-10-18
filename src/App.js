import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBooks from "./components/SearchBooks";
import ListBooks from "./components/ListBooks";

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

  removeSearchPage = (show) => this.setState({ showSearchPage: show });

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks setShowSearchPage={this.removeSearchPage} />
        ) : (
          <>
            <ListBooks />

            <ol>
              {this.state.books.map((book) => (
                <li key={book.id}>
                  <h2>{book.shelf}</h2>
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail}`,
                    }}
                  />
                  {book.title}
                  <p>{book.description}</p>
                </li>
              ))}
            </ol>

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
