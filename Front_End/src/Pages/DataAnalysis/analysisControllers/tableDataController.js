import tableData from '../api/table';
import { useNavigate } from 'react-router-dom';


const FetchTableandListData = async ({ JSON_URL, reqType, setItems, setError, setIsLoading }) => {
    try {
        const fetchResponse = await fetch(`${JSON_URL}${reqType}`);
        if (!fetchResponse.ok) throw Error('Did not recieve expected data from Fetch')
        const listItems = await fetchResponse.json();
        console.log(listItems);
        setItems(listItems);
        sessionStorage.setItem(`UserReq: ${reqType}`, JSON.stringify(listItems));

        const alltableData = [...tableData, listItems];
        sessionStorage.setItem(`allSessionTableData`, JSON.stringify(alltableData));

        setError(null);
    } catch (err) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
}


const HandleItemsDelete = (id, setItems) => {
    const navigate = useNavigate()
    let items = sessionStorage.getItem()
    const itemsList = items.filter(item => item.id !== id);
    setItems(itemsList);
    navigate('/');
}

export { HandleItemsDelete, FetchTableandListData }