import React from 'react'

const AnalysisHeader = ({ title, search, setSearch }) => {
    return (
        <header className='Header'>
            <h2>{title}</h2><br />
            <form className="searchForm" onSubmit={(e) => e.preventDefault()} >
                <label htmlFor='search'>Search</label>
                <input
                    id='search'
                    type="text"
                    placeholder="Search Database"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </header>
    )
}

export default AnalysisHeader