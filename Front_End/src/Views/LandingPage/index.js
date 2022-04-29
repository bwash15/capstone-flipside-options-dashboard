import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";


function Home(){
    const logout =()=> {
        localStorage.clear();
        window.location.href = '/';
    };

    const first = () =>{
        try{
            const u =localStorage.getItem("user");
            const j = JSON.parse(u);
            const i = j.firstName;
            return i;
        }
        catch(e){
            return e;
        }    
    }

    const last = () =>{
        try{
            const u =localStorage.getItem("user");
            const j = JSON.parse(u);
            const i = j.lastName;
            return i;
        }
        catch(e){
            return e;
        }    
    }
    
    // const test = getOptions().then(result => {
    //     console.log(result);
    // })

    return(<div>
        <h1>Hello World!!!!!!!!!!!</h1>
        <h1>{first()} {last()}</h1>
        <h1>{localStorage.getItem("lastName")}</h1>
        <h1>{localStorage.getItem("email")}</h1>
        <button onClick={logout}>Logout</button>
        <button>Submit</button>
        <button onClick={first}>Token</button>
    </div>);
}

export default Home;
