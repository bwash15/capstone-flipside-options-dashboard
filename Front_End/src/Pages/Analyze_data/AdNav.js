import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdForm from '../analyze_data/AdForm';

const AdNav = ({
    reqType, setReqType }) => {
    // Popover open state

    return (
        <nav >
            <AdForm reqType={reqType} setReqType={setReqType} />
        </nav>
    )
}

export default AdNav