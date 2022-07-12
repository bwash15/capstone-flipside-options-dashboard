import postsApi from '../Pages/data_analysis/api/posts';
import snapShotApi from '../Pages/data_analysis/api/snapShots';
import usersApi from '../Pages/data_analysis/api/users';
import dayAxios from '../Pages/data_analysis/api/day';
import detailsApi from '../Pages/data_analysis/api/details';
import greeksApi from '../Pages/data_analysis/api/greeks';
import lastQuoteApi from '../Pages/data_analysis/api/last_quote';
import underlyingAssetApi from '../Pages/data_analysis/api/underlying_asset';



const FetchData = async ({ options, setOptions, setPosts, setSnapShots, setDay, setDetails, setGreeks, setLastQuote, setUnderlyingAsset, setSnapShotArray }) => {

    const optionsAPI = 'https://api.polygon.io/v3/snapshot/options/AAPL/O:AAPL230616C00150000?apiKey=MNExhabeDDgHYLqKlxDoT79JUdvT_OaI'

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

    const handleAPIpull = async ({ optionsAPI, setOptions
    }) => {
        const response = await fetch(optionsAPI);
        const JsonOptionsData = await response.json();
        let optionResultsKeys = Object.keys(JsonOptionsData.results);
        let optionKeys = Object.keys(JsonOptionsData);
        setOptions([...options, JsonOptionsData.data])

        sessionStorage.setItem("snapShotAPIpull", JSON.stringify(JsonOptionsData));
        sessionStorage.setItem("newOptionsArray", JSON.stringify(options));
        sessionStorage.setItem("option_results_keys", JSON.stringify(optionResultsKeys));
        sessionStorage.setItem("option_keys", JSON.stringify(optionKeys));
        sessionStorage.setItem("option_data", JSON.stringify(JsonOptionsData.data));

    }
    try {
        // Data is in the response.data
        pullSetPosts({ setPosts });
        pullSetDay({ setDay });
        pullSetDetails({ setDetails });
        pullSetGreeks({ setGreeks });
        pullSetLastQuotes({ setLastQuote });
        pullSetUnderlyingAssets({ setUnderlyingAsset });
        handleAPIpull({ optionsAPI, setSnapShotArray, setOptions })

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
export { FetchData };