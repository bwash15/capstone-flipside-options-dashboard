import React from "react";

function Home(){

    const logout =()=> {
        localStorage.clear();
        window.location.href = '/';
    };

    return(<div>
        <h1>Hello World!!!!!!!!!!!</h1>
        <button onClick={logout}>Logout</button>
    </div>);
}

export default Home