import { last_quoteApi } from '../api/analysis_axios';
import { useNavigate } from 'react-router-dom';

const HandleGetLastQuote = async ({ setLastQuote }) => {
    try {
        const LastQuoteResponse = await last_quoteApi.get('/last_quote');
        if (LastQuoteResponse && LastQuoteResponse.data) setLastQuote(LastQuoteResponse.data);
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);

        } else {
            console.log(`Error: ${err.message}`);
        }
    }
}

const HandleLastQuoteSubmit = async ({ lastQuoteArray, setLastQuoteArray, setLastQuote, ask, setAsk, bid, setBid, ask_size, setAskSize, bid_size, setBidSize, last_updated, setLQlast_updated, midpoint, setMidpoint, timeframe, setLQtimeFrame }) => {

    const newLastQuote = {
        ask: ask,
        ask_size: ask_size,
        bid: bid,
        bid_size: bid_size,
        last_updated: last_updated,
        midpoint: midpoint,
        timeFrame: timeframe
    };

    try {
        const response = await last_quoteApi.post('/last_quote', newLastQuote);
        const allLastQuote = [...lastQuoteArray, response.data];
        setLastQuoteArray(allLastQuote);

        setAsk('');
        setAskSize('');
        setBid('');
        setBidSize('');
        setLQlast_updated('');
        setMidpoint('');
        setLQtimeFrame('');

    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else {
            console.log(`Error: ${err.message}`);
        }
    }
}

const HandleLastQuoteEdit = async ({ id, lastQuote, setLastQuote, editAsk, setEditAsk, editBid, setEditBid, editAskSize, setEditAskSize, editBidSize, setEditBidSize, editLQlast_updated, setEditLQlast_updated, editMidpoint, setEditMidpoint, editLQtimeFrame, setEditLQtimeFrame }) => {

    const newLastQuote = {
        ask: editAsk,
        askSize: editAskSize,
        bid: editBid,
        bidSize: editBidSize,
        last_updated: editLQlast_updated,
        midpoint: editMidpoint,
        timeFrame: editLQtimeFrame
    };
    try {
        const editLastQuoteResponse = await last_quoteApi.put(`/last_quote/${id}`, newLastQuote);
        setLastQuote(lastQuote.map(_last_quote => _last_quote.id === id ? { ...editLastQuoteResponse.data } : lastQuote));
        setEditAsk('');
        setEditAskSize('');
        setEditBid('');
        setEditBidSize('');
        setEditLQlast_updated('');
        setEditMidpoint('');
        setEditLQtimeFrame('');

    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else {
            console.log(`Error: ${err.message}`);
        }
    }
}

const HandleLastQuoteDelete = async (id, lastQuote, setLastQuote) => {
    const navigate = useNavigate()
    try {
        await last_quoteApi.delete(`/last_quote/${id}`);
        const postList = lastQuote.filter(_last_quote => _last_quote.id !== id);
        setLastQuote(postList);
        navigate('/');
    } catch (err) {
        console.log(err.message);
    }
}

export { HandleGetLastQuote, HandleLastQuoteSubmit, HandleLastQuoteEdit, HandleLastQuoteDelete }