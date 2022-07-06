import React from 'react'

const AnalysisListItem = ({ post }) => {
    return (
        <li>
            {JSON.stringify(post)}
        </li>
    )
}

export default AnalysisListItem