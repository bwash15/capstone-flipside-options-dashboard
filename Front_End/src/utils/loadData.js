import { useState } from 'react';
import postsApi from '../api/posts';
import snapShotApi from '../data_analysis/api/snapShots';
import usersApi from '../data_analysis/api/users';
import dayAxios from '../data_analysis/api/day';
import detailsApi from '../data_analysis/api/details';
import greeksApi from '../data_analysis/api/greeks';
import lastQuoteApi from '../data_analysis/api/last_quote';
import underlyingAssetApi from '../data_analysis/api/underlying_asset';



const FetchData = async ({ setOptions, setPosts, setSnapShots, setDay, setDetails, setGreeks, setLastQuote, setUnderlyingAsset, setSnapShotArray }) => {

    const optionsAPI = 'https://api.polygon.io/v3/snapshot/options/AAPL/O:AAPL230616C00150000?apiKey=MNExhabeDDgHYLqKlxDoT79JUdvT_OaI'
    const [optArray, setOptionsArray] = useState([]);

    try {
        // Data is in the response.data
        pullSetPosts({ setPosts });
        pullSetDay({ setDay });
        pullSetDetails({ setDetails });
        pullSetGreeks({ setGreeks });
        pullSetLastQuotes({ setLastQuote });
        pullSetUnderlyingAssets({ setUnderlyingAsset });
        handleAPIpull({ optionsAPI, optArray, setSnapShotArray, setOptions })

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

const handleAPIpull = async ({ optionsAPI, optArray, setSnapShotArray, setOptions
}) => {
    let newOptionsArray = []

    const response = await fetch(optionsAPI);
    const JsonOptionsData = await response.json();
    let optionKeys = Object.keys(JsonOptionsData.results);
    // setOptionsArray([...optArray, JsonOptionsData])

    optArray[0] = JsonOptionsData.request_id;
    optArray[1] = JsonOptionsData.results.break_even_price;
    optArray[2] = JsonOptionsData.results.day;
    optArray[3] = JsonOptionsData.results.details;
    optArray[4] = JsonOptionsData.results.greeks;
    optArray[5] = JsonOptionsData.results.implied_volatility;
    optArray[6] = JsonOptionsData.results.last_quote;
    optArray[7] = JsonOptionsData.results.open_interest;
    optArray[8] = JsonOptionsData.results.underlying_asset;
    newOptionsArray = [...optArray, JsonOptionsData];
    sessionStorage.setItem("newOptionsArray", JSON.stringify(newOptionsArray));
    sessionStorage.setItem("snapShotAPIpull", JSON.stringify(JsonOptionsData));
    sessionStorage.setItem("option_keys", JSON.stringify(optionKeys));
    sessionStorage.setItem("option_data", JSON.stringify(JsonOptionsData.data));
    setOptions(newOptionsArray);
    setSnapShotArray(optArray);
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

export { FetchData };