import bookService from '../services/bookService.js';
import { BookApiPreview } from './BookApiPreview.jsx';

export class BookAdd extends React.Component {

    constructor() {
        super();
        this.firstInput = React.createRef();
        this.defaultCover = '../assets/img/default-book.svg';
    }

    state = {
        searchRes: null,
        FilterBy: ''
    };


    componentDidMount() {
        this.firstInput.current.focus();
    }
    componentDidUpdate() {

    }

    onSelectBook = (id) => {

        let resBook = this.state.searchRes.find((res) => {
            return res.id === id;
        });
        console.log(resBook);

        let newBook = {
            id: resBook.id,
            title: resBook.volumeInfo.title,
            subtitle: (resBook.volumeInfo.subtitle) ? resBook.volumeInfo.subtitle : '',
            authors: [...resBook.volumeInfo.authors],
            publishedDate: +(resBook.volumeInfo.publishedDate).slice(0, 4),
            description: resBook.volumeInfo.description,
            pageCount: +resBook.volumeInfo.pageCount,
            categories: [...resBook.volumeInfo.categories],
            thumbnail: (resBook.volumeInfo.imageLinks) ? resBook.volumeInfo.imageLinks.thumbnail : this.defaultCover,
            listPrice: (resBook.saleInfo.amount) ? {amount: +resBook.saleInfo.listPrice.amount,
                currencyCode: resBook.saleInfo.listPrice.currencyCode, isOnSale: !(resBook.saleInfo.saleability === 'NOT_FOR-SALE')} : 
                {amount: Math.floor(Math.random() * 150 + 10), currencyCode: 'ETR', isOnSale: ((Math.floor(Math.random() * 2)) % 2) ? true : false},
            reviews: []
        };

        this.props.onNewBook(newBook);
    }


    handleChange = ({ target }) => {
        var FilterBy = target.value;
        this.setState(({ FilterBy }));
    }

    onSearch = () => {
        event.preventDefault();
        console.log(event);
        let FilterBy = event.target[0].value;

        bookService.getBookApiInfo(FilterBy)
            .then(books => {

                let searchRes = books.items;
                this.setState(({ searchRes, FilterBy }));
            });
    }

    render() {
        const { FilterBy, searchRes } = this.state;
        const { onShowSearch } = this.props;
        return (
            <React.Fragment>
                <p className="filter-title can-press" onClick={onShowSearch}>Search Google:</p>
                <section className="search-box flex column">
                    <form onSubmit={this.onSearch} className="filter-form flex align-center wrap">
                        <input type="text" name='title' value={FilterBy} onChange={this.handleChange} ref={this.firstInput} />
                        <button className="btn">Search</button>
                    </form>
                    {searchRes &&
                        <section className="results-section flex column wrap align-center space-evenly">
                            <p className="results-header">Results</p>
                            <section className="results flex wrap align-center space-evenly">
                                {
                                    searchRes.map((res) =>
                                        <BookApiPreview res={res} onSelectBook={this.onSelectBook} idx={res.id} key={res.id} />
                                    )
                                }
                            </section>
                        </section>
                    }
                </section>
            </React.Fragment>
        )
    }
};