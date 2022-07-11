import React from 'react';

/** Need to finish Defining the formatting of this form **/
/** handleSubmit, request_id, setRequestId, options, snapshots, setSnapShots, day, setDay, details, setDetails, greeks, setGreeks, last_quote, setLastQuote, underlying_asset, setUnderlyingAsset **/

const NewSnapShotCard = ({
    handleSnapShotSubmit, request_id, setRequestId, day, setDay, details, setDetails, greeks, setGreeks, last_quote, setLastQuote, underlying_asset, setUnderlyingAsset
}) => {

    return (
        <main className="NewPost">
            <h2>New SnapShot</h2>
            <form className="newPostForm" onSubmit={handleSnapShotSubmit}>
                <label htmlFor="request_id">Request ID:</label>
                <input
                    id="request_id"
                    type="text"
                    required
                    value={request_id}
                    onChange={(e) => setRequestId(e.target.value)}
                />
                <label htmlFor="day">Day:</label>
                <textarea
                    id="day"
                    required
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                />
                <label htmlFor="details">Details:</label>
                <textarea
                    id="details"
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />
                <label htmlFor="greeks">Greeks:</label>
                <textarea
                    id="greeks"
                    required
                    value={greeks}
                    onChange={(e) => setGreeks(e.target.value)}
                />
                <label htmlFor="last_quote">Last Quote:</label>
                <textarea
                    id="last_quote"
                    required
                    value={last_quote}
                    onChange={(e) => setLastQuote(e.target.value)}
                />
                <label htmlFor="underlying_asset">Underlying Asset:</label>
                <textarea
                    id="underlying_asset"
                    required
                    value={underlying_asset}
                    onChange={(e) => setUnderlyingAsset(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewSnapShotCard