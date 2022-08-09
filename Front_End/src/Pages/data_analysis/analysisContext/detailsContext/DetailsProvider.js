import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { HandleDetailsSubmit, HandleDetailsEdit, HandleDetailsDelete, HandleGetDetails } from "../../analysisControllers/detailsController";
const DetailsContext = createContext({});

export const DetailsProvider = ({ children }) => {
    const navigate = useNavigate()
    const [contractType, setContractType] = useState([]);
    const [exerciseStyle, setExerciseStyle] = useState([]);
    const [expirationDate, setExpirationDate] = useState([]);
    const [sharesPerContract, setSharesPerContract] = useState([]);
    const [strikePrice, setStrikePrice] = useState([]);
    const [detailsTicker, setDetailsTicker] = useState([]);
    const [details, setDetails] = useState([{
        contract_type: contractType,
        exercise_style: exerciseStyle,
        expiration_date: expirationDate,
        shares_per_contract: sharesPerContract,
        strike_price: strikePrice,
        ticker: detailsTicker
    }]);

    const [editContractType, setEditContractType] = useState([]);
    const [editExerciseStyle, setEditExerciseStyle] = useState([]);
    const [editExpirationDate, setEditExpirationDate] = useState([]);
    const [editSharesPerContract, setEditSharesPerContract] = useState([]);
    const [editStrikePrice, setEditStrikePrice] = useState([]);
    const [editDetailsTicker, setEditDetailsTicker] = useState([]);
    const [editDetails, setEditDetails] = useState([{
        contract_type: editContractType,
        exercise_style: editExerciseStyle,
        expiration_date: editExpirationDate,
        shares_per_contract: editSharesPerContract,
        strike_price: editStrikePrice,
        ticker: editDetailsTicker
    }]);

    const _handleGetDays = async (e) => {
        e.preventDefault();
        await HandleGetDetails({ setDetails })
        navigate('/');
    }
    const _handleDetailsSubmit = async (e) => {
        e.preventDefault();
        await HandleDetailsSubmit({ details, setDetails, editContractType, setEditContractType, editExerciseStyle, setEditExerciseStyle, editExpirationDate, setEditExpirationDate, editSharesPerContract, setEditSharesPerContract, editStrikePrice, setEditStrikePrice, editDetailsTicker, setEditDetailsTicker })
        navigate('/');
    }
    const _handleDetailsEdit = async (e, id) => {
        e.preventDefault();
        await HandleDetailsEdit({ id, details, setDetails, editContractType, setEditContractType, editExerciseStyle, setEditExerciseStyle, editExpirationDate, setEditExpirationDate, editSharesPerContract, setEditSharesPerContract, editStrikePrice, setEditStrikePrice, editDetailsTicker, setEditDetailsTicker })
        navigate('/');
    }
    const _handleDetailsDelete = async (e, id) => {
        e.preventDefault();
        await HandleGetDetails(id)
        navigate('/');
    }

    return (
        <DetailsContext.Provider value={{ _handleGetDays, _handleDetailsSubmit, _handleDetailsEdit, _handleDetailsDelete, contractType, setContractType, exerciseStyle, setExerciseStyle, expirationDate, setExpirationDate, sharesPerContract, setSharesPerContract, strikePrice, setStrikePrice, detailsTicker, setDetailsTicker, editContractType, setEditContractType, editExerciseStyle, setEditExerciseStyle, editExpirationDate, setEditExpirationDate, editSharesPerContract, setEditSharesPerContract, editStrikePrice, setEditStrikePrice, editDetailsTicker, setEditDetailsTicker }}>
            {children}
        </DetailsContext.Provider>
    )


}
export { DetailsContext };
