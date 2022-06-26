import React from 'react'
import AnalysisListItem from './AnalysisListItem'

const AnalysisList = ({ options }) => {
    return (
        <ul>
            {options.map(option => (
                <AnalysisListItem key={option.request_id} option={option} />
            ))}
        </ul>
    )
}

export default AnalysisList