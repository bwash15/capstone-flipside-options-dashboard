import { useState, useEffect } from "react";
import axios from 'axios'

/** Recieves a Data URL  **/

const useAxiosFetch = (dataUrl) => {
    // Defined the states of the Fetch
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    console.error(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setTimeout(() => setIsLoading(false), 2000);
            }
        }
        fetchData(dataUrl);

        const cleanUp = () => {
            console.log('clean up function running...');
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl])

    return { data, fetchError, isLoading };
}

export default useAxiosFetch;
