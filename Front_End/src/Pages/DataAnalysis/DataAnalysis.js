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
import MissingPage from './MissingPage';
import AnalysisList from './pageComponents/AnalysisList';
import AnalysisTable from './pageComponents/AnalysisTable';
import postsApi from './api/posts';
import snapShotApi from './api/snapShot';
import filtersApi from './api/filters';

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
    const [name, setName] = useState([]);
    const [users, setUsers] = useState([{
        email: email,
        name: name
    }]);

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
    const [lastUpdated, setLastUpdated] = useState([]);
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
    const [ticker, setTicker] = useState([]);
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
    const [bidSize, setBidSize] = useState([]);
    const [midpoint, setMidpoint] = useState([]);
    const [timeFrame, setTimeFrame] = useState([]);
    // Underlying Asset
    const [underlyingAssetArray, setUnderlyingAssetArray] = useState([]);
    const [underlyingAsset, setUnderlyingAsset] = useState([]);
    const [changeToBreakEven, setChangeToBreakEven] = useState([]);
    const [price, setPrice] = useState([]);
    const [status, setStatus] = useState([]);

    // filters 
    const [filters, setFilters] = useState([]);
    const [filterObj, setFilteredObj] = useState([]);
    const [option_ticker, setOptionTicker] = useState("TSLA");
    const [option_type, setOption_type] = useState("C");
    const [option_expire_date, setOption_expire_date] = useState("20220614");
    const [option_strike_price, setOption_strike_price] = useState(12.89);
    const [option_multiplier, setOption_multiplier] = useState(2);
    const [option_timespan, setOption_timespan] = useState("day");
    const [option_from, setOption_from] = useState("20220620");
    const [option_to, setOption_To] = useState("20220623");


    useEffect(() => {

        // -----  GET calls  ------------
        // 3500 - Posts
        // 3600 - snapShots
        // 3700 - filters
        const fetchData = async () => {
            try {
                // Data is in the response.data
                const postResponse = await postsApi.get('/posts');
                if (postResponse && postResponse.data) setPosts(postResponse.data);
                sessionStorage.setItem("posts", JSON.stringify(postResponse.data));
                const SnapShotResponse = await snapShotApi.get('/snapShot');
                if (SnapShotResponse && SnapShotResponse.data) setSnapShots(SnapShotResponse.data);
                sessionStorage.setItem("snapShots", JSON.stringify(SnapShotResponse.data));
                const FiltersResponse = await filtersApi.get('/filters');
                if (FiltersResponse && FiltersResponse.data) setFilters(FiltersResponse.data);
                sessionStorage.setItem("filters", JSON.stringify(FiltersResponse.data));

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
    const handlePostsDelete = (id) => {



        const itemsList = posts.filter(item => item.id !== id);
        setPosts(itemsList);
        navigate('/');
    }
    const handleUsersDelete = (id) => {
        const usersList = users.filter(user => user.id !== id);
        setUsers(usersList);
        navigate('/');
    }
    const handleSnapShotDelete = (id) => {
        const snapShotList = snapShots.filter(snapShot => snapShot.request_id !== id);
        setSnapShots(snapShotList);
        navigate('/');
    }

    //------------------------------------------------------------------------------------
    // Handle Submits

    // const handleItemsSubmit = async (e) => {
    //     e.preventDefault();
    //     const id = options.length ? options[options.length - 1].id + 1 : 1;
    //     const dateTime = format(new Date(), 'MMMM dd, yyyy pp');

    //     const newItem = {
    //         id,
    //         dateTime,
    //         break_even_price: breakEvenPrice,
    //         implied_volatility: impliedVolatility,
    //         open_interest: openInterest
    //     };

    //     try {
    //         // const response = await singlePropsapi.post('/singleProps', newSinglePropertyInfo);
    //         const allSingleProps = [...singleProps, newItem];
    //         setItems(allSingleProps);
    //         setBreakEvenPrice('');
    //         setimpliedVolatility('');
    //         setOpenInterest('');
    //         navigate('/');

    //     } catch (err) {
    //         if (err.response) {
    //             console.log(err.response.data);
    //             console.log(err.response.status);
    //             console.log(err.response.headers);

    //         } else {
    //             console.log(`Error: ${err.message}`);
    //         }
    //     }
    // }
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
            name: name
        };

        try {
            // const response = await usersapi.post('/users', newSinglePropertyInfo);
            const allUsers = [...users, newUser];
            setUsers(allUsers);
            setName('');
            setEmail('');
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
                    last_updated: lastUpdated,
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
                    ticker: ticker
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
                    last_updated: lastUpdated,
                    midpoint: midpoint,
                    timeFrame: timeFrame
                },
                open_interest: openInterest,
                underlying_asset: {
                    change_to_break_even: changeToBreakEven,
                    last_updated: lastUpdated,
                    price: price,
                    ticker: ticker,
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
            setLastUpdated('');
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
            setTicker('');
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
            setMidpoint('');
            setTimeFrame('');
            setUnderlyingAsset('');
            setChangeToBreakEven('');
            setPrice('');
            setTicker('');

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
                            name={name}
                            setName={setName}
                        />} />
                    </Route>
                    <Route path=":id" element={<PostedUsersCard
                        users={users}
                        handleUsersDelete={handleUsersDelete}
                    />} />
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
                    </Route>
                    <Route path=":request_id" element={
                        <PostedSnapShotCard
                            snapShots={snapShots}
                            handleSnapShotDelete={handleSnapShotDelete}
                        />} />
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
