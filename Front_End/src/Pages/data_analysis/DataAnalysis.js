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
import postsApi from './api/posts';
import usersApi from './api/users';
import snapShotApi from './api/snapShot'

import './AnalysisStyles.css';



const DataAnalysis = () => {

    const navigate = useNavigate();
    // This path will be updated dynamically for each data type
    const JSON_URL = 'https://jsonplaceholder.typicode.com/';

    const [clock, setClock] = useState('No Time Shown');
    const [lastClockUpdate, setLastClockUpdate] = useState('No Time Shown');
    const [seconds, setSeconds] = useState(0);
    const clockId = useRef();
    const totalAppRunTime = useRef(0);
    const [reqType, setReqType] = useState('posts');                               // Hardcoded Default <<
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [error, setError] = useState('');

    const [dataHead, setDatahead] = useState([
        {
            id: 1,
            datetime: "2022-07-04",
            userEmail: "joe.smith@abc.com",
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
            datetime: "2022-07-04",
            userEmail: "bill.smith@abc.com",
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

    // SNAPSHOT
    const [options, setOptions] = useState([]);
    const [snapShots, setSnapShots] = useState([]);
    const [snapShotArray, setSnapShotArray] = useState([]);
    const [request_id, setRequestId] = useState([]);
    // non-nested properties
    const [singleProps, setSingleProps] = useState([]);
    const [breakEvenPrice, setBreakEvenPrice] = useState([]);
    const [impliedVolatility, setimpliedVolatility] = useState([]);
    const [openInterest, setOpenInterest] = useState([]);

    // Day Properties
    const [dayArray, setDayArray] = useState([]);
    const [day, setDay] = useState([]);
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
    // Details Properties
    const [detailsArray, setDetailsArray] = useState([]);
    const [details, setDetails] = useState([]);
    const [contractType, setContractType] = useState([]);
    const [exerciseStyle, setExerciseStyle] = useState([]);
    const [expirationDate, setExpirationDate] = useState([]);
    const [sharesPerContract, setSharesPerContract] = useState([]);
    const [strikePrice, setStrikePrice] = useState([]);
    const [detailsTicker, setDetailsTicker] = useState([]);
    // Greeks
    const [greeksArray, setGreeksArray] = useState([]);
    const [greeks, setGreeks] = useState([]);
    const [delta, setDelta] = useState([]);
    const [gamma, setGamma] = useState([]);
    const [theta, setTheta] = useState([]);
    const [vega, setVega] = useState([]);
    // Last Quote
    const [lastQuoteArray, setLastQuoteArray] = useState([]);
    const [lastQuote, setLastQuote] = useState([]);
    const [ask, setAsk] = useState([]);
    const [askSize, setAskSize] = useState([]);
    const [bid, setBid] = useState([]);
    const [LQlastUpdated, setLQLastUpdated] = useState([]);
    const [bidSize, setBidSize] = useState([]);
    const [midpoint, setMidpoint] = useState([]);
    const [timeFrame, setTimeFrame] = useState([]);
    // Underlying Asset
    const [underlyingAssetArray, setUnderlyingAssetArray] = useState([]);
    const [underlyingAsset, setUnderlyingAsset] = useState([]);
    const [changeToBreakEven, setChangeToBreakEven] = useState([]);
    const [ULlastUpdated, setULLastUpdated] = useState([]);
    const [price, setPrice] = useState([]);
    const [ULTicker, setULTicker] = useState([]);
    const [status, setStatus] = useState([]);

    // filters 
    const [userFilters, setUserFilters] = useState([]);
    const [filterObj, setFilteredObj] = useState([]);
    const [option_ticker, setOptionTicker] = useState("TSLA");
    const [option_type, setOption_type] = useState("C");
    const [option_expire_date, setOption_expire_date] = useState("20220614");
    const [option_strike_price, setOption_strike_price] = useState(12.89);
    const [option_multiplier, setOption_multiplier] = useState(2);
    const [option_timespan, setOption_timespan] = useState("day");
    const [option_from, setOption_from] = useState("20220620");
    const [option_to, setOption_To] = useState("20220623");
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
    const [editImpliedVolatility, setEditimpliedVolatility] = useState([]);
    const [editOpenInterest, setEditOpenInterest] = useState([]);
    const [editStatus, setEditStatus] = useState([]);

    // Edit Day Properties
    const [editDay, setEditDay] = useState([]);
    const [editChange, setEditChange] = useState([]);
    const [editchangePercent, setEditChangePercent] = useState([]);
    const [editClose, setEditClose] = useState([]);
    const [editHigh, setEditHigh] = useState([]);
    const [editDayLastUpdated, setEditDayLastUpdated] = useState([]);
    const [editLow, setEditLow] = useState([]);
    const [editOpen, setEditOpen] = useState([]);
    const [editPreviousClose, seteditPreviousClose] = useState([]);
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
    const [editLQlastUpdated, setEditLQlastUpdated] = useState([]);
    const [editMidpoint, setEditMidpoint] = useState([]);
    const [editLQTimeFrame, setEditLQTimeFrame] = useState([]);

    // Edit Underlying Asset Properties
    const [editUnderlyingAsset, setEditUnderlyingAsset] = useState([]);
    const [editChangeToBreakEven, setEditChangeToBreakEven] = useState([]);
    const [editULlastUpdated, setEditULlastUpdated] = useState([]);
    const [editPrice, setEditPrice] = useState([]);
    const [editULTicker, setEditULTicker] = useState([]);
    const [editULTimeFrame, setEditULTimeFrame] = useState([]);


    useEffect(() => {

        // -----  GET calls  ------------
        const fetchData = async () => {
            try {
                // Data is in the response.data
                const postResponse = await postsApi.get('/posts');
                if (postResponse && postResponse.data) setPosts(postResponse.data);
                sessionStorage.setItem("posts", JSON.stringify(postResponse.data));
                const SnapShotResponse = await snapShotApi.get('/snapShot');
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
        fetchData();

    }, [])


    //-------------  Loading From User Selected Aggregates Link from API  ---------------
    // Everytime the dependency changes
    useEffect(() => {
        const fetchDBData = async () => {
            try {
                const fetchResponse = await fetch(`${JSON_URL}${reqType}`);
                if (!fetchResponse.ok) throw Error('Did not recieve expected data from Fetch')
                const listItems = await fetchResponse.json();
                console.log(listItems);
                setItems(listItems);
                sessionStorage.setItem(`UserReq: ${reqType}`, JSON.stringify(listItems));
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        setTimeout(() => {
            fetchDBData();
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
    //------------------------------------------------------------------------------------
    // Delete

    const handleItemsDelete = (id) => {
        const itemsList = items.filter(item => item.id !== id);
        setItems(itemsList);
        navigate('/');
    }
    const handlePostsDelete = async (id) => {
        try {
            await postsApi.delete(`/posts/${id}`);
            const postList = posts.filter(post => post.id !== id);
            setPosts(postList);
            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
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
    const handleSnapShotDelete = async (id) => {
        try {
            await snapShotApi.delete(`/snapShot/${id}`);
            const snapShotList = snapShots.filter(snapShot => snapShot.request_id !== id);
            setSnapShots(snapShotList);

            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
    }

    //------------------------------------------------------------------------------------
    // Handle Submits


    const handlePostsSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = {
            id,
            title: postTitle,
            dateTime,
            body: postBody
        };

        try {
            const response = await postsApi.post('/posts', newPost);
            const allPosts = [...posts, response.data];
            setPosts(allPosts);
            setPostBody('');
            setPostTitle('');
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
    const handleUsersSubmit = async (e) => {
        e.preventDefault();
        const id = options.length ? options[options.length - 1].id + 1 : 1;
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp');

        const newUser = {
            id,
            dateTime,
            email: email,
            firstName: firstName,
            lastName: lastName,
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
        const id = options.length ? options[options.length - 1].id + 1 : 1;
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp');

        const newSnapShot = {
            request_id: request_id,
            results: {
                break_even_price: breakEvenPrice,
                day: {
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
                },
                details: {
                    contract_type: contractType,
                    exercise_style: exerciseStyle,
                    expiration_date: expirationDate,
                    shares_per_contract: sharesPerContract,
                    strike_price: strikePrice,
                    ticker: detailsTicker
                },
                greeks: {
                    delta: delta,
                    gamma: gamma,
                    theta: theta,
                    vega: vega
                },
                implied_volatility: impliedVolatility,
                last_quote: {
                    ask: ask,
                    askSize: askSize,
                    bid: bid,
                    bidSize: bidSize,
                    last_updated: LQlastUpdated,
                    midpoint: midpoint,
                    timeFrame: timeFrame
                },
                open_interest: openInterest,
                underlying_asset: {
                    change_to_break_even: changeToBreakEven,
                    last_updated: ULlastUpdated,
                    price: price,
                    ticker: ULTicker,
                    timeFrame: timeFrame
                }
            },
            status: status
        };
        try {
            // const response = await snapShotapi.post('/snapShot', newSnapShot);
            const allSnapShots = [...snapShots, newSnapShot];
            setSnapShots(allSnapShots);
            setSnapShotArray(allSnapShots);

            // Resetting State on the Form
            setRequestId('');
            setBreakEvenPrice('');
            setDay('');
            setChange('');
            setChangePercent('');
            setClose('');
            setHigh('');
            setDayLastUpdated('');
            setLow('');
            setOpen('');
            setPreviousClose('');
            setVolume('');
            setVwap('');
            setDetails('');
            setContractType('');
            setExerciseStyle('');
            setExpirationDate('');
            setSharesPerContract('');
            setStrikePrice('');
            setDetailsTicker('');
            setGreeks('');
            setDelta('');
            setGamma('');
            setTheta('');
            setVega('');
            setLastQuote('');
            setAsk('');
            setAskSize('');
            setBid('');
            setBidSize('');
            setEditLQlastUpdated('');
            setMidpoint('');
            setTimeFrame('');
            setUnderlyingAsset('');
            setChangeToBreakEven('');
            setPrice('');
            setULTicker('');

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
    const handlePostsEdit = async (id) => {
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = {
            id,
            Title: editPostTitle,
            dateTime,
            body: editPostBody
        };
        try {

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
    const handleSnapShotEdit = async (id) => {
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp');

        const updatedSnapShot = {
            request_id: editRequest_id,
            results: {
                break_even_price: editBreakEvenPrice,
                day: {
                    change: editChange,
                    change_percent: editchangePercent,
                    close: editClose,
                    high: editHigh,
                    last_updated: editDayLastUpdated,
                    low: editLow,
                    open: editOpen,
                    previous_close: editPreviousClose,
                    volume: editVolume,
                    vwap: editVwap
                },
                details: {
                    contract_type: editContractType,
                    exercise_style: editExerciseStyle,
                    expiration_date: editExpirationDate,
                    shares_per_contract: editSharesPerContract,
                    strike_price: editStrikePrice,
                    ticker: editDetailsTicker
                },
                greeks: {
                    delta: editDelta,
                    gamma: editGamma,
                    theta: editTheta,
                    vega: editVega
                },
                implied_volatility: editImpliedVolatility,
                last_quote: {
                    ask: editAsk,
                    askSize: editAskSize,
                    bid: editBid,
                    bidSize: editBidSize,
                    last_updated: editLQlastUpdated,
                    midpoint: editMidpoint,
                    timeFrame: editLQTimeFrame
                },
                open_interest: editOpenInterest,
                underlying_asset: {
                    change_to_break_even: editChangeToBreakEven,
                    last_updated: editULlastUpdated,
                    price: editPrice,
                    ticker: editULTicker,
                    timeFrame: editULTimeFrame
                }
            },
            status: editStatus
        };
        try {
            const editSnapShotResponse = await snapShotApi.put(`/snapShots/${id}`, updatedSnapShot);
            setSnapShots(snapShots.map(snapShot => snapShot.request_id === id ? { ...editSnapShotResponse.data } : snapShot));
            // Set Edits back to empty String
            setEditRequestId('');
            setEditBreakEvenPrice('');
            setEditDay('');
            setEditChange('');
            setEditChangePercent('');
            setEditClose('');
            setEditHigh('');
            setEditDayLastUpdated('');
            setEditLow('');
            setEditOpen('');
            seteditPreviousClose('');
            setEditVolume('');
            setEditVwap('');
            setEditDetails('');
            setEditContractType('');
            setEditExerciseStyle('');
            setEditExpirationDate('');
            setEditSharesPerContract('');
            setEditStrikePrice('');
            setEditDetailsTicker('');
            setEditGreeks('');
            setEditDelta('');
            setEditGamma('');
            setEditTheta('');
            setEditVega('');
            setEditimpliedVolatility('');
            setEditLastQuote('');
            setEditAsk('');
            setEditAskSize('');
            setEditBid('');
            setEditBidSize('');
            setEditMidpoint('');
            setEditLQTimeFrame('');
            setEditOpenInterest('');
            setEditUnderlyingAsset('');
            setEditChangeToBreakEven('');
            setEditPrice('');
            setEditULTicker('');
            setEditULTimeFrame('');
            setEditStatus('');
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
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
                />}>
                <Route index element={<CardHome posts={searchResults} />} />
                <Route path="post">
                    <Route index element={<NewCard
                        handlePostsSubmit={handlePostsSubmit}
                        postTitle={postTitle}
                        setPostTitle={setPostTitle}
                        postBody={postBody}
                        setPostBody={setPostBody}
                    />} />
                    <Route path="edit/:id" element={<EditPosts
                        posts={posts}
                        handlePostsEdit={handlePostsSubmit}
                        editPostTitle={editPostTitle}
                        editPostBody={editPostBody}
                        setEditPostTitle={setEditPostTitle}
                        setEditPostBody={setEditPostBody}
                    />} />

                    <Route path=":id" element={<PostedCard
                        posts={posts}
                        handlePostsDelete={handlePostsDelete}
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
                        <Route path=":request_id" element={
                            <PostedSnapShotCard
                                snapShots={snapShots}
                                handleSnapShotDelete={handleSnapShotDelete}
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
