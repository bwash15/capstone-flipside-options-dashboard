import React from 'react';
import AnalysisCell from './AnalysisCell';

const AnalysisRow = ({ option }) => {
    return (
        <tr>
            {Object.entries(option).map(([key, value]) => {
                return (
                    <AnalysisCell key={key} cellData={JSON.stringify(value)} />
                )
            })}
        </tr>
    )
}

export default AnalysisRow