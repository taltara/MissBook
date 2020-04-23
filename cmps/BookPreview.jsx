const { Link } = ReactRouterDOM

export class BookPreview extends React.Component {

    state = {

        className: '',
    }

    onLoadPreview = () => {
        setTimeout(() => {

            this.setState({ className: 'show' });
        }, Math.floor(Math.random() * 75));
    }

    render() {

        const { className: className } = this.state;
        const { book, onSelectBook } = this.props;
        return (
            
                <article className={`book-preview flex column align-center space-center ${className}`} onClick={() => onSelectBook(book)}>
                    <span className="title-span flex align-center wrap">{book.title}</span>
                    <Link to={`/books/${book.title}/${book.id}`}><img src={book.thumbnail} onLoad={this.onLoadPreview} /></Link>
                    <span className="price-span flex space-between align-center"><span className="preview-desc">Price:</span>
                        <span className="flex align-center"><p className="price-amount">{book.listPrice.amount}</p>
                            <span className="preview-currency">{book.listPrice.currencyCode}</span></span></span>
                </article>
            
        )

    }
}