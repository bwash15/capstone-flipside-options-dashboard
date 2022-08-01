import snapShotApi from '../../data_analysis/api/snapShots';
import { useNavigate } from 'react-router-dom';


const HandleGetSnapShots = async ({ setSnapShots }) => {
    try {
        const SnapShotResponse = await snapShotApi.get('/snapShots');
        if (SnapShotResponse && SnapShotResponse.data) setSnapShots(SnapShotResponse.data);
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


const HandleSnapShotSubmit = async ({ snapShots, setSnapShots, setSnapShotArray, setDay, setDetails, setGreeks, setLastQuote, setUnderlyingAsset, request_id, setRequestId, breakEvenPrice, setBreakEvenPrice, impliedVolatility, setImpliedVolatility, openInterest, setOpenInterest, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, daylastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap, contractType, setContractType, exerciseStyle, setExerciseStyle, expirationDate, setExpirationDate, sharesPerContract, setSharesPerContract, strikePrice, setStrikePrice, detailsTicker, setDetailsTicker, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega, ask, setAsk, bid, setBid, askSize, setAskSize, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame, status }) => {
    const navigate = useNavigate()

    const newSingleProps = {
        break_even_price: breakEvenPrice,
        implied_volatility: impliedVolatility,
        open_interest: openInterest
    }

    const newDayData = {
        change: change,
        change_percent: changePercent,
        close: close,
        high: high,
        last_updated: daylastUpdated,
        low: low,
        open: open,
        previous_close: previousClose,
        volume: volume,
        vwap: vwap
    }

    const newDetailsData = {
        contract_type: contractType,
        exercise_style: exerciseStyle,
        expiration_date: expirationDate,
        shares_per_contract: sharesPerContract,
        strike_price: strikePrice,
        ticker: detailsTicker
    }

    const newGreeksData = {
        delta: delta,
        gamma: gamma,
        theta: theta,
        vega: vega
    }

    const newLastQuoteData = {
        ask: ask,
        askSize: askSize,
        bid: bid,
        bidSize: bidSize,
        last_updated: LQlast_updated,
        midpoint: midpoint,
        timeFrame: LQtimeFrame
    }

    const newUnderlyingAssetData = {
        change_to_break_even: changeToBreakEven,
        last_updated: ULlastUpdated,
        price: price,
        ticker: ULTicker,
        timeFrame: ULtimeFrame
    }

    const newSnapShot = {
        request_id: request_id,
        results: {
            break_even_price: newSingleProps.break_even_price,
            day: newDayData,
            details: newDetailsData,
            greeks: newGreeksData,
            implied_volatility: newSingleProps.implied_volatility,
            last_quote: newLastQuoteData,
            open_interest: newSingleProps.open_interest,
            underlying_asset: newUnderlyingAssetData
        },
        status: status,
    };
    try {
        const response = await snapShotApi.post('/snapShots', newSnapShot);
        const allSnapShots = [...snapShots, response.data];
        setSnapShots(allSnapShots);
        setSnapShotArray(allSnapShots);
        setDay(newDayData);
        setDetails(newDetailsData);
        setGreeks(newGreeksData);
        setLastQuote(newLastQuoteData);
        setUnderlyingAsset(newUnderlyingAssetData)

        // Resetting State on the Form
        setRequestId('');
        setBreakEvenPrice('');
        setDay('');
        setChange('');
        setChangePercent('');
        setClose('');
        setHigh('');
        setDayLastUpdated('');
        setLow('');
        setOpen('');
        setPreviousClose('');
        setVolume('');
        setVwap('');
        setDetails('');
        setContractType('');
        setExerciseStyle('');
        setExpirationDate('');
        setSharesPerContract('');
        setStrikePrice('');
        setDetailsTicker('');
        setImpliedVolatility('');
        setGreeks('');
        setDelta('');
        setGamma('');
        setTheta('');
        setVega('');
        setOpenInterest('');
        setLastQuote('');
        setAsk('');
        setAskSize('');
        setBid('');
        setBidSize('');
        setLQlast_updated('');
        setMidpoint('');
        setLQtimeFrame('');
        setUnderlyingAsset('');
        setChangeToBreakEven('');
        setULlastUpdated('');
        setPrice('');
        setULTicker('');
        setULTimeFrame('');
        navigate('/');

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

const HandleSnapShotEdit = async ({ id,
    snapShots, setSnapShots, setSnapShotArray, setEditDay, setEditDetails, setEditGreeks, setEditLastQuote, setEditUnderlyingAsset,
    editRequest_id, setEditRequestId, editBreakEvenPrice, setEditBreakEvenPrice, editImpliedVolatility, setEditImpliedVolatility, editOpenInterest, setEditOpenInterest, editChange, setEditChange, editChangePercent, setEditChangePercent, editClose, setEditClose, editHigh, setEditHigh, editDayLastUpdated, setEditDayLastUpdated, editLow, setEditLow, editOpen, setEditOpen, editPreviousClose, setEditPreviousClose, editVolume, setEditVolume, editVwap, setEditVwap, editContractType, setEditContractType, editExerciseStyle, setEditExerciseStyle, editExpirationDate, setEditExpirationDate, editSharesPerContract, setEditSharesPerContract, editStrikePrice, setEditStrikePrice, editDetailsTicker, setEditDetailsTicker, editDelta, setEditDelta, editGamma, setEditGamma, editTheta, setEditTheta, editVega, setEditVega, editAsk, setEditAsk, editBid, setEditBid, editAskSize, setEditAskSize, editBidSize, setEditBidSize, editLQlast_updated, setEditLQlast_updated, editMidpoint, setEditMidpoint, editLQtimeFrame, setEditLQtimeFrame, editChangeToBreakEven, setEditChangeToBreakEven, editULlastUpdated, setEditULlastUpdated, editPrice, setEditPrice, editULticker, setEditULticker, editULtimeFrame, setEditULtimeFrame, editStatus, setEditStatus
}) => {
    const navigate = useNavigate()

    const updatedSnapShot = {
        request_id: editRequest_id,
        results: {
            break_even_price: editBreakEvenPrice,
            day: {
                change: editChange,
                change_percent: editChangePercent,
                close: editClose,
                high: editHigh,
                last_updated: editDayLastUpdated,
                low: editLow,
                open: editOpen,
                previous_close: editPreviousClose,
                volume: editVolume,
                vwap: editVwap
            },
            details: {
                contract_type: editContractType,
                exercise_style: editExerciseStyle,
                expiration_date: editExpirationDate,
                shares_per_contract: editSharesPerContract,
                strike_price: editStrikePrice,
                ticker: editDetailsTicker
            },
            greeks: {
                delta: editDelta,
                gamma: editGamma,
                theta: editTheta,
                vega: editVega
            },
            implied_volatility: editImpliedVolatility,
            last_quote: {
                ask: editAsk,
                askSize: editAskSize,
                bid: editBid,
                bidSize: editBidSize,
                last_updated: editLQlast_updated,
                midpoint: editMidpoint,
                timeFrame: editLQtimeFrame
            },
            open_interest: editOpenInterest,
            underlying_asset: {
                change_to_break_even: editChangeToBreakEven,
                last_updated: editULlastUpdated,
                price: editPrice,
                ticker: editULticker,
                timeFrame: editULtimeFrame
            }
        },
        status: editStatus
    };
    try {
        const editSnapShotResponse = await snapShotApi.put(`/snapShots/${id}`, updatedSnapShot);
        setSnapShots(snapShots.map(_snapShot => _snapShot.request_id === id ? { ...editSnapShotResponse.data } : snapShots));
        // Set Edits back to empty String
        setEditRequestId('');
        setEditBreakEvenPrice('');
        setEditDay('');
        setEditChange('');
        setEditChangePercent('');
        setEditClose('');
        setEditHigh('');
        setEditDayLastUpdated('');
        setEditLow('');
        setEditOpen('');
        setEditPreviousClose('');
        setEditVolume('');
        setEditVwap('');
        setEditDetails('');
        setEditContractType('');
        setEditExerciseStyle('');
        setEditExpirationDate('');
        setEditSharesPerContract('');
        setEditStrikePrice('');
        setEditDetailsTicker('');
        setEditGreeks('');
        setEditDelta('');
        setEditGamma('');
        setEditTheta('');
        setEditVega('');
        setEditImpliedVolatility('');
        setEditLastQuote('');
        setEditAsk('');
        setEditAskSize('');
        setEditBid('');
        setEditBidSize('');
        setEditLQlast_updated('');
        setEditMidpoint('');
        setEditLQtimeFrame('');
        setEditOpenInterest('');
        setEditUnderlyingAsset('');
        setEditChangeToBreakEven('');
        setEditULlastUpdated('');
        setEditPrice('');
        setEditULticker('');
        setEditULtimeFrame('');
        setEditStatus('');
        navigate('/');
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

const HandleSnapShotDelete = async ({ setSnapShots, id }) => {
    const navigate = useNavigate()
    try {
        await snapShotApi.delete(`/snapShots/${id}`);
        const SnapShotResponse = await snapShotApi.get('/snapshots');
        setSnapShots(SnapShotResponse);
        navigate('/');
    } catch (err) {
        console.log(err.message);
    }
}

export { HandleGetSnapShots, HandleSnapShotSubmit, HandleSnapShotEdit, HandleSnapShotDelete }