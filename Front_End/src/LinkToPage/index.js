import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <br />
            <h2>Private</h2>
            <Link to="/landingpage">Home</Link>
            <Link to="/lounge">Traders Lounge(Not Active)</Link>
            <Link to="/tilesPage">Tiles Page</Link>
            <Link to="/sandbox">Sandbox(Not Active)</Link>
            <Link to="/admin">Admin Page</Link>
        </section>
    )
}

export default LinkPage