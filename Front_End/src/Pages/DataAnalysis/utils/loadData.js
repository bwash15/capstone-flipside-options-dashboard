import axios from 'axios';
import { useEffect, useState } from 'react';
// import { dayApi } from '../api/analysis_axios';
// import { detailsApi } from '../api/analysis_axios';
// import { filtersApi } from '../api/analysis_axios';
// import { greeksApi } from '../api/analysis_axios';
// import { last_quoteApi } from '../api/analysis_axios';
// import { postsApi } from '../api/analysis_axios';
// import { underlying_assetApi } from '../api/analysis_axios';
import { snapShotsApi } from '../api/analysis_axios';
/** Initial App Load **/

const LoadAppData = () => {


    try {
        // Data is in the response.data        
        HandleAPIpull();

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
const HandleAPIpull = async ({ snapShotLink, setSnapShot }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log("Setting Loading to true...")
    setLoading(true);
    console.log(`Pulling Data from ${snapShotLink}`)
    await axios.get(snapShotLink)
        .then((res) => {
            // JSON DATA is the SnapShot returned from the API
            const jsonData = res.data.json();
            console.log(jsonData.request_id);
            console.log(jsonData.results);
            console.log(jsonData.status);
            setSnapShot(jsonData);
            sessionStorage.setItem("snapShots", JSON.stringify(jsonData));
            // JSON DATA.results is the SnapShot data about the requested option returned from the API
            // RequestID, Results, Status

            let optionResultsKeys = Object.keys(jsonData.results);

            // let optionKeys = Object.keys(JsonOptionsData);
            // setSnapShot(JsonOptionsData);
            // setSnapShotArray([...snapShotArray, JsonOptionsData]);
        }).catch((err) => {
            setError(err);
            console.log(error);
        }).finally(() => {
            setLoading(false);
        });
}


//   async function loadAppData() {
//     const response = await fetch(snapShotLink);
//     const data = await response.json();
//     const jsonData = JSON.stringify(data);
//     console.log(`Response Data: ${jsonData}}`);
//     sessionStorage.setItem("_snapShots", JSON.stringify(data));
//     console.log(`Results Data: ${JSON.stringify(data.results)}`);
//     console.log(`Day Data: ${JSON.stringify(data.results.day)}`);
//     console.log(`Details Data: ${JSON.stringify(data.results.details)}`);
//     console.log(`Greeks Data: ${JSON.stringify(data.results.greeks)}`);
//     console.log(`LQ Data: ${JSON.stringify(data.results.last_quote)}`);
//     console.log(`ULA Data: ${JSON.stringify(data.results.underlying_asset)}`);
//     setSnapShot(data);
//     console.log(`SnapShot Data:  ${JSON.stringify(snapShot)}`);
//   }



const InitialAppDataLoad = async (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    setLoading(true);
    axios.get(url).then((response) => {

        setData(response.data.json());
        console.log(response.data);
    }).catch((err) => {
        setError(err);
        console.log(error);
    }).finally(() => {
        setLoading(false);
    })


    return { data, loading, error }
}

const Client = async (endpoint, { body, ...customConfig }) => {
    const headers = { "content-type": "application/json" };
    const config = {
        method: body ? "POST" : "GET",
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };
    if (body) {
        config.body = JSON.stringify(body);
    }

    return fetch(`http://localhost:3500/${endpoint}`, config)
        .then(response => response.json())
        .then(data => {
            console.log(data);

        });
}



const pullSetSnapShot = async ({ snapShotLink, setSnapShot }) => {
    const SnapShotResponse = await axios.get(snapShotLink);
    if (SnapShotResponse && SnapShotResponse.data) setSnapShot(SnapShotResponse.data);
    sessionStorage.setItem("snapShots", JSON.stringify(SnapShotResponse.data));
}
export { LoadAppData, pullSetSnapShot, HandleAPIpull };

// const pullSetPosts = async ({ setPosts }) => {
//     const postResponse = await postsApi.get('/posts');
//     if (postResponse && postResponse.data) setPosts(postResponse.data);
//     sessionStorage.setItem("posts", JSON.stringify(postResponse.data));
// }


// const pullSetDay = async ({ setDay }) => {
//     const DayResponse = await dayApi.get('/day');
//     if (DayResponse && DayResponse.data) setDay(DayResponse.data);
//     sessionStorage.setItem("day", JSON.stringify(DayResponse.data));
// }

// const pullSetDetails = async ({ setDetails }) => {
//     const DetailsResponse = await detailsApi.get('/details');
//     if (DetailsResponse && DetailsResponse.data) setDetails(DetailsResponse.data);
//     sessionStorage.setItem("details", JSON.stringify(DetailsResponse.data));
// }

// const pullSetGreeks = async ({ setGreeks }) => {
//     const GreeksResponse = await greeksApi.get('/greeks');
//     if (GreeksResponse && GreeksResponse.data) setGreeks(GreeksResponse.data);
//     sessionStorage.setItem("greeks", JSON.stringify(GreeksResponse.data));
// }

// const pullSetLastQuotes = async ({ setLastQuote }) => {
//     const LastQuoteResponse = await last_quoteApi.get('/last_quote');
//     if (LastQuoteResponse && LastQuoteResponse.data) setLastQuote(LastQuoteResponse.data);
//     sessionStorage.setItem("last_quote", JSON.stringify(LastQuoteResponse.data));
// }

// const pullSetUnderlyingAssets = async ({ setUnderlyingAsset }) => {
//     const UnderlyingAssetResponse = await underlying_assetApi.get('/underlying_asset');
//     if (UnderlyingAssetResponse && UnderlyingAssetResponse.data) setUnderlyingAsset(UnderlyingAssetResponse.data);
//     sessionStorage.setItem("underlying_asset", JSON.stringify(UnderlyingAssetResponse.data));
// }

// const pullSetFilters = async ({ setFilters }) => {
//     const FiltersResponse = await filtersApi.get('/filters');
//     if (FiltersResponse && FiltersResponse.data) setFilters(FiltersResponse.data);
//     sessionStorage.setItem("filters", JSON.stringify(FiltersResponse.data));
// }

// const pullSetAggregates = async ({ setAggregates }) => {
//     const aggregateResponse = await aggregateApi.get('/aggregate');
//     if (aggregateResponse && aggregateResponse.data) setAggregates(aggregateResponse.data);
//     sessionStorage.setItem("aggreagates", JSON.stringify(aggregateResponse.data));
// }

// const pullSetPosts = async ({ setPosts }) => {
//     const postResponse = await HandleGetPosts(setPosts);
//     sessionStorage.setItem("posts", JSON.stringify(postResponse.data));
// }

// const pullSetSnapShots = async ({ setSnapShots }) => {
//     const SnapShotResponse = await HandleGetSnapShots(setSnapShots)
//     sessionStorage.setItem("snapShots", JSON.stringify(SnapShotResponse.data));
// }

// const pullSetAggregates = async ({ setAggregates }) => {
//     const aggregateResponse = await HandleGetFilters(setAggregates)
//     sessionStorage.setItem("aggreagates", JSON.stringify(aggregateResponse.data));
// }

// const pullSetDay = async ({ setDay }) => {
//     const DayResponse = await HandleGetDays(setDay);
//     sessionStorage.setItem("day", JSON.stringify(DayResponse.data));
// }

// const pullSetDetails = async ({ setDetails }) => {
//     const DetailsResponse = await HandleGetDetails(setDetails)
//     sessionStorage.setItem("details", JSON.stringify(DetailsResponse.data));
// }

// const pullSetGreeks = async ({ setGreeks }) => {
//     const GreeksResponse = await HandleGetGreeks(setGreeks)
//     sessionStorage.setItem("greeks", JSON.stringify(GreeksResponse.data));
// }

// const pullSetLastQuotes = async ({ setLastQuote }) => {
//     const LastQuoteResponse = await HandleGetLastQuote(setLastQuote)
//     sessionStorage.setItem("last_quote", JSON.stringify(LastQuoteResponse.data));
// }

// const pullSetUnderlyingAssets = async ({ setUnderlyingAsset }) => {
//     const UnderlyingAssetResponse = await HandleGetUnderlyingAsset(setUnderlyingAsset)
//     sessionStorage.setItem("underlying_asset", JSON.stringify(UnderlyingAssetResponse.data));
// }

// const pullSetFilters = async ({ setFilters }) => {
//     const FiltersResponse = await HandleGetFilters(setFilters)
//     sessionStorage.setItem("filters", JSON.stringify(FiltersResponse.data));
// }
