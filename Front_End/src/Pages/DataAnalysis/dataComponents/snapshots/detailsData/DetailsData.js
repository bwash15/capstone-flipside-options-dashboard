import React, { useState, useEffect } from 'react';
import DetailsSelectForm from '../../../pageComponents/detailsDataForm/DetailsSelectForm';

import { HandleDetailsSubmit, HandleDetailsEdit, HandleDetailsDelete, HandleGetDetails } from "../../../analysisControllers/detailsController";

export default function DetailsData({ details, setDetails, detailsDataArray, setDetailsDataArray }) {

    const [contract_type, setContractType] = useState('');
    const [exercise_style, setExerciseStyle] = useState('');
    const [expiration_date, setExpirationDate] = useState('');
    const [shares_per_contract, setSharesPerContract] = useState(0.0);
    const [strike_price, setStrikePrice] = useState(0.0);
    const [ticker, setDetailsTicker] = useState('');

    useEffect(() => {
        setContractType(details.contract_type);
        setExerciseStyle(details.exercise_style);
        setExpirationDate(details.expiration_date);
        setSharesPerContract(details.shares_per_contract);
        setStrikePrice(details.strike_price);
        setDetailsTicker(details.ticker);
        console.log(`${contract_type}\n${exercise_style}\n${expiration_date}\n${shares_per_contract}\n${strike_price}\n${ticker}`);
    }, [details])

    const _handleDetailsHold = async (e) => {
        e.preventDefault();
        await HandleDetailsSubmit({ details, setDetails, detailsDataArray, setDetailsDataArray, contract_type, exercise_style, expiration_date, shares_per_contract, strike_price, ticker, setContractType, setExerciseStyle, setExpirationDate, setSharesPerContract, setStrikePrice, setDetailsTicker })

    }

    return (
        <article className='detailsDataGrid'>
            <section>
                <DetailsSelectForm
                    title={"Details"}
                    _handleDetailsHold={_handleDetailsHold}
                    contract_type={contract_type}
                    setContractType={setContractType}
                    exercise_style={exercise_style}
                    setExerciseStyle={setExerciseStyle}
                    expiration_date={expiration_date}
                    setExpirationDate={setExpirationDate}
                    shares_per_contract={shares_per_contract}
                    setSharesPerContract={setSharesPerContract}
                    strike_price={strike_price}
                    setStrikePrice={setStrikePrice}
                    ticker={ticker}
                    setTicker={setDetailsTicker}
                />
                <button type='submit' onClick={_handleDetailsHold}>Compare Data</button>
            </section>
            <DetailsSelectForm
                title={"Hold 1"}
                _handleDetailsHold={_handleDetailsHold}
                contract_type={contract_type}
                setContractType={setContractType}
                exercise_style={exercise_style}
                setExerciseStyle={setExerciseStyle}
                expiration_date={expiration_date}
                setExpirationDate={setExpirationDate}
                shares_per_contract={shares_per_contract}
                setSharesPerContract={setSharesPerContract}
                strike_price={strike_price}
                setStrikePrice={setStrikePrice}
                ticker={ticker}
                setTicker={setDetailsTicker}
            />
            <DetailsSelectForm
                title={"Hold 2"}
                _handleDetailsHold={_handleDetailsHold}
                contract_type={contract_type}
                setContractType={setContractType}
                exercise_style={exercise_style}
                setExerciseStyle={setExerciseStyle}
                expiration_date={expiration_date}
                setExpirationDate={setExpirationDate}
                shares_per_contract={shares_per_contract}
                setSharesPerContract={setSharesPerContract}
                strike_price={strike_price}
                setStrikePrice={setStrikePrice}
                ticker={ticker}
                setTicker={setDetailsTicker}
            />
            <DetailsSelectForm
                title={"Hold 3"}
                _handleDetailsHold={_handleDetailsHold}
                contract_type={contract_type}
                setContractType={setContractType}
                exercise_style={exercise_style}
                setExerciseStyle={setExerciseStyle}
                expiration_date={expiration_date}
                setExpirationDate={setExpirationDate}
                shares_per_contract={shares_per_contract}
                setSharesPerContract={setSharesPerContract}
                strike_price={strike_price}
                setStrikePrice={setStrikePrice}
                ticker={ticker}
                setTicker={setDetailsTicker}
            />
        </article>
    )
}