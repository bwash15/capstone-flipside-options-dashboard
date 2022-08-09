import { useParams } from 'react';
import { useDayData } from '../../analysisHooks/useAnalysisProviders/useDayProvider';

/** Need to finish Defining the formatting of this form **/
/** handleSubmit, request_id, setRequestId, options, snapshots, setSnapShots, day, setDay, details, setDetails, greeks, setGreeks, last_quote, setLastQuote, underlying_asset, setUnderlyingAsset **/

const NewSnapShotCard = ({
    handleSnapShotSubmit, request_id, setRequestId, details, setDetails, greeks, setGreeks, last_quote, setLastQuote, underlying_asset, setUnderlyingAsset, snapShots
}) => {
    const { day, setDay } = useDayData();
    // Search and SearchResults
    // Create one for each of the Dataobjects we will be searching through
    const { id } = useParams();
    const snapShot = snapShots.find(snapShot => (snapShot.request_id).toString() === id);


    return (
        <main className="NewPost">
            <h2>View SnapShot</h2>
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
                    value={JSON.stringify(day)}
                    onChange={(e) => setDay(e.target.value)}
                />
                <label htmlFor="details">Details:</label>
                <textarea
                    id="details"
                    required
                    value={JSON.stringify(details)}
                    onChange={(e) => setDetails(e.target.value)}
                />
                <label htmlFor="greeks">Greeks:</label>
                <textarea
                    id="greeks"
                    required
                    value={JSON.stringify(greeks)}
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