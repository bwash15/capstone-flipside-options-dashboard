require("dotenv").config();
import "isomorphic-fetch"


app.param('user', function (req, res, next, id) {
  // try to get the user details from the User model and attach it to the request object
  User.find(id, function (err, user) {
    if (err) {
      next(err)
    } else if (user) {
      req.user = user
      next()
    } else {
      next(new Error('failed to load user'))
    }
  })
})



//  Use setInterval() to set the heartbeat for the API pull 


const PullHistoricalOptions = async (SubapiPulldoc) => {
    SubapiPulldoc.option_type = 'C'                             //C for call P for put
    SubapiPulldoc.option_expire_date = '220427'                 // YearMonthDay
    SubapiPulldoc.option_ticker = 'SPY';                       //nasdaq name for the company -> this comapny is called exela but the nasdaq name is XELA
    SubapiPulldoc.option_strike_price = '00428000';             //8 digit number, divide by 1000 -> this will be 1$
    SubapiPulldoc.options_ticker_link = `O:${option_ticker}${option_expire_date}${option_type}${option_strike_price}`;
    SubapiPulldoc.multiplier = '1';                             // minutes per minute, hours per hour, days per day, weeks per week -> this will be one hour
    SubapiPulldoc.timespan = 'hour';                            // minute, hour, day, week, month
    SubapiPulldoc.from = '2022-04-24';                          //start of the timeframe to look at 
    SubapiPulldoc.to = '2022-04-25';                            //end of the timeframe to look at

    SubapiPulldoc.api_link =`https://api.polygon.io/v2/aggs/ticker/${options_ticker_link}/range/${multiplier}/${timespan}/${from}/${to}?apiKey=` + api_key;
    SubapiPulldoc.snapshot_link = `https://api.polygon.io/v3/snapshot/options/${option_ticker}/O:${option_ticker}${option_expire_date}${option_type}${option_strike_price}?apiKey=${api_key}`
    
    //******************************************************************************************************** */
    //******************************************************************************************************** */
    //change the output to call or put depending on the api response    
    
  }
  function SelectoptionType(type){
      if(type == 'C'){
          return 'Call';
      } else if(type == 'P'){
          return 'Put';
      }
  }
  function ChangeStrike(strike){
      return strike/1000;
  }
  function SellingCallStratWeeklyReturn(current_premium, current_strike){
      let price = current_premium/current_strike * 100;
      return `${price}%`;
  }
  //fetch json data from the api link
  //for now only console logging the most popular sold option contract
  async function GetOptions(){
      // fetch returns a stream object > calling 
      const response = await fetch(snapshot_link, {
          // Added from here to right above console.log(error)
          method: 'POST',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          credentials: 'include',
          body: 'foo=bar&lorem=ipsum'
        })
        .then(res.json())
        .then(res => {
          // Handle response 
          // Commented out data changed [query = data > to > query = res]
          // const data = await response.json();
          const query = res['results']['day']['close'];
          console.log('Response: ', res);
          console.log(`Option Type: ${optionType(option_type)}\nTicker: ${option_ticker}\nStrike: $${ChangeStrike(option_strike_price)}\nExpiration: ${option_expire_date}\nOption Price: $${query}`);
        })
        .catch(err => {
          // Handle error 
          console.log('Error message: ', error);
        });
      // console.log(query)
      // console.log("should have printed")
  }
module.exports = { PullHistoricalOptions, GetOptions, SelectoptionType, ChangeStrike, SellingCallStratWeeklyReturn};