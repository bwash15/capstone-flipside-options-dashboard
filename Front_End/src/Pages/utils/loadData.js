import { postsApi } from '../data_analysis/api/analysis_axios';
import { snapShotsApi } from '../data_analysis/api/analysis_axios';
import { aggregatesApi } from '../data_analysis/api/analysis_axios';
import { dayApi } from '../data_analysis/api/analysis_axios';
import { detailsApi } from '../data_analysis/api/analysis_axios';
import { greeksApi } from '../data_analysis/api/analysis_axios';
import { last_quoteApi } from '../data_analysis/api/analysis_axios';
import { underlying_assetApi } from '../data_analysis/api/analysis_axios';
import { filtersApi } from '../data_analysis/api/analysis_axios';

import usersApi from '../data_analysis/api/users';


/** Initial App Load **/

const FetchData = async ({ setAggregates, setFilters, snapShotLink, options, setOptions, setPosts, setSnapShots, setDay, setDetails, setGreeks, setLastQuote, setUnderlyingAsset }) => {
    try {
        // Data is in the response.data        
        pullSetPosts({ setPosts });
        pullSetFilters({ setFilters });
        pullSetAggregates({ setAggregates });
        pullSetDay({ setDay });
        pullSetDetails({ setDetails });
        pullSetGreeks({ setGreeks });
        pullSetLastQuotes({ setLastQuote });
        pullSetUnderlyingAssets({ setUnderlyingAsset });
        pullSetSnapShots(setSnapShots);
        handleAPIpull(options, setOptions, snapShotLink);

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

const pullSetSnapShots = async ({ setSnapShots }) => {
    const SnapShotResponse = await snapShotsApi.get('/snapShot');
    if (SnapShotResponse && SnapShotResponse.data) setSnapShots(SnapShotResponse.data);
    sessionStorage.setItem("snapShots", JSON.stringify(SnapShotResponse.data));
}

const pullSetAggregates = async ({ setAggregates }) => {
    const aggregateResponse = await aggregatesApi.get('/aggregate');
    if (aggregateResponse && aggregateResponse.data) setAggregates(aggregateResponse.data);
    sessionStorage.setItem("aggreagates", JSON.stringify(aggregateResponse.data));
}

const pullSetDay = async ({ setDay }) => {
    const DayResponse = await dayApi.get('/day');
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
    const LastQuoteResponse = await last_quoteApi.get('/last_quote');
    if (LastQuoteResponse && LastQuoteResponse.data) setLastQuote(LastQuoteResponse.data);
    sessionStorage.setItem("last_quote", JSON.stringify(LastQuoteResponse.data));
}

const pullSetUnderlyingAssets = async ({ setUnderlyingAsset }) => {
    const UnderlyingAssetResponse = await underlying_assetApi.get('/underlying_asset');
    if (UnderlyingAssetResponse && UnderlyingAssetResponse.data) setUnderlyingAsset(UnderlyingAssetResponse.data);
    sessionStorage.setItem("underlying_asset", JSON.stringify(UnderlyingAssetResponse.data));
}

const pullSetFilters = async ({ setFilters }) => {
    const FiltersResponse = await filtersApi.get('/filters');
    if (FiltersResponse && FiltersResponse.data) setFilters(FiltersResponse.data);
    sessionStorage.setItem("filters", JSON.stringify(FiltersResponse.data));
}

const handleAPIpull = async ({ setOptions, snapShotLink, options }) => {

    const response = await fetch(snapShotLink);
    const JsonOptionsData = await response.json();
    let optionResultsKeys = Object.keys(JsonOptionsData.results);
    let optionKeys = Object.keys(JsonOptionsData);
    setOptions([...options, JsonOptionsData.results]);

    sessionStorage.setItem("snapShotAPIpull", JSON.stringify(JsonOptionsData));
    sessionStorage.setItem("newOptionsArray", JSON.stringify(options));
    sessionStorage.setItem("option_results_keys", JSON.stringify(optionResultsKeys));
    sessionStorage.setItem("option_keys", JSON.stringify(optionKeys));

}
export { FetchData, handleAPIpull };