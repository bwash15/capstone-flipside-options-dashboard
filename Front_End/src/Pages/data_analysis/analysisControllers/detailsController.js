import detailsApi from '../../data_analysis/api/details';
import { useNavigate } from 'react-router-dom';


const HandleGetDetails = async ({ setDetails }) => {
    try {
        const DetailsResponse = await detailsApi.get('/details');
        if (DetailsResponse && DetailsResponse.data) setDetails(DetailsResponse.data);
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

const HandleDetailsSubmit = async ({ details, setDetails, contractType, exerciseStyle, expirationDate, sharesPerContract, strikePrice, detailsTicker, setContractType, setExerciseStyle, setExpirationDate, setSharesPerContract, setStrikePrice, setDetailsTicker }) => {


    const newDetails = {
        contract_type: contractType,
        exercise_style: exerciseStyle,
        expiration_date: expirationDate,
        shares_per_contract: sharesPerContract,
        strike_price: strikePrice,
        ticker: detailsTicker
    };

    try {
        const response = await detailsApi.post('/details', newDetails);
        const allDetails = [...details, response.data];
        setDetails(allDetails);
        setContractType('');
        setExerciseStyle('');
        setExpirationDate('');
        setSharesPerContract('');
        setStrikePrice('');
        setDetailsTicker('');

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

const HandleDetailsEdit = async ({ id, details, setDetails, editContractType, setEditContractType, editExerciseStyle, setEditExerciseStyle, editExpirationDate, setEditExpirationDate, editSharesPerContract, setEditSharesPerContract, editStrikePrice, setEditStrikePrice, editDetailsTicker, setEditDetailsTicker }) => {

    const newDetails = {
        contract_type: editContractType,
        exercise_style: editExerciseStyle,
        expiration_date: editExpirationDate,
        shares_per_contract: editSharesPerContract,
        strike_price: editStrikePrice,
        ticker: editDetailsTicker
    };
    try {
        const editDetailsResponse = await detailsApi.put(`/details/${id}`, newDetails);
        setDetails(details.map(_details => _details.id === id ? { ...editDetailsResponse.data } : details));
        setEditContractType('');
        setEditExerciseStyle('');
        setEditExpirationDate('');
        setEditSharesPerContract('');
        setEditStrikePrice('');
        setEditDetailsTicker('');

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

const HandleDetailsDelete = async (id, setDetails) => {
    try {
        const navigate = useNavigate()
        await detailsApi.delete(`/details/${id}`);
        const detailsList = detailsApi.filter(_details => _details.id !== id);
        setDetails(detailsList);
        navigate('/');
    } catch (err) {
        console.log(err.message);
    }
}

export { HandleGetDetails, HandleDetailsSubmit, HandleDetailsEdit, HandleDetailsDelete }