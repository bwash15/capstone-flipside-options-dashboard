import React from 'react'

const AdFooter = ({ search, setSearch }) => {
    return (
        <>
            <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='search'>Search Posts</label>
                <input
                    id="search"
                    type='text'
                    role='searchbox'
                    placeholder="Search SnapShot Database"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <br />
        </>
    )
}

export default AdFooter
