import { greeksApi } from '../api/analysis_axios';
import { useNavigate } from 'react-router-dom';

const HandleGetGreeks = async ({ setGreeks }) => {
    try {
        const GreeksResponse = await greeksApi.get('/greeks');
        if (GreeksResponse && GreeksResponse.data) setGreeks(GreeksResponse.data);
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

const HandleGreeksSubmit = async ({ setGreeks, greeksArray, setGreeksArray, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega }) => {

    const newGreeks = {
        delta: delta,
        gamma: gamma,
        theta: theta,
        vega: vega
    };

    try {
        const response = await greeksApi.post('/greeks', newGreeks);
        const allGreeks = [...greeksArray, response.data];
        setGreeksArray(allGreeks);
        setGreeks(response.data);
        setDelta('');
        setGamma('');
        setTheta('');
        setVega('');
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

const HandleGreeksEdit = async ({ id, greeks, setGreeks, editDelta, setEditDelta, editGamma, setEditGamma, editTheta, setEditTheta, editVega, setEditVega }) => {

    const newGreeks = {
        delta: editDelta,
        gamma: editGamma,
        theta: editTheta,
        vega: editVega
    };
    try {
        const editGreeksResponse = await greeksApi.put(`/greeks/${id}`, newGreeks);
        setGreeks(greeks.map(_greeks => _greeks.id === id ? { ...editGreeksResponse.data } : greeks));
        setEditDelta('');
        setEditGamma('');
        setEditTheta('');
        setEditVega('');

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

const HandleGreeksDelete = async ({ id, setGreeks }) => {
    const navigate = useNavigate()
    try {
        await greeksApi.delete(`/greeks/${id}`);
        const updatedGreeks = await greeksApi.get('/greeks');
        setGreeks(updatedGreeks);
        navigate('/');
    } catch (err) {
        console.log(err.message);
    }
}

export { HandleGetGreeks, HandleGreeksSubmit, HandleGreeksEdit, HandleGreeksDelete }