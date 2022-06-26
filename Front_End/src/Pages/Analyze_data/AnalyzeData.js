/** PORT 3500 - snapshot **/
/** PORT 3600 - users **/
/** PORT 3700 - usernotes **/
/** PORT 3800 - day **/
/** PORT 3900 - details **/
/** PORT 4000 - greeks **/
/** PORT 4100 - last_quote **/
/** PORT 4200 - underlying_asset **/
/** PORT 4300 - ticker news **/
import { useState, useEffect, useNavigate } from 'react';
import { Switch, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import AnalysisList from './AnalysisList';
import AnalysisTable from './AnalysisTable';
import AdHeader from './AdHeader';
import AdFooter from './AdFooter';
import AdNav from './AdNav';
import AdHome from './AdHome';
import SnapDetailsPage from './SnapDetailsPage';
import OptionAttributes from './OptionAttributes';
import './AdStyles.css';
import Missing from './AdMissing';



const AnalyzeData = () => {


    const JSON_URL = 'https://jsonplaceholder.typicode.com/';
    const snapShot_URL = 'https://localhost:3500/';
    const users_URL = 'https://localhost:3600/';
    const usernotes_URL = 'https://localhost:3700/';
    const day_URL = 'https://localhost:3800/';
    const details_URL = 'https://localhost:3900/';
    const greeks_URL = 'https://localhost:4000/';
    const last_quote_URL = 'https://localhost:4100/';
    const underlying_asset_URL = 'https://localhost:4200/';
    const [reqType, setReqType] = useState('posts');
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const snapShotPath = '/snapShot';
    const userspath = '/users';
    const userNotesPath = '/posts';
    const DayPath = '/day';
    const DetailsPath = '/details';
    const GreeksPath = '/greeks';
    const LastQuotesPath = '/last_quote';
    const Underlying_AssetsPath = '/underlying_asset';

    const [option_ticker, setOptionTicker] = useState("TSLA");
    const [option_type, setOption_type] = useState("C");
    const [option_expire_date, setOption_expire_date] = useState("20220614");
    const [option_strike_price, setOption_strike_price] = useState(12.89);
    const [option_multiplier, setOption_multiplier] = useState(2);
    const [option_timespan, setOption_timespan] = useState("day");
    const [option_from, setOption_from] = useState("20220620");
    const [option_to, setOption_To] = useState("20220623");

    // const [snapShotArray, setSnapShotArray] = useState([]);
    // const [snapShots, setSnapShots] = useState([]);
    const [options, setOptions] = useState([]);
    // const [time, setTime] = useState('No Time Shown');
    // const [timeLastUpdated, setTimeLastUpdated] = useState('No Time Shown');

    //-------------  Loading From User Selected Aggregates Link from API  ---------------
    // Everytime the dependency changes
    useEffect(() => {
        const fetchDBData = async () => {
            try {
                const fetchResponse = await fetch(`${JSON_URL}${reqType}`);
                if (!fetchResponse.ok) throw Error('Did not recieve expected data from Fetch')
                const listOptions = await fetchResponse.json();
                console.log(listOptions);
                setOptions(listOptions);
                sessionStorage.setItem(`UserReq: ${reqType}`, JSON.stringify(listOptions));
                setFetchError(null);
            } catch (err) {
                setFetchError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        setTimeout(() => {
            fetchDBData();
        }, 2000)

    }, [reqType])


    useEffect(() => {
        const filteredResults = options.filter(option =>
            ((option.body).toLowerCase()).includes(search.toLowerCase())
            || ((option.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    }, [options, search])

    const handleAttributeSubmit = (e) => {

    }


    return (
        <div className='adApp'>
            <AdHeader
                reqType={reqType}
                setReqType={setReqType}
                option_ticker={option_ticker}
                option_type={option_type}
                option_expire_date={option_expire_date}
                option_strike_price={option_strike_price}
                option_multiplier={option_multiplier}
                option_timespan={option_timespan}
                option_from={option_from}
                option_to={option_to}
                setOptionTicker={setOptionTicker}
                setOption_type={setOption_type}
                setOption_expire_date={setOption_expire_date}
                setOption_strike_price={setOption_strike_price}
                setOption_multiplier={setOption_multiplier}
                setOption_timespan={setOption_timespan}
                setOption_from={setOption_from}
                setOption_To={setOption_To}
                handleAttributeSubmit={handleAttributeSubmit}
            />
            <AdNav
                reqType={reqType}
                setReqType={setReqType}
            />
            <Switch>
                <Route exact path="/adhome">
                    <AdHome />
                </Route>
                <Route exact path="/analyzedata/analysistable">
                    <AnalysisTable options={options} />
                </Route>
                <Route exact path="/analyzedata/analysislist">
                    <AnalysisList options={options} />
                </Route>
                <Route exact path="/analyzedata/analysistable/selectedOption">
                    <SnapDetailsPage />
                </Route>
                <Route path="*" component={Missing}></Route>
            </Switch>
            <AdFooter
                search={search}
                setSearch={setSearch}
            />
        </div>
    )
}

export default AnalyzeData