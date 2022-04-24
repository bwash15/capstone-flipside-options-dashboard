import React from "react";

function Home(){

    const user = localStorage.getItem("name")
    return(<div>
        <h1>Hello World!!!!!!!!!!!</h1>
        <h1>{user}</h1>
    </div>);
}

export default Home
