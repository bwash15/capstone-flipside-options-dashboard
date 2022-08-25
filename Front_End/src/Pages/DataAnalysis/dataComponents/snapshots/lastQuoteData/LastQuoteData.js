import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HandleGetLastQuote, HandleLastQuoteSubmit, HandleLastQuoteEdit, HandleLastQuoteDelete } from "../../../analysisControllers/lastQuoteController";
import LQSelectForm from '../../../pageComponents/LQDataForm/LQSelectForm';
import HoldLQDataDisplay from '../../../pageComponents/LQDataForm/HoldLQDataDisplay';

export default function LastQuoteData({ snapShot, last_quote, setLastQuote, lastQuoteArray, setLastQuoteArray }) {
    const navigate = useNavigate()

    const [ask, setAsk] = useState([]);
    const [ask_size, setAskSize] = useState([]);
    const [bid, setBid] = useState([]);
    const [bid_size, setBidSize] = useState([]);
    const [last_updated, setLQlast_updated] = useState([]);
    const [midpoint, setMidpoint] = useState([]);
    const [timeframe, setLQtimeFrame] = useState([]);

    const [hold_1, setHold1] = useState({});
    const [hold_2, setHold2] = useState({});
    const [hold_3, setHold3] = useState({});

    useEffect(() => {
        setAsk(snapShot.results.last_quote.ask);
        setAskSize(snapShot.results.last_quote.ask_size);
        setBid(snapShot.results.last_quote.bid);
        setBidSize(snapShot.results.last_quote.bid_size);
        setLQlast_updated(snapShot.results.last_quote.last_updated);
        setMidpoint(snapShot.results.last_quote.midpoint);
        setLQtimeFrame(snapShot.results.last_quote.timeframe);
        console.log(`${ask}\n${ask_size}\n${bid}\n${bid_size}\n${last_updated}\n${midpoint}\n${timeframe}`);
    }, [snapShot])


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
                {last_quote.length ? (
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
                ) : (
                    <p style={{ marginTop: "2rem" }}>
                        No Day Data to display
                    </p>
                )}
                <button type='submit' onClick={_handleLastQuotehold}>Hold Data</button>
            </section>
            <HoldLQDataDisplay
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
            <HoldLQDataDisplay
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
            <HoldLQDataDisplay
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
