import Feed from './Feed';

/** 30:27 custom hooks */

const QuoteBoard = ({ quotes, fetchError, isLoading }) => {
    return (
        <main className="Home">
            {isLoading && <p className="statusMsg">Loading quotes...</p>}
            {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && (quotes.length ? <Feed quotes={quotes} /> : <p className="statusMsg">No quotes to display.</p>)}
        </main>
    )
}

export default QuoteBoard