import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HandleGetLastQuote, HandleLastQuoteSubmit, HandleLastQuoteEdit, HandleLastQuoteDelete } from "../../../analysisControllers/lastQuoteController";
import LQSelectForm from '../../../pageComponents/LQDataForm/LQSelectForm';

export default function LastQuoteData({ last_quote, setLastQuote, lastQuoteArray, setLastQuoteArray }) {
    const navigate = useNavigate()

    const [ask, setAsk] = useState([]);
    const [ask_size, setAskSize] = useState([]);
    const [bid, setBid] = useState([]);
    const [bid_size, setBidSize] = useState([]);
    const [last_updated, setLQlast_updated] = useState([]);
    const [midpoint, setMidpoint] = useState([]);
    const [timeframe, setLQtimeFrame] = useState([]);

    useEffect(() => {
        setAsk(last_quote.ask);
        setAskSize(last_quote.ask_size);
        setBid(last_quote.bid);
        setBidSize(last_quote.bid_size);
        setLQlast_updated(last_quote.last_updated);
        setMidpoint(last_quote.midpoint);
        setLQtimeFrame(last_quote.timeframe);
        console.log(`${ask}\n${ask_size}\n${bid}\n${bid_size}\n${last_updated}\n${midpoint}\n${timeframe}`);
    }, [last_quote])


    const _handleGetLastQuote = async (e) => {
        e.preventDefault();
        await HandleGetLastQuote({ setLastQuote });
        navigate('/');
    }
    const _handleLastQuotehold = async (e) => {
        e.preventDefault();
        await HandleLastQuoteSubmit({ lastQuoteArray, setLastQuoteArray, setLastQuote, ask, setAsk, bid, setBid, ask_size, setAskSize, bid_size, setBidSize, last_updated, setLQlast_updated, midpoint, setMidpoint, timeframe, setLQtimeFrame });
        navigate('/');
    }

    return (
        <article className='lastQuoteDataGrid'>
            <section>
                <LQSelectForm
                    _handleLastQuotehold={_handleLastQuotehold}
                    title={"LQ Data"}
                    ask={ask}
                    setAsk={setAsk}
                    ask_size={ask_size}
                    setAskSize={setAskSize}
                    bid={bid}
                    setBid={setBid}
                    bid_size={bid_size}
                    setBidSize={setBidSize}
                    last_updated={last_updated}
                    setLQlast_updated={setLQlast_updated}
                    midpoint={midpoint}
                    setMidpoint={setMidpoint}
                    timeframe={timeframe}
                    setLQtimeFrame={setLQlast_updated}
                />
                <button type='submit' onClick={_handleLastQuotehold}>Compare Data</button>
            </section>
            <LQSelectForm
                _handleLastQuotehold={_handleLastQuotehold}
                title={"Hold 1"}
                ask={ask}
                setAsk={setAsk}
                ask_size={ask_size}
                setAskSize={setAskSize}
                bid={bid}
                setBid={setBid}
                bid_size={bid_size}
                setBidSize={setBidSize}
                last_updated={last_updated}
                setLQlast_updated={setLQlast_updated}
                midpoint={midpoint}
                setMidpoint={setMidpoint}
                timeframe={timeframe}
                setLQtimeFrame={setLQlast_updated}
            />
            <LQSelectForm
                _handleLastQuotehold={_handleLastQuotehold}
                title={"Hold 2"}
                ask={ask}
                setAsk={setAsk}
                ask_size={ask_size}
                setAskSize={setAskSize}
                bid={bid}
                setBid={setBid}
                bid_size={bid_size}
                setBidSize={setBidSize}
                last_updated={last_updated}
                setLQlast_updated={setLQlast_updated}
                midpoint={midpoint}
                setMidpoint={setMidpoint}
                timeframe={timeframe}
                setLQtimeFrame={setLQlast_updated}
            />
            <LQSelectForm
                _handleLastQuotehold={_handleLastQuotehold}
                title={"Hold 3"}
                ask={ask}
                setAsk={setAsk}
                ask_size={ask_size}
                setAskSize={setAskSize}
                bid={bid}
                setBid={setBid}
                bid_size={bid_size}
                setBidSize={setBidSize}
                last_updated={last_updated}
                setLQlast_updated={setLQlast_updated}
                midpoint={midpoint}
                setMidpoint={setMidpoint}
                timeframe={timeframe}
                setLQtimeFrame={setLQlast_updated}
            />

        </article>
    )
}
