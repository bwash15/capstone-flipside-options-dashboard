import React from "react";
// import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate,Navigate } from "react-router-dom";
import { useCustomer, useClient } from "../../context/customer";

function Home(){
    const client = useClient();
  const history = useNavigate();
  const { customer, setCustomer } = useCustomer();

   


    const [value, setValue] = useState();
    const navigate = useNavigate();

    if (!customer) {
        return <Navigate to="/login" />;
    }

    const fetchData  = () => {
        let option_type = 'P'                             //C for call P for put
        let option_expire_date = '220513'                 // YearMonthDay
        let option_ticker = 'TQQQ';                       //nasdaq name for the company -> this comapny is called exela but the nasdaq name is XELA
        let option_strike_price = '00038000';             //8 digit number, divide by 1000 -> this will be 1$
        let options_ticker_link = `O:${option_ticker}${option_expire_date}${option_type}${option_strike_price}`;
        let multiplier = '1';                             // minutes per minute, hours per hour, days per day, weeks per week -> this will be one hour
        let timespan = 'hour';                            // minute, hour, day, week, month
        let from = '2022-05-09';                          //start of the timeframe to look at 
        let to = '2022-05-13';                            //end of the timeframe to look at
    
        let api_link = `https://api.polygon.io/v2/aggs/ticker/${options_ticker_link}/range/${multiplier}/${timespan}/${from}/${to}?apiKey=` + process.env.REACT_APP_API_KEY;
        
        console.log(`api link after fetching is ${api_link}`)
    
        //change the output to call or put depending on the api response
        function optionType(type){
            if(type === 'C'){
                return 'Call';
            } else if(type === 'P'){
                return 'Put';
            }
        }
        function changeStrike(strike){
            return strike/1000;
        }
        function SellingCallStratWeeklyReturn(current_premium, current_strike){
            let price = current_premium/current_strike * 100;
            return `${price}%`;
        }
    
        fetch(api_link)
              .then((response) => response.json())
              .then((data) => {
                  console.log(data)
                  setValue(data['results'][0]['o']);
            });
    }
    fetchData();
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

    const navProfile = () =>{
        navigate("/profile")
    }
    // useEffect(() => {
    //     setValue(fetchData());
    // }, []);
    return(<div>
        <h1>Hello World!!!!!!!!!!!</h1>
        <h1>{first()} {last()}</h1>
        <h1>{localStorage.getItem("lastName")}</h1>
        <h1>{localStorage.getItem("email")}</h1>
        <h1>The current price from the ticker TQQQ that expires 5/06/2022 is: ${value}</h1>
        <button onClick={logout}>Logout</button>
        <button>Submit</button>
        <button onClick={navProfile}>Profile</button>
    </div>);
}

export default Home;
