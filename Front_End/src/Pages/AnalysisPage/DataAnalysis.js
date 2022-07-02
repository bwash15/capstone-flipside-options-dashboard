import { useState, useEffect } from 'react';
import AnalysisForm from './pageComponents/AnalysisForm';
import AnalysisList from './pageComponents/AnalysisList';
import './AnalysisStyles.css';

const DataAnalysis = () => {
    // This path will be updated dynamically for each data type
    const JSON_URL = 'https://jsonplaceholder.typicode.com/';
    const [title, setTitle] = ('Analyze your data');
    const [time, setTime] = useState('No Time Shown');
    const [timeLastUpdated, setTimeLastUpdated] = useState('No Time Shown');
    const [reqType, setReqType] = useState('users');                               // Hardcoded Default <<
    const [isLoading, setIsLoading] = useState([]);
    const [error, setError] = useState('');

    const [items, setItems] = useState([]);
    const [users, setUsers] = useState([]);
    const [options, setOptions] = useState([]);
    const [snapShots, setSnapShots] = useState([]);
    const [posts, setPosts] = useState([]);
    const [userFilters, setUserFilters] = useState([]);

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

    return (
        <div className='App'>
            <AnalysisForm
                reqType={reqType}
                setReqType={setReqType}
            />
            <AnalysisList
                items={items}
                setItems={setItems}
            />


        </div>
    )
}

export default DataAnalysis