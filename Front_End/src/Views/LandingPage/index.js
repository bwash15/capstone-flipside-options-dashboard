import React from "react";

function Home(){

<<<<<<< HEAD
    const user = localStorage.getItem("name")
    return(<div>
        <h1>Hello World!!!!!!!!!!!</h1>
        <h1>{user}</h1>
=======
    const logout =()=> {
        localStorage.clear();
        window.location.href = '/';
    };

    return(<div>
        <h1>Hello World!!!!!!!!!!!</h1>
        <button onClick={logout}>Logout</button>
>>>>>>> 27e2480339dc51ce0df151f0e4436279bd660b7b
    </div>);
}

export default Home
