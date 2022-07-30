import { useState, useEffect, useRef } from 'react';
import { Route, Routes, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Clock from './Clock';
import AnalysisLayout from './AnalysisLayout';
import CardHome from './cardComponents/CardHome';
import NewCard from './cardComponents/NewCard';
import PostedCard from './cardComponents/PostedCard';
import PostedUsersCard from './cardComponents/PostedUsersCard';
import UsersCardHome from './cardComponents/UsersCardHome';
import NewUsersCard from './cardComponents/NewUsersCard';
import SnapShotCardHome from './cardComponents/snapShotCards/SnapShotCardHome';
import NewSnapShotCard from './cardComponents/snapShotCards/NewSnapShotCard';
import PostedSnapShotCard from './cardComponents/snapShotCards/PostedSnapShotCard';
import EditPosts from './cardComponents/EditPosts';
import MissingPage from './MissingPage';
import AnalysisList from './pageComponents/AnalysisList';
import AnalysisTable from './pageComponents/AnalysisTable';
import EditSnapShot from './cardComponents/snapShotCards/EditSnapShot';
import { FetchData } from '../utils/loadData';
import { PostAllDataToDB } from '../utils/postData';
import { FetchTableandListData } from './analysisControllers/tableDataController';
import { HandlePostsDelete, HandlePostsEdit, HandlePostSubmit, HandleGetPosts } from './analysisControllers/postsController';
import { HandleSnapShotDelete, HandleSnapShotSubmit, HandleSnapShotEdit } from './analysisControllers/snapShotController';
import { HandleFilterEdit, HandleFiltersSubmit, HandleFiltersDelete } from './analysisControllers/filtersController';
import './AnalysisStyles.css';



import postsApi from './api/posts';
import snapShotApi from './api/snapShots';
import usersApi from './api/users';
import aggregateApi from './api/aggregate';
import dataHeadApi from './api/dataHead';
import dayApi from './api/day';
import detailsApi from './api/details';
import greeksApi from './api/greeks';
import last_quoteApi from './api/last_quote';
import underlying_assetApi from './api/underlying_asset';
import filtersApi from './api/filters';
import singlePropsApi from './api/singleProps';





const DataAnalysis = () => {

    const navigate = useNavigate();
    // This path will be updated dynamically for each data type
    const JSON_URL = 'https://jsonplaceholder.typicode.com/';
    const IMG_URL = 'http://www.fillmurray.com/400/500';



    const [imgSrc, setImgSrc] = useState("");

    const [clock, setClock] = useState('No Time Shown');
    const [lastClockUpdate, setLastClockUpdate] = useState('No Time Shown');
    const [seconds, setSeconds] = useState(0);
    const clockId = useRef();
    const totalAppRunTime = useRef(0);
    const [reqType, setReqType] = useState('posts');                               // Hardcoded Default <<
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [searchSnaps, setSearchSnaps] = useState('');
    const [searchSnapResults, setSearchSnapResults] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [error, setError] = useState('');

    const [dataHead, setDatahead] = useState([
        {
            id: 1,
            timeCreated: "2022-06-27",
            timeLastEdited: "",
            creatorEmail: "jimSmith@gmail.com",
            selected: false,
            type: {
                items: true,
                users: false,
                posts: false,
                snapShots: false
            }
        },
        {
            id: 2,
            timeCreated: "2022-07-04",
            timeLastEdited: "",
            creatorEmail: "bill.smith@abc.com",
            selected: false,
            type: {
                items: true,
                users: false,
                posts: false,
                snapShots: false
            }
        }
    ])

    const [items, setItems] = useState([]);

    // Individual States    
    // POSTS
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [posts, setPosts] = useState([]);

    // USERS
    const [email, setEmail] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [users, setUsers] = useState([{
        firstName: "John",
        lastName: "Smith",
        email: "jSmith@gmail.com",
        password: "0123456789",
        rt: "",
        roles: {
            "User": 2001,
            "Admin": 5150,
            "Editor": 1981
        },
        selectedOptions: [{
            request_id_1: "d9ff18dac69f55c218f69e4753706acd"
        },
        {
            request_id_2: "123d9ff18dac69f55c218f69e4753706acd"
        },
        {
            request_id_3: "123d9ff18dac69f55c218f69e4753706acd"
        }
        ]
    }, {
        firstName: "Billy",
        lastName: "Jones",
        email: "bJones@gmail.com",
        password: "0123456789",
        rt: "",
        roles: {
            "User": 2001,
            "Admin": 5150,
            "Editor": 1981
        },
        selectedOptions: [{
            request_id_1: "d9ff18dac69f55c218f69e4753706acd"
        },
        {
            request_id_2: "123d9ff18dac69f55c218f69e4753706acd"
        },
        {
            request_id_3: "123d9ff18dac69f55c218f69e4753706acd"
        }
        ]
    }

    ]);

    // AGGREGATES
    const [aggregates, setAggregates] = useState([]);

    // SNAPSHOT
    const [options, setOptions] = useState([]);

    const [snapShotArray, setSnapShotArray] = useState([]);
    const [request_id, setRequestId] = useState('d9ff18dac69f55c218f69e4753706acd');
    // non-nested properties
    const [breakEvenPrice, setBreakEvenPrice] = useState([]);
    const [impliedVolatility, setImpliedVolatility] = useState([]);
    const [openInterest, setOpenInterest] = useState([]);
    const [singleProps, setSingleProps] = useState([{
        break_even_price: breakEvenPrice,
        implied_volatility: impliedVolatility,
        open_interest: openInterest
    }]);

    // Day Properties
    const [change, setChange] = useState([]);
    const [changePercent, setChangePercent] = useState([]);
    const [close, setClose] = useState([]);
    const [high, setHigh] = useState([]);
    const [daylastUpdated, setDayLastUpdated] = useState([]);
    const [low, setLow] = useState([]);
    const [open, setOpen] = useState([]);
    const [previousClose, setPreviousClose] = useState([]);
    const [volume, setVolume] = useState([]);
    const [vwap, setVwap] = useState([]);
    const [dayArray, setDayArray] = useState([]);
    const [day, setDay] = useState([{
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
    }]);
    // Details Properties
    const [contractType, setContractType] = useState([]);
    const [exerciseStyle, setExerciseStyle] = useState([]);
    const [expirationDate, setExpirationDate] = useState([]);
    const [sharesPerContract, setSharesPerContract] = useState([]);
    const [strikePrice, setStrikePrice] = useState([]);
    const [detailsTicker, setDetailsTicker] = useState([]);
    const [detailsArray, setDetailsArray] = useState([]);
    const [details, setDetails] = useState([{
        contract_type: contractType,
        exercise_style: exerciseStyle,
        expiration_date: expirationDate,
        shares_per_contract: sharesPerContract,
        strike_price: strikePrice,
        ticker: detailsTicker
    }]);
    // Greeks
    const [delta, setDelta] = useState([]);
    const [gamma, setGamma] = useState([]);
    const [theta, setTheta] = useState([]);
    const [vega, setVega] = useState([]);
    const [greeksArray, setGreeksArray] = useState([]);
    const [greeks, setGreeks] = useState([{
        delta: delta,
        gamma: gamma,
        theta: theta,
        vega: vega
    }]);
    // Last Quote
    const [ask, setAsk] = useState([]);
    const [askSize, setAskSize] = useState([]);
    const [bid, setBid] = useState([]);
    const [bidSize, setBidSize] = useState([]);
    const [LQlast_updated, setLQlast_updated] = useState([]);
    const [midpoint, setMidpoint] = useState([]);
    const [LQtimeFrame, setLQtimeFrame] = useState([]);
    const [lastQuoteArray, setLastQuoteArray] = useState([]);
    const [lastQuote, setLastQuote] = useState([{
        ask: ask,
        ask_size: askSize,
        bid: bid,
        bid_size: bidSize,
        last_updated: LQlast_updated,
        midpoint: midpoint,
        timeFrame: LQtimeFrame
    }]);
    // Underlying Asset
    const [changeToBreakEven, setChangeToBreakEven] = useState([]);
    const [ULlastUpdated, setULlastUpdated] = useState([]);
    const [price, setPrice] = useState([]);
    const [ULTicker, setULTicker] = useState([]);
    const [ULtimeFrame, setULTimeFrame] = useState([]);
    const [underlyingAssetArray, setUnderlyingAssetArray] = useState([]);
    const [underlyingAsset, setUnderlyingAsset] = useState([{
        change_to_break_even: changeToBreakEven,
        last_updated: ULlastUpdated,
        price: price,
        ticker: ULTicker,
        timeFrame: ULtimeFrame
    }]);

    const [status, setStatus] = useState([]);
    const [ssLastCreated, setSSlastCreated] = useState([]);
    const [ssLastEdited, setSSlastEdited] = useState([]);

    const [snapShots, setSnapShots] = useState([{
        request_id: request_id,
        results: {
            break_even_price: breakEvenPrice,
            day: day,
            details: details,
            greeks: greeks,
            implied_volatility: impliedVolatility,
            last_quote: lastQuote,
            open_interest: openInterest,
            underlying_asset: underlyingAsset
        },
        status: status,
    }]);

    // filters 
    const [option_type, setOption_type] = useState("C");
    const [option_expire_date, setOption_expire_date] = useState("20220614");
    const [option_ticker, setOptionTicker] = useState("TSLA");
    const [option_strike_price, setOption_strike_price] = useState(150000);
    const [option_ticker_link, setOptionTickerLink] = useState(`O:${option_ticker}${option_expire_date}${option_type}${option_strike_price}`);
    const [option_multiplier, setOption_multiplier] = useState(2);
    const [option_timespan, setOption_timespan] = useState("day");
    const [option_from, setOption_from] = useState("20220620");
    const [option_to, setOption_To] = useState("20220623");

    const [apiKey, setApiKey] = useState(process.env.api_key);
    const [editOption_type, setEditOption_type] = useState("");
    const [editOption_expire_date, setEditOption_expire_date] = useState("");
    const [editOption_ticker, setEditOptionTicker] = useState("");
    const [editOption_strike_price, setEditOption_strike_price] = useState();
    const [editOption_ticker_link, setEditOptionTickerLink] = useState(`O:${option_ticker}${option_expire_date}${option_type}${option_strike_price}`);
    const [editOption_multiplier, setEditOption_multiplier] = useState(0);
    const [editOption_timespan, setEditOption_timespan] = useState("");
    const [editOption_from, setEditOption_from] = useState("");
    const [editOption_to, setEditOption_to] = useState("");

    const [editApiKey, setEditApiKey] = useState(process.env.api_key);
    const [filters, setFilters] = useState([{
        option_type: option_type,
        option_expire_date: option_expire_date,
        option_ticker: option_ticker,
        option_strike_price: option_strike_price,
        option_ticker_link: option_ticker_link,
        option_multiplier: option_multiplier,
        option_timespan: option_timespan,
        option_from: option_from,
        option_to: option_to
    }]);
    const [editFilters, setEditFilters] = useState([{
        editOption_type: editOption_type,
        editOption_expire_date: editOption_expire_date,
        editOption_ticker: editOption_ticker,
        editOption_strike_price: editOption_strike_price,
        editOption_ticker_link: editOption_ticker_link,
        editOption_multiplier: editOption_multiplier,
        editOption_timespan: editOption_timespan,
        editOption_from: editOption_from,
        editOption_to: editOption_to
    }]);

    const [snapShotBaseUrl, setApiBaseUrl] = useState('https://api.polygon.io/v3/snapshot/options/');
    const [apiAggBaseUrl, setApiAggBaseUrl] = useState('https://api.polygon.io/v2/aggs/ticker/');
    const [apiTickersBaseUrl, setApiTickersBaseUrl] = useState('https://api.polygon.io/v3/reference/tickers');

    const [apiLink, setApiLink] = useState(`${apiAggBaseUrl}${option_ticker_link}/range/${option_multiplier}/${option_timespan}/${option_from}/${option_to}?apiKey=${apiKey}`);
    const [snapShotLink, setSnapShotLink] = useState(`${snapShotBaseUrl}${option_ticker}/${option_ticker_link}${option_expire_date}${option_type}${option_strike_price}?apiKey=${apiKey}`);

    //----------------------------------------------------------------------------------
    // Edit Properties

    // Posts
    const [editPostTitle, setEditPostTitle] = useState('');
    const [editPostBody, setEditPostBody] = useState('');

    // Users
    const [editEmail, setEditEmail] = useState([]);
    const [editFirstName, setEditFirstName] = useState([]);
    const [editLastName, setEditLastName] = useState([]);
    const [editSelectedOptions, setEditSelectedOptions] = useState([]);

    // SnapShot
    const [editRequest_id, setEditRequestId] = useState([]);
    const [editBreakEvenPrice, setEditBreakEvenPrice] = useState([]);
    const [editImpliedVolatility, setEditImpliedVolatility] = useState([]);
    const [editOpenInterest, setEditOpenInterest] = useState([]);
    const [editStatus, setEditStatus] = useState([]);
    const [editssLastCreated, setEditSSlastCreated] = useState([]);
    const [editssLastEdited, setEditSSlastEdited] = useState([]);

    // Edit Day Properties
    const [editDay, setEditDay] = useState([]);
    const [editChange, setEditChange] = useState([]);
    const [editChangePercent, setEditChangePercent] = useState([]);
    const [editClose, setEditClose] = useState([]);
    const [editHigh, setEditHigh] = useState([]);
    const [editDayLastUpdated, setEditDayLastUpdated] = useState([]);
    const [editLow, setEditLow] = useState([]);
    const [editOpen, setEditOpen] = useState([]);
    const [editPreviousClose, setEditPreviousClose] = useState([]);
    const [editVolume, setEditVolume] = useState([]);
    const [editVwap, setEditVwap] = useState([]);

    // Edit Details Properties
    const [editDetails, setEditDetails] = useState([]);
    const [editContractType, setEditContractType] = useState([]);
    const [editExerciseStyle, setEditExerciseStyle] = useState([]);
    const [editExpirationDate, setEditExpirationDate] = useState([]);
    const [editSharesPerContract, setEditSharesPerContract] = useState([]);
    const [editStrikePrice, setEditStrikePrice] = useState([]);
    const [editDetailsTicker, setEditDetailsTicker] = useState([]);

    // Edit Greeks Properties
    const [editGreeks, setEditGreeks] = useState([]);
    const [editDelta, setEditDelta] = useState([]);
    const [editGamma, setEditGamma] = useState([]);
    const [editTheta, setEditTheta] = useState([]);
    const [editVega, setEditVega] = useState([]);

    // Edit Last Quote Properties
    const [editLastQuote, setEditLastQuote] = useState([]);
    const [editAsk, setEditAsk] = useState([]);
    const [editAskSize, setEditAskSize] = useState([]);
    const [editBid, setEditBid] = useState([]);
    const [editBidSize, setEditBidSize] = useState([]);
    const [editLQlast_updated, setEditLQlast_updated] = useState([]);
    const [editMidpoint, setEditMidpoint] = useState([]);
    const [editLQtimeFrame, setEditLQtimeFrame] = useState([]);

    // Edit Underlying Asset Properties
    const [editUnderlyingAsset, setEditUnderlyingAsset] = useState([]);
    const [editChangeToBreakEven, setEditChangeToBreakEven] = useState([]);
    const [editULlastUpdated, setEditULlastUpdated] = useState([]);
    const [editPrice, setEditPrice] = useState([]);
    const [editULticker, setEditULticker] = useState([]);
    const [editULtimeFrame, setEditULtimeFrame] = useState([]);


    useEffect(() => {
        // -----  GET calls  -------------
        FetchData({ setDatahead, setAggregates, setPosts, setSnapShots, setFilters, setDay, setDetails, setGreeks, setLastQuote, setUnderlyingAsset, setOptions, options, snapShotLink });
    }, [])

    //-------------  Loading From User Selected buttons Link from API  ---------------
    // Everytime the dependency changes
    useEffect(() => {
        setTimeout(() => {
            FetchTableandListData({ JSON_URL, reqType, setItems, setError, setIsLoading });
        }, 2000)
    }, [reqType])

    //------------------------------------------------------------------------------------
    // Search and SearchResults
    // Create one for each of the Dataobjects we will be searching through

    useEffect(() => {
        const filteredResults = posts.filter(post =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    }, [posts, search])

    // useEffect(() => {
    //     const filteredResults = snapShots.filter(snapShot =>
    //         ((snapShot.request_id).toLowerCase()).includes(search.toLowerCase())
    //         || ((snapShot.results.details.ticker).toLowerCase()).includes(search.toLowerCase()));

    //     setSearchResults(filteredResults.reverse());
    // }, [snapShots, search, setSearchResults])
    //------------------------------------------------------------------------------------
    // Delete



    const handleClearFormFilters = async (e) => {
        e.preventDefault();

        setOption_type('');
        setOption_expire_date('');
        setOptionTicker('');
        setOption_strike_price('');
        setOption_multiplier('');
        setOption_timespan('');
        setOption_from('');
        setOption_To('');
    }


    const handleUsersDelete = async (id) => {
        try {
            await usersApi.delete(`/users/${id}`);
            const userList = users.filter(user => user.id !== id);
            setUsers(userList);
            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
    }


    //------------------------------------------------------------------------------------
    // Handle Submits

    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        HandleFiltersSubmit(snapShotBaseUrl, filters, setFilters, setOptionTickerLink, setSnapShotLink, option_type, option_expire_date, option_ticker, option_strike_price, option_multiplier, option_timespan, option_from, option_to, option_ticker_link)
        navigate('/');
    }

    //---------------------------------------------------------------------------------
    const handleFilterEdit = async (e, id) => {
        e.preventDefault();
        HandleFilterEdit(id, editOption_type, editOption_expire_date, editOption_ticker, editOption_strike_price, editOption_multiplier, editOption_timespan, editOption_from, editOption_to, setEditOption_type, setEditOption_expire_date, setEditOptionTicker, setEditOption_strike_price, setEditOption_multiplier, setEditOption_timespan, setEditOption_from, setEditOption_to, setFilters, filters, setEditOptionTickerLink)
        navigate('/');
    }

    //----------------------------------------------------------------------------------
    const handleUsersSubmit = async (e) => {
        e.preventDefault();
        const id = options.length ? options[options.length - 1].id + 1 : 1;
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp');

        const newUser = {
            id,
            dateTime,
            firstName: firstName,
            lastName: lastName,
            email: email,
            selectedOptions: [{
                request_id_1: selectedOptions[0],
                request_id_2: selectedOptions[1],
                request_id_3: selectedOptions[2],
            }]
        };

        try {
            // const response = await usersapi.post('/users', newSinglePropertyInfo);
            const allUsers = [...users, newUser];
            setUsers(allUsers);
            setFirstName('');
            setLastName('');
            setEmail('');
            setSelectedOptions([]);
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


    const handleSnapShotSubmit = async (e) => {
        e.preventDefault();
        HandleSnapShotSubmit({ snapShots, setSnapShots, setSnapShotArray, setDay, setDetails, setGreeks, setLastQuote, setUnderlyingAsset, request_id, setRequestId, breakEvenPrice, setBreakEvenPrice, impliedVolatility, setImpliedVolatility, openInterest, setOpenInterest, change, setChange, changePercent, setChangePercent, close, setClose, high, setHigh, daylastUpdated, setDayLastUpdated, low, setLow, open, setOpen, previousClose, setPreviousClose, volume, setVolume, vwap, setVwap, contractType, setContractType, exerciseStyle, setExerciseStyle, expirationDate, setExpirationDate, sharesPerContract, setSharesPerContract, strikePrice, setStrikePrice, detailsTicker, setDetailsTicker, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega, ask, setAsk, bid, setBid, askSize, setAskSize, bidSize, setBidSize, LQlast_updated, setLQlast_updated, midpoint, setMidpoint, LQtimeFrame, setLQtimeFrame, changeToBreakEven, setChangeToBreakEven, ULlastUpdated, setULlastUpdated, price, setPrice, ULTicker, setULTicker, ULtimeFrame, setULTimeFrame, status });
    }
    //-------------------------------------------------------------------------------
    // Handle Edits

    const handleUsersEdit = async (id) => {
        try {
            const dateTime = format(new Date(), 'MMMM dd, yyyy pp');

            const updatedUser = {
                dateTime,
                email: editEmail,
                firstName: editFirstName,
                lastName: editLastName,
                selectedOptions: [{
                    request_id_1: editSelectedOptions[0],
                    request_id_2: editSelectedOptions[1],
                    request_id_3: editSelectedOptions[2]
                }]
            };
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

    const handlePostsEdit = async (e, id) => {
        e.preventDefault();
        HandlePostsEdit(id, posts, editPostTitle, editPostBody, setPosts, setEditPostBody, setEditPostTitle);
        navigate('/');
    }


    const handleSnapShotEdit = async (e, id) => {
        e.preventDefault();
        HandleSnapShotEdit(id,
            snapShots, setSnapShots, setSnapShotArray, setEditDay, setEditDetails, setEditGreeks, setEditLastQuote, setEditUnderlyingAsset,
            editRequest_id, setEditRequestId, editBreakEvenPrice, setEditBreakEvenPrice, editImpliedVolatility, setEditImpliedVolatility, editOpenInterest, setEditOpenInterest, editChange, setEditChange, editChangePercent, setEditChangePercent, editClose, setEditClose, editHigh, setEditHigh, editDayLastUpdated, setEditDayLastUpdated, editLow, setEditLow, editOpen, setEditOpen, editPreviousClose, setEditPreviousClose, editVolume, setEditVolume, editVwap, setEditVwap, editContractType, setEditContractType, editExerciseStyle, setEditExerciseStyle, editExpirationDate, setEditExpirationDate, editSharesPerContract, setEditSharesPerContract, editStrikePrice, setEditStrikePrice, editDetailsTicker, setEditDetailsTicker, editDelta, setEditDelta, editGamma, setEditGamma, editTheta, setEditTheta, editVega, setEditVega, editAsk, setEditAsk, editBid, setEditBid, editAskSize, setEditAskSize, editBidSize, setEditBidSize, editLQlast_updated, setEditLQlast_updated, editMidpoint, setEditMidpoint, editLQtimeFrame, setEditLQtimeFrame, editChangeToBreakEven, setEditChangeToBreakEven, editULlastUpdated, setEditULlastUpdated, editPrice, setEditPrice, editULticker, setEditULticker, editULtimeFrame, setEditULtimeFrame, editStatus, setEditStatus);

    }

    const HandlePostsSubmit = (e) => {
        e.preventDefault();
        HandlePostSubmit(posts, postTitle, postBody, setPosts, setPostBody, setPostTitle);
        navigate('/');
    }


    //-------------------------------------------------------------------------------
    return (
        <Routes>
            <Route path="/" element={
                <AnalysisLayout
                    search={search}
                    setSearch={setSearch}
                    reqType={reqType}
                    setReqType={setReqType}
                    popoverOpen={popoverOpen}
                    setPopoverOpen={setPopoverOpen}
                    setSnapShotLink={setSnapShotLink}
                    snapShotBaseUrl={snapShotBaseUrl}
                    handleFilterSubmit={handleFilterSubmit}
                    handleClearFormFilters={handleClearFormFilters}
                    option_type={option_type}
                    setOption_type={setOption_type}
                    option_expire_date={option_expire_date}
                    setOption_expire_date={setOption_expire_date}
                    option_ticker={option_ticker}
                    setOptionTicker={setOptionTicker}
                    option_strike_price={option_strike_price}
                    setOption_strike_price={setOption_strike_price}
                    option_ticker_link={option_ticker_link}
                    setOptionTickerLink={setOptionTickerLink}
                    option_multiplier={option_multiplier}
                    setOption_multiplier={setOption_multiplier}
                    option_timespan={option_timespan}
                    setOption_timespan={setOption_timespan}
                    option_from={option_from}
                    setOption_from={setOption_from}
                    option_to={option_to}
                    setOption_To={setOption_To}
                />}>
                <Route index element={<CardHome
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                    posts={searchResults}

                />} />
                <Route path="post">
                    <Route index element={<NewCard
                        HandlePostsSubmit={HandlePostsSubmit}
                        postTitle={postTitle}
                        setPostTitle={setPostTitle}
                        postBody={postBody}
                        setPostBody={setPostBody}
                    />} />
                    <Route path="edit/:id" element={<EditPosts
                        posts={posts}
                        handlePostsEdit={handlePostsEdit}
                        editPostTitle={editPostTitle}
                        editPostBody={editPostBody}
                        setEditPostTitle={setEditPostTitle}
                        setEditPostBody={setEditPostBody}
                    />} />

                    <Route path=":id" element={<PostedCard
                        posts={posts}
                        HandlePostsDelete={HandlePostsDelete}
                    />} />
                </Route>

                <Route path="/appclock">
                    <Route index element={<Clock
                        clock={clock}
                        setClock={setClock}
                        lastClockUpdate={lastClockUpdate}
                        setLastClockUpdate={setLastClockUpdate}
                        clockId={clockId}
                        seconds={seconds}
                        setSeconds={setSeconds}
                        totalAppRunTime={totalAppRunTime}
                    />} />
                </Route>
                {/**-------------------------------------------------------------------- */}
                <Route path="users">
                    <Route index element={<UsersCardHome users={users} />} />
                    <Route path="user">
                        <Route index element={<NewUsersCard
                            handleUsersSubmit={handleUsersSubmit}
                            email={email}
                            setEmail={setEmail}
                            firstName={firstName}
                            lastName={lastName}
                            setFirstName={setFirstName}
                            setLastName={setLastName}
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}

                        />} />
                        <Route path=":id" element={<PostedUsersCard
                            users={users}
                            handleUsersDelete={handleUsersDelete}
                        />} />
                    </Route>
                </Route>

                {/** -------------------------------------------------------------- **/}
                <Route path="snapShots">
                    <Route index element={<SnapShotCardHome snapShots={snapShots} />} />
                    <Route path="snapShot">
                        <Route index element={<NewSnapShotCard
                            handleSnapShotSubmit={handleSnapShotSubmit}
                            snapShots={snapShots}

                            request_id={request_id}
                            day={day}
                            setDay={setDay}
                            details={details}
                            setDetails={setDetails}
                            greeks={greeks}
                            setGreeks={setGreeks}
                            last_quote={lastQuote}
                            setLastQuote={setLastQuote}
                            underlying_asset={underlyingAsset}
                            setUnderlyingAsset={setUnderlyingAsset}

                        />} />
                        <Route path="edit/:request_id" element={<EditSnapShot
                            snapShots={snapShots}
                            handleSnapShotEdit={handleSnapShotEdit}
                            editRequest_id={editRequest_id}
                            setEditRequestId={setEditRequestId}
                            editBreakEvenPrice={editBreakEvenPrice}
                            setEditBreakEvenPrice={setEditBreakEvenPrice}
                            editImpliedVolatility={editImpliedVolatility}
                            setEditimpliedVolatility={setEditImpliedVolatility}
                            editOpenInterest={editOpenInterest}
                            setEditOpenInterest={setEditOpenInterest}
                            editChange={editChange}
                            setEditChange={setEditChange}
                            editChangePercent={editChangePercent}
                            setEditChangePercent={setEditChangePercent}
                            editClose={editClose}
                            setEditClose={setEditClose}
                            editHigh={editHigh}
                            setEditHigh={setEditHigh}
                            editDayLastUpdated={editDayLastUpdated}
                            setEditDayLastUpdated={setEditDayLastUpdated}
                            editLow={editLow}
                            setEditLow={setEditLow}
                            editOpen={editOpen}
                            setEditOpen={setEditOpen}
                            editPreviousClose={editPreviousClose}
                            setEditPreviousClose={setEditPreviousClose}
                            editVolume={editVolume}
                            setEditVolume={setEditVolume}
                            editVwap={editVwap}
                            setEditVwap={setEditVwap}
                            editContractType={editContractType}
                            setEditContractType={setEditContractType}
                            editExerciseStyle={editExerciseStyle}
                            setEditExerciseStyle={setEditExerciseStyle}
                            editExpirationDate={editExpirationDate}
                            setEditExpirationDate={setEditExpirationDate}
                            editSharesPerContract={editSharesPerContract}
                            setEditSharesPerContract={setEditSharesPerContract}
                            editStrikePrice={editStrikePrice}
                            setEditStrikePrice={setEditStrikePrice}
                            editDetailsTicker={editDetailsTicker}
                            setEditDetailsTicker={setEditDetailsTicker}
                            editDelta={editDelta}
                            setEditDelta={setEditDelta}
                            editGamma={editGamma}
                            setEditGamma={setEditGamma}
                            editTheta={editTheta}
                            setEditheta={setEditTheta}
                            editVega={editVega}
                            setEditVega={setEditVega}
                            editAsk={editAsk}
                            setEditAsk={setEditAsk}
                            editAskSize={editAskSize}
                            setEditAskSize={setEditAskSize}
                            editBid={editBid}
                            setEditBid={setEditBid}
                            editBidSize={editBidSize}
                            setEditBidSize={setEditBidSize}
                            editLQlastUpdated={editLQlast_updated}
                            setEditLQlastUpdated={setEditLQlast_updated}
                            editMidpoint={editMidpoint}
                            setEditMidpoint={setEditMidpoint}
                            editLQTimeFrame={editLQtimeFrame}
                            setEditLQTimeFrame={setEditLQtimeFrame}
                            editChangeToBreakEven={editChangeToBreakEven}
                            setEditChangeToBreakEven={setEditChangeToBreakEven}
                            editULlastUpdated={editULlastUpdated}
                            setEditULlastUpdated={setEditULlastUpdated}
                            editPrice={editPrice}
                            setEditPrice={setEditPrice}
                            editULticker={editULticker}
                            setEditULticker={setEditULticker}
                            editULtimeFrame={editULtimeFrame}
                            setEditULtimeFrame={setEditULtimeFrame}
                            editStatus={editStatus}
                            setEditStatus={setEditStatus}
                            editssLastEdited={editssLastEdited}
                            setEditSSlastEdited={setEditSSlastEdited}

                        />} />
                        <Route path=":request_id" element={
                            <PostedSnapShotCard
                                snapShots={snapShots}
                                HandleSnapShotDelete={HandleSnapShotDelete}
                            />} />
                    </Route>
                </Route>
                {/** -------------------------------------------------------------------- */}
                <Route path="/analysislist">
                    <Route index element={<AnalysisList
                        posts={posts}
                        users={users}
                        snapShots={snapShots}

                    />} />
                </Route>
                <Route path="/analysistable">
                    <Route index element={<AnalysisTable
                        items={items}
                        setItems={setItems}
                        reqType={reqType}
                        setReqType={setReqType}
                    />} />
                </Route>

                <Route path="*" element={<MissingPage />} />
            </Route>
        </Routes >

    )
}

export default DataAnalysis
