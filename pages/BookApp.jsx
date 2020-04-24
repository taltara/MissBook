import bookService from '../services/bookService.js'
import storageService from '../services/storageService.js'
import BookFilter from '../cmps/BookFilter.jsx'
import { BookAdd}  from '../cmps/BookAdd.jsx'
import { BookList } from '../cmps/BookList.jsx';
import { eventBus } from "../services/eventBusService.js";

export class BookApp extends React.Component {

    state = {
        books: null,
        filterBy: null,
        showFilter: false,
        showSearch: false,
    }

    componentDidMount() {
        this.loadBooks();
        storageService.store('currSearch', null);
    }

    loadBooks() {
        bookService.query(this.state.filterBy)
            .then(books => {
                this.setState({ books });
            });
    }

    onNewBook = (book) => {

        console.log(book);
        bookService.add(book);
        this.loadBooks();
        eventBus.emit('show-msg', {txt: `'${book.title}'`, url: `/#/books/${book.name}/${book.id}`});
    }

    onSaveBook = (book) => {
        bookService.save(book)
        this.setState({ bookIdToEdit: null })
        this.loadBooks()
    }
    onSelectBook = (selectedBook) => {
        this.setState({ selectedBook })
    }

    onSetFilter = (filterBy) => {
        console.log(filterBy);
        this.setState({ filterBy: filterBy }, () => this.loadBooks());
    }

    onShowFilter = () => { this.setState(({showFilter}) => ({ showFilter: !showFilter })) }
    onShowSearch = () => { this.setState(({showSearch}) => ({ showSearch: !showSearch })) }


    render() {
        const { books, showFilter, showSearch } = this.state
        return (
            <main className="books-app flex column container">
                <p className="collection-header">Collection</p>
                <section className="main-section flex column">
                
                    {!showSearch &&
                        <p className="filter-title can-press" onClick={this.onShowSearch}>Click To Search</p>}
                    {showSearch && <BookAdd onNewBook={this.onNewBook} onShowSearch={this.onShowSearch}/>}
                    {!showFilter && 
                        <p className="filter-title can-press" onClick={this.onShowFilter}>Click To Filter</p>}
                    {showFilter && <BookFilter onSetFilter={this.onSetFilter} onShowFilter={this.onShowFilter} />}
                    {books &&
                        <BookList onSelectBook={this.onSelectBook} books={books} loadBooks={this.loadBooks}/>}
                </section>

            </main>
        )
    }
}