import postsApi from '../api/posts';
import snapShotApi from '../data_analysis/api/snapShots';
import usersApi from '../data_analysis/api/users';
import dayAxios from '../data_analysis/api/day';
import detailsApi from '../data_analysis/api/details';
import greeksApi from '../data_analysis/api/greeks';
import lastQuoteApi from '../data_analysis/api/last_quote';
import underlyingAssetApi from '../data_analysis/api/underlying_asset';



const fetchData = async ({ setPosts, setSnapShots, setDay, setDetails, setGreeks, setLastQuote, setUnderlyingAsset }) => {
    try {
        // Data is in the response.data
        pullSetPosts({ setPosts });
        pullSetDay({ setDay });
        pullSetDetails({ setDetails });
        pullSetGreeks({ setGreeks });
        pullSetLastQuotes({ setLastQuote });
        pullSetUnderlyingAssets({ setUnderlyingAsset });

        const SnapShotResponse = await snapShotApi.get('/snapShots');
        if (SnapShotResponse && SnapShotResponse.data) setSnapShots(SnapShotResponse.data);
        sessionStorage.setItem("snapShots", JSON.stringify(SnapShotResponse.data));

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

const pullSetPosts = async ({ setPosts }) => {
    const postResponse = await postsApi.get('/posts');
    if (postResponse && postResponse.data) setPosts(postResponse.data);
    sessionStorage.setItem("posts", JSON.stringify(postResponse.data));
}

const pullSetDay = async ({ setDay }) => {
    const DayResponse = await dayAxios.get('/day');
    if (DayResponse && DayResponse.data) setDay(DayResponse.data);
    sessionStorage.setItem("day", JSON.stringify(DayResponse.data));
}

const pullSetDetails = async ({ setDetails }) => {
    const DetailsResponse = await detailsApi.get('/details');
    if (DetailsResponse && DetailsResponse.data) setDetails(DetailsResponse.data);
    sessionStorage.setItem("details", JSON.stringify(DetailsResponse.data));
}

const pullSetGreeks = async ({ setGreeks }) => {
    const GreeksResponse = await greeksApi.get('/greeks');
    if (GreeksResponse && GreeksResponse.data) setGreeks(GreeksResponse.data);
    sessionStorage.setItem("greeks", JSON.stringify(GreeksResponse.data));
}

const pullSetLastQuotes = async ({ setLastQuote }) => {
    const LastQuoteResponse = await lastQuoteApi.get('/last_quote');
    if (LastQuoteResponse && LastQuoteResponse.data) setLastQuote(LastQuoteResponse.data);
    sessionStorage.setItem("last_quote", JSON.stringify(LastQuoteResponse.data));
}
const pullSetUnderlyingAssets = async ({ setUnderlyingAsset }) => {
    const UnderlyingAssetResponse = await underlyingAssetApi.get('/underlying_asset');
    if (UnderlyingAssetResponse && UnderlyingAssetResponse.data) setUnderlyingAsset(UnderlyingAssetResponse.data);
    sessionStorage.setItem("underlying_asset", JSON.stringify(UnderlyingAssetResponse.data));
}

export { fetchData };