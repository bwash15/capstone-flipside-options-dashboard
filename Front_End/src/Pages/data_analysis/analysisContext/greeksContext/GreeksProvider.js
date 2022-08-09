import { createContext, useState } from "react";
import { HandleGetGreeks, HandleGreeksSubmit, HandleGreeksEdit, HandleGreeksDelete } from "../../analysisControllers/greeksController";
import { useNavigate } from 'react-router-dom';
const GreeksContext = createContext({});

export const GreekssProvider = ({ children }) => {
    const navigate = useNavigate();

    const [delta, setDelta] = useState([]);
    const [gamma, setGamma] = useState([]);
    const [theta, setTheta] = useState([]);
    const [vega, setVega] = useState([]);
    // This does not hold the token or cookie > it holds a boolean to say 
    // whether we trust the device or not
    const [greeks, setGreeks] = useState([{
        delta: delta,
        gamma: gamma,
        theta: theta,
        vega: vega
    }]);
    const [editDelta, setEditDelta] = useState([]);
    const [editGamma, setEditGamma] = useState([]);
    const [editTheta, setEditTheta] = useState([]);
    const [editVega, setEditVega] = useState([]);


    const _handleGetGreeks = async (e) => {
        e.preventDefault();
        await HandleGetGreeks({ setGreeks })
        navigate('/');
    }
    const _handleGreeksSubmit = async (e) => {
        e.preventDefault();
        await HandleGreeksSubmit({ greeks, setGreeks, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega })
        navigate('/');
    }
    const _handleGreeksEdit = async (e, id) => {
        e.preventDefault();
        await HandleGreeksEdit({ id, greeks, setGreeks, editDelta, setEditDelta, editGamma, setEditGamma, editTheta, setEditTheta, editVega, setEditVega })
        navigate('/');
    }
    const _handleGreeksDelete = async (e, id) => {
        e.preventDefault();
        await HandleGreeksDelete({ id, setGreeks })
        navigate('/');
    }


    return (
        <GreeksContext.Provider value={{ _handleGetGreeks, _handleGreeksSubmit, _handleGreeksEdit, _handleGreeksDelete, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega, editDelta, setEditDelta, editGamma, setEditGamma, editTheta, setEditTheta, editVega, setEditVega }}>
            {children}
        </GreeksContext.Provider>
    )
}
export { GreeksContext };
