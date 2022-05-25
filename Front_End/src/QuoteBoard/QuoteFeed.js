import Quote from './Quote';

const QuoteFeed = ({ quotes }) => {
    return (
        <>
            {quotes.map(quote => (
                <Quote key={quote.id} quote={quote} />
            ))}
        </>
    )
}

export default QuoteFeed