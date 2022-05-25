import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";



const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <p>Where would you like to go?</p>
            <br />
            <br />
            <Link to="/lounge">Go to the Traders Lounge(Not Active)</Link>
            <br />
            <Link to="/tilesPage">Go to the Tiles Page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/landingpage">Go to the Options Page</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home