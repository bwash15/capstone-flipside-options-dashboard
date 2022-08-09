import { createContext, useState } from "react";
import { HandleGetLastQuote, HandleLastQuoteSubmit, HandleLastQuoteEdit, HandleLastQuoteDelete } from "../../analysisControllers/lastQuoteController";
import { useNavigate } from 'react-router-dom';

const LastQuoteContext = createContext({});

export const LastQuoteProvider = ({ children }) => {
    const navigate = useNavigate()

    const [ask, setAsk] = useState([]);
    const [askSize, setAskSize] = useState([]);
    const [bid, setBid] = useState([]);
    const [bidSize, setBidSize] = useState([]);
    const [LQlast_updated, setLQlast_updated] = useState([]);
    const [midpoint, setMidpoint] = useState([]);
    const [LQtimeFrame, setLQtimeFrame] = useState([]);

    const [lastQuote, setLastQuote] = useState([{
        ask: ask,
        ask_size: askSize,
        bid: bid,
        bid_size: bidSize,
        last_updated: LQlast_updated,
        midpoint: midpoint,
        timeFrame: LQtimeFrame
    }]);
    const [editAsk, setEditAsk] = useState([]);
    const [editAskSize, setEditAskSize] = useState([]);
    const [editBid, setEditBid] = useState([]);
    const [editBidSize, setEditBidSize] = useState([]);
    const [editLQlast_updated, setEditLQlast_updated] = useState([]);
    const [editMidpoint, setEditMidpoint] = useState([]);
    const [editLQtimeFrame, setEditLQtimeFrame] = useState([]);

    const _handleGetLastQuote = async (e) => {
        e.preventDefault();
        await HandleGetLastQuote({ setLastQuote });
        navigate('/');
    }
    const _handleLastQuoteSubmit = async (e) => {
        e.preventDefault();
        await HandleLastQuoteSubmit({ lastQuote, setLastQuote, ask, setAsk, bid, setBid, askSize, setAskSize, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame });
        navigate('/');
    }
    const _handleLastQuoteEdit = async (e, id) => {
        e.preventDefault();
        await HandleLastQuoteEdit({ id, lastQuote, setLastQuote, editAsk, setEditAsk, editBid, setEditBid, editAskSize, setEditAskSize, editBidSize, setEditBidSize, editLQlast_updated, setEditLQlast_updated, editMidpoint, setEditMidpoint, editLQtimeFrame, setEditLQtimeFrame });
        navigate('/');
    }
    const _handleLastQuoteDelete = async (e, id) => {
        e.preventDefault();
        await HandleLastQuoteDelete({ id, setLastQuote });
        navigate('/');
    }

    return (
        <LastQuoteContext.Provider value={{ _handleGetLastQuote, _handleLastQuoteSubmit, _handleLastQuoteEdit, _handleLastQuoteDelete, lastQuote, setLastQuote, ask, setAsk, askSize, setAskSize, bid, setBid, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame, editAsk, setEditAsk, editBid, setEditBid, editAskSize, setEditAskSize, editBidSize, setEditBidSize, editLQlast_updated, setEditLQlast_updated, editMidpoint, setEditMidpoint, editLQtimeFrame, setEditLQtimeFrame }}>
            {children}
        </LastQuoteContext.Provider>
    )

}
export { LastQuoteContext };
