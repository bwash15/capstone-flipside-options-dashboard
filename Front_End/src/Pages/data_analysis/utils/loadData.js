import dayApi from '../api/day';
import { useDayData } from '../analysisHooks/useAnalysisProviders/useDayProvider';
import { useAggFiltersData } from '../analysisHooks/useAnalysisProviders/useAggFiltersProvider';
import detailsApi from '../../data_analysis/api/details';
import filtersApi from '../api/filters';
import greeksApi from '../api/greeks';
import last_quoteApi from '../api/last_quote';
import postsApi from '../api/posts';
import underlyingAssetApi from '../api/underlying_asset';
import snapShotApi from '../api/snapShots';
/** Initial App Load **/

const LoadAppData = async ({ snapShotLink, options, setOptions, setPosts, setSnapShots, setDetails, setGreeks, setLastQuote, setUnderlyingAsset }) => {
    const { setDay } = useDayData();
    const { setFilters } = useAggFiltersData();
    try {
        // Data is in the response.data        
        pullSetPosts({ setPosts });
        pullSetFilters({ setFilters });
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
    const SnapShotResponse = await snapShotApi.get('/snapShot');
    if (SnapShotResponse && SnapShotResponse.data) setSnapShots(SnapShotResponse.data);
    sessionStorage.setItem("snapShots", JSON.stringify(SnapShotResponse.data));
}

// const pullSetAggregates = async ({ setAggregates }) => {
//     const aggregateResponse = await aggregateApi.get('/aggregate');
//     if (aggregateResponse && aggregateResponse.data) setAggregates(aggregateResponse.data);
//     sessionStorage.setItem("aggreagates", JSON.stringify(aggregateResponse.data));
// }

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
    const UnderlyingAssetResponse = await underlyingAssetApi.get('/underlying_asset');
    if (UnderlyingAssetResponse && UnderlyingAssetResponse.data) setUnderlyingAsset(UnderlyingAssetResponse.data);
    sessionStorage.setItem("underlying_asset", JSON.stringify(UnderlyingAssetResponse.data));
}

const pullSetFilters = async ({ setFilters }) => {
    const FiltersResponse = await filtersApi.get('/filters');
    if (FiltersResponse && FiltersResponse.data) setFilters(FiltersResponse.data);
    sessionStorage.setItem("filters", JSON.stringify(FiltersResponse.data));
}

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
export { LoadAppData, handleAPIpull };