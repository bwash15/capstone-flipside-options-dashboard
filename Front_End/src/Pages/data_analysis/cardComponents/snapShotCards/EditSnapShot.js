import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import snapShot from '../../api/snapShots';

const EditSnapShot = ({
    snapShots, handleSnapShotEdit, editRequest_id, setEditRequest_id, editBreakEvenPrice, setEditBreakEvenPrice, editImpliedVolatility, setEditImpliedVolatility, editOpenInterest, setEditOpenInterest, editChange, setEditChange,
    editChangePercent, setEditChangePercent, editClose, setEditClose, editHigh, setEditHigh, editDayLastUpdated, setEditDayLastUpdated, editLow, setEditLow, editOpen, setEditOpen, editPreviousclose, setEditPreviousClose, editVolume, setEditVolume, editVwap, setEditVwap, editContractType, setEditContractType, editExerciseStyle, setEditExerciseStyle, editExpirationDate, setEditExpirationDate, editSharesPerContract, setEditSharesPerContract, editStrikePrice, setEditStrikePrice, editDetailsTicker, setEditDetailsTicker, editDelta, setEditDelta, editGamma, setEditGamma, editTheta, setEditTheta, editVega, setEditVega, editAsk, setEditAsk, editAskSize, setEditAskSize, editBid, setEditBid, editBidSize, setEditBidSize, editLQlastUpdated, setEditLQlastUpdated, editMidpoint, setEditMidpoint, editLQTimeFrame, setEditLQTimeFrame, editChangeToBreakeven, setEditChangeToBreakEven, editULlastUpdated, setEditULlastUpdated, editPrice, setEditPrice, editULTicker, setEditULTicker, editULTimeFrame, setEditULTimeFrame, editStatus, setEditStatus,
    editssLastEdited, setEditSSlastEdited

}) => {
    const { id } = useParams();
    const snapShot = snapShots.find(snapShot => (snapShot.request_id).toString() === id);

    useEffect(() => {
        if (snapShot) {
            setEditRequest_id(snapShot.request_id);
            setEditBreakEvenPrice(snapShot.break_even_price);
            setEditImpliedVolatility(snapShot.implied_volatility);
            setEditOpenInterest(snapShot.Open_interest);
            setEditChange(snapShot.results.day.Change);
            setEditChangePercent(snapShot.results.day.Change_percent);
            setEditClose(snapShot.results.day.Close);
            setEditHigh(snapShot.results.day.High);
            setEditDayLastUpdated(snapShot.results.day.last_updated);
            setEditLow(snapShot.results.day.Low);
            setEditOpen(snapShot.results.day.Open);
            setEditPreviousClose(snapShot.results.day.previous_close)
            setEditVolume(snapShot.results.day.volume);
            setEditVwap(snapShot.results.day.vwap);
            setEditContractType(snapShot.results.details.contract_type);
            setEditExerciseStyle(snapShot.results.details.excersize_style);
            setEditExpirationDate(snapShot.results.details.expiration_date);
            setEditSharesPerContract(snapShot.results.details.shares_per_contract);
            setEditStrikePrice(snapShot.results.details.strike_price);
            setEditDetailsTicker(snapShot.results.details.ticker);
            setEditDelta(snapShot.results.greeks.delta);
            setEditGamma(snapShot.results.greeks.gamma);
            setEditTheta(snapShot.results.greeks.theta);
            setEditVega(snapShot.results.greeks.vega);
            setEditAsk(snapShot.results.last_quote.ask);
            setEditAskSize(snapShot.results.last_quote.ask_size);
            setEditBid(snapShot.results.last_quote.bid);
            setEditBidSize(snapShot.results.last_quote.bid_size);
            setEditLQlastUpdated(snapShot.results.last_quote.last_updated);
            setEditMidpoint(snapShot.results.last_quote.midpoint);
            setEditLQTimeFrame(snapShot.results.last_quote.timeFrame);
            setEditChangeToBreakEven(snapShot.results.underlying_asset.change_to_break_even);
            setEditULlastUpdated(snapShot.results.underlying_asset.last_updated);
            setEditPrice(snapShot.results.underlying_asset.price);
            setEditULTicker(snapShot.results.underlying_asset.ticker);
            setEditULTimeFrame(snapShot.results.underlying_asset.timeFame);
            setEditStatus(snapShot.status);
            setEditSSlastEdited(snapShot.ssLastEdited);

        }
    }, [snapShot, setEditRequest_id, setEditBreakEvenPrice, setEditImpliedVolatility, setEditOpenInterest, setEditChange, setEditChangePercent, setEditClose, setEditHigh, setEditDayLastUpdated, setEditLow, setEditOpen, setEditPreviousClose, setEditVolume, setEditVwap, setEditContractType, setEditExerciseStyle, setEditExpirationDate, setEditSharesPerContract, setEditStrikePrice, setEditDetailsTicker, setEditDelta, setEditGamma, setEditTheta, setEditVega, setEditAsk, setEditAskSize, setEditBid, setEditBidSize, setEditLQlastUpdated, setEditMidpoint, setEditLQTimeFrame, setEditChangeToBreakEven, setEditULlastUpdated, setEditPrice, setEditULTicker, setEditULTimeFrame, setEditStatus, setEditSSlastEdited])

    return (

        <main className='NewPost'>
            {editRequest_id &&
                <>
                    <h2>Edit The Selected SnapShot...</h2>
                    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor='request_id'>Request ID:</label>
                        <input
                            id="request_id"
                            type="text"
                            required
                            value={editRequest_id}
                            onChange={(e) => setEditRequest_id(e.target.value)}
                        />
                        <label htmlFor='ssLastEdited'>SnapShot Last Edited:</label>
                        <input
                            id="ssLastEdited"
                            type="text"
                            required
                            value={editssLastEdited}
                            onChange={(e) => setEditSSlastEdited(e.target.value)}
                        />
                        <label htmlFor='breakEvenPrice'>Break Even Price:</label>
                        <input
                            id="breakEvenPrice"
                            type="text"
                            required
                            value={editBreakEvenPrice}
                            onChange={(e) => setEditBreakEvenPrice(e.target.value)}
                        />
                        <label htmlFor='dayChange'>Day Change:</label>
                        <input
                            id="dayChange"
                            type="text"
                            required
                            value={editChange}
                            onChange={(e) => setEditChange(e.target.value)}
                        />
                        <label htmlFor='dayChangePercent'>Day Change Percent:</label>
                        <input
                            id="dayChangePercent"
                            type="text"
                            required
                            value={editChangePercent}
                            onChange={(e) => setEditChangePercent(e.target.value)}
                        />
                        <label htmlFor='dayClose'>Day Close:</label>
                        <input
                            id="dayClose"
                            type="text"
                            required
                            value={editClose}
                            onChange={(e) => setEditClose(e.target.value)}
                        />
                        <label htmlFor='dayHigh'>Day High:</label>
                        <input
                            id="dayHigh"
                            type="text"
                            required
                            value={editHigh}
                            onChange={(e) => setEditHigh(e.target.value)}
                        />
                        <label htmlFor='dayLastUpdated'>Day Last Updated:</label>
                        <input
                            id="dayLastUpdated"
                            type="text"
                            required
                            value={editDayLastUpdated}
                            onChange={(e) => setEditDayLastUpdated(e.target.value)}
                        />
                        <label htmlFor='dayLow'>Day Low:</label>
                        <input
                            id="dayLow"
                            type="text"
                            required
                            value={editLow}
                            onChange={(e) => setEditLow(e.target.value)}
                        />
                        <label htmlFor='dayOpen'>Day Open:</label>
                        <input
                            id="dayOpen"
                            type="text"
                            required
                            value={editOpen}
                            onChange={(e) => setEditOpen(e.target.value)}
                        />
                        <label htmlFor='dayPreviousClose'>Day Previous Close:</label>
                        <input
                            id="dayPreviousClose"
                            type="text"
                            required
                            value={editPreviousclose}
                            onChange={(e) => setEditPreviousClose(e.target.value)}
                        />
                        <label htmlFor='dayVolume'>Day Volume:</label>
                        <input
                            id="dayVolume"
                            type="text"
                            required
                            value={editVolume}
                            onChange={(e) => setEditVolume(e.target.value)}
                        />
                        <label htmlFor='dayVwap'>Day VWAP:</label>
                        <input
                            id="dayVwap"
                            type="text"
                            required
                            value={editVwap}
                            onChange={(e) => setEditVwap(e.target.value)}
                        />
                        <label htmlFor='detailsContractType'>Details Contract Type:</label>
                        <input
                            id="detailsContractType"
                            type="text"
                            required
                            value={editContractType}
                            onChange={(e) => setEditContractType(e.target.value)}
                        />
                        <label htmlFor='detailsExerciseStyle'>Details Exercise Stylte:</label>
                        <input
                            id="detailsExerciseStyle"
                            type="text"
                            required
                            value={editExerciseStyle}
                            onChange={(e) => setEditExerciseStyle(e.target.value)}
                        />
                        <label htmlFor='detailsExpirationDate'>Details Expiration Date:</label>
                        <input
                            id="detailsExpirationDate"
                            type="text"
                            required
                            value={editExpirationDate}
                            onChange={(e) => setEditExpirationDate(e.target.value)}
                        />
                        <label htmlFor='detailsSharesPerContract'>Details Shares Per Contract:</label>
                        <input
                            id="detailsSharesPerContract"
                            type="text"
                            required
                            value={editSharesPerContract}
                            onChange={(e) => setEditSharesPerContract(e.target.value)}
                        />
                        <label htmlFor='detailsStrikePrice'>Details Strike Price:</label>
                        <input
                            id="detailsStrikePrice"
                            type="text"
                            required
                            value={editStrikePrice}
                            onChange={(e) => setEditStrikePrice(e.target.value)}
                        />
                        <label htmlFor='detailsTicker'>Details Ticker:</label>
                        <input
                            id="detailsTicker"
                            type="text"
                            required
                            value={editDetailsTicker}
                            onChange={(e) => setEditDetailsTicker(e.target.value)}
                        />

                        <label htmlFor='impliedVolatility'>Implied Volatility:</label>
                        <input
                            id="impliedVolatility"
                            type="text"
                            required
                            value={editImpliedVolatility}
                            onChange={(e) => setEditImpliedVolatility(e.target.value)}
                        />
                        <label htmlFor='greeksDelta'>Greeks Delta:</label>
                        <input
                            id="greeksDelta"
                            type="text"
                            required
                            value={editDelta}
                            onChange={(e) => setEditDelta(e.target.value)}
                        />
                        <label htmlFor='greeksGamma'>Greeks Gamma:</label>
                        <input
                            id="greeksGamma"
                            type="text"
                            required
                            value={editGamma}
                            onChange={(e) => setEditGamma(e.target.value)}
                        />
                        <label htmlFor='greeksTheta'>Greeks Theta:</label>
                        <input
                            id="greeksTheta"
                            type="text"
                            required
                            value={editTheta}
                            onChange={(e) => setEditTheta(e.target.value)}
                        />
                        <label htmlFor='greeksVega'>Greeks Vega:</label>
                        <input
                            id="greeksVega"
                            type="text"
                            required
                            value={editVega}
                            onChange={(e) => setEditVega(e.target.value)}
                        />
                        <label htmlFor='OpenInterest'>Open Interest:</label>
                        <input
                            id="OpenInterest"
                            type="text"
                            required
                            value={editOpenInterest}
                            onChange={(e) => setEditOpenInterest(e.target.value)}
                        />
                        <label htmlFor='lastQuoteAsk'>Last Quote Ask:</label>
                        <input
                            id="lastQuoteAsk"
                            type="text"
                            required
                            value={editAsk}
                            onChange={(e) => setEditAsk(e.target.value)}
                        />
                        <label htmlFor='lastQuoteAskSize'>Last Quote Ask Size:</label>
                        <input
                            id="lastQuoteAskSize"
                            type="text"
                            required
                            value={editAskSize}
                            onChange={(e) => setEditAskSize(e.target.value)}
                        />
                        <label htmlFor='lastQuoteBid'>Last Quote Bid:</label>
                        <input
                            id="lastQuoteBid"
                            type="text"
                            required
                            value={editBid}
                            onChange={(e) => setEditBid(e.target.value)}
                        />
                        <label htmlFor='lastQuoteBidSize'>Last Quote Bid Size:</label>
                        <input
                            id="lastQuoteBidSize"
                            type="text"
                            required
                            value={editBidSize}
                            onChange={(e) => setEditBidSize(e.target.value)}
                        />
                        <label htmlFor='lastQuoteLastUpdated'>Last Quote Last Updated:</label>
                        <input
                            id="lastQuoteLastUpdated"
                            type="text"
                            required
                            value={editLQlastUpdated}
                            onChange={(e) => setEditLQlastUpdated(e.target.value)}
                        />
                        <label htmlFor='lastQuoteMidpoint'>Last Quote Midpoint:</label>
                        <input
                            id="lastQuoteMidpoint"
                            type="text"
                            required
                            value={editMidpoint}
                            onChange={(e) => setEditMidpoint(e.target.value)}
                        />
                        <label htmlFor='LastQuoteTimeFrame'>Last Quote TimeFrame:</label>
                        <input
                            id="lastQuoteTimeFrame"
                            type="text"
                            required
                            value={editLQTimeFrame}
                            onChange={(e) => setEditLQTimeFrame(e.target.value)}
                        />
                        <label htmlFor='ULChangeToBreakEven'>Underlying Asset Change To Break Even:</label>
                        <input
                            id="ULChangeToBreakEven"
                            type="text"
                            required
                            value={editChangeToBreakeven}
                            onChange={(e) => setEditChangeToBreakEven(e.target.value)}
                        />
                        <label htmlFor='ULlastUpdated'>Underlying Asset Last Updated:</label>
                        <input
                            id="ULlastUpdated"
                            type="text"
                            required
                            value={editULlastUpdated}
                            onChange={(e) => setEditULlastUpdated(e.target.value)}
                        />
                        <label htmlFor='ULPrice'>Underlying Asset Price:</label>
                        <input
                            id="ULPrice"
                            type="text"
                            required
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                        />
                        <label htmlFor='ULTicker'>Underlying Asset Ticker:</label>
                        <input
                            id="ULTicker"
                            type="text"
                            required
                            value={editULTicker}
                            onChange={(e) => setEditULTicker(e.target.value)}
                        />
                        <label htmlFor='ULTimeFrame'>Underlying Asset Time Frame:</label>
                        <input
                            id="ULTimeFrame"
                            type="text"
                            required
                            value={editULTimeFrame}
                            onChange={(e) => setEditULTimeFrame(e.target.value)}
                        />
                        <label htmlFor='status'>Status:</label>
                        <input
                            id="status"
                            type="text"
                            required
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleSnapShotEdit(snapShot.request_id)}>Submit</button>
                    </form>
                </>
            }
            {!editRequest_id &&
                <>
                    <h2>SnapShots not found</h2>
                    <p>
                        <Link to='/'>Back to Home Page...</Link>
                    </p>
                </>

            }
        </main>
    )
}

export default EditSnapShot