import React from 'react'
import AnalysisRow from './AnalysisRow'

const AnalysisTable = ({ options }) => {
    return (
        <div className='table-container'>
            <table>
                <tbody>
                    {options.map(option => (
                        <AnalysisRow key={option.request_id} option={option} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AnalysisTable