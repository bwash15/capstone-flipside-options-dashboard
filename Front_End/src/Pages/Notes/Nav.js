import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ search, setSearch }) => {
    return (
        <nav className="Nav">
            <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='search'>Search Posts</label>
                <input
                    id="search"
                    type='text'
                    role='searchbox'
                    placeholder="Search User Notes Database"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                    <Link to="posts">Posts</Link>
                    <Link to="about">About</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav