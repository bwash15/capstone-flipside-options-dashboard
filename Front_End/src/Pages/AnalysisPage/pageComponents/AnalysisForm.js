import React from 'react';
import FilterButton from '../buttonComponents/FilterButton';

const AnalysisForm = ({ reqType, setReqType }) => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <>
                <FilterButton
                    buttonText="users"
                    reqType={reqType}
                    setReqType={setReqType}
                />
                <FilterButton
                    buttonText="snapShot"
                    reqType={reqType}
                    setReqType={setReqType}
                />
                <FilterButton
                    buttonText="day"
                    reqType={reqType}
                    setReqType={setReqType}
                />
                <FilterButton
                    buttonText="details"
                    reqType={reqType}
                    setReqType={setReqType}
                />
                <FilterButton
                    buttonText="greeks"
                    reqType={reqType}
                    setReqType={setReqType}
                />
                <FilterButton
                    buttonText="last_quote"
                    reqType={reqType}
                    setReqType={setReqType}
                />
                <FilterButton
                    buttonText="underlying_asset"
                    reqType={reqType}
                    setReqType={setReqType}
                />
                <FilterButton
                    buttonText="posts"
                    reqType={reqType}
                    setReqType={setReqType}
                />
            </>
        </form>
    )
}

export default AnalysisForm