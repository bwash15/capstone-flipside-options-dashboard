const ProfileInfo = require('../_model/User');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
const pwdHist = require('../_model/passwordHistory');
const fetchOption = require("isomorphic-fetch");
const TopTenSchema = require('../_model/topTenSchema');
const { array } = require('joi');
myEmitter.on('userRegistration', (msg, path, filename) => logServerEvents(msg, path, filename));

const deleteOldPwd = async (data) => {
    const history = await pwdHist.find().exec();
    console.log(data);
    try{
        for(const date of data)
        {
            const time = new Date(date);
            console.log(time);
            const user = await pwdHist.updateMany(
            {
                expDate: time
            },
            {
                $pull: {
                    pastPasswords: {
                        expDate: time
                    }
                }
            }
            );
            console.log(user);
        }

        console.log("=====MAINTENANCE COMPLETE=====");
        console.log(`${data.length} Files Deleted!`);
    }
    catch(err)
    {
        console.log(err);
    }

}

const findOldPwd = async () => {
    const history = await pwdHist.find().exec();
    const currentTime = Date.now();
    console.log('=====Delete Password History=====');
    var info = []
    for (const user of history) {
        for (const pwd of user.pastPasswords) {
            var matchinfo = pwd.expDate;
            if((currentTime - matchinfo) / (1000 * 3600 * 24 * 365) > 1 )
                info.push(matchinfo)
        }
    }
    if(info.length > 0)
        deleteOldPwd(info)
    else{
        console.log(`${info.length} Files Deleted!`);
        console.log("=====MAINTENANCE COMPLETE=====");
    }
    
}

const GetTopTen = async () => {

}

const GetOptions = async (req, res) => {
              
    const snapshot_link = `https://api.polygon.io/v3/reference/options/contracts?expired=false&limit=100&sort=underlying_ticker&apiKey=${process.env.API_KEY}`;
    console.log(snapshot_link);
    const response = await fetchOption(snapshot_link);
    const data = await response.json();
    var optionsList = data.results;
    console.log('=====Options=====');
    console.log(optionsList.length);
    



    const addOption = async (option)=>{


        const exists = await TopTenSchema.findOne({option});
        if(!exists){
            const result = await TopTenSchema.create({
                "underlying_ticker": option.underlying_ticker,
                "cfi": option.cfi,
                "contract_type": option.contract_type,
                "exercise_style": option.exercise_style,
                "expiration_date": option.expiration_date,
                "primary_exchange": option.primary_exchange,
                "shares_per_contract": option.shares_per_contract,
                "strike_price": option.strike_price,
                "ticker": option.ticker,
            });
            console.log(result);
        }
    }
    optionsList.forEach(option => addOption(option));
    if(data.next_url)
    {
        console.log('====NEXT PAGE====')
        // Uncomment line below to pull all api 
        //GetNextOptions(data.next_url)
    }

}

const GetNextOptions = async (url) => {
    const key = `&apiKey=${process.env.API_KEY}`;          
    const snapshot_link = url+key;
    console.log(snapshot_link);
    const response = await fetchOption(snapshot_link);
    const data = await response.json();
    console.log(data);
    var optionsList = data.results;
    console.log('=====Options=====');
    console.log(optionsList.length);
    



    const addOption = async (option)=>{


        const exists = await TopTenSchema.findOne({option});
        if(!exists){
            const result = await TopTenSchema.create({
                "underlying_ticker": option.underlying_ticker,
                "cfi": option.cfi,
                "contract_type": option.contract_type,
                "exercise_style": option.exercise_style,
                "expiration_date": option.expiration_date,
                "primary_exchange": option.primary_exchange,
                "shares_per_contract": option.shares_per_contract,
                "strike_price": option.strike_price,
                "ticker": option.ticker,
            });
            console.log(result);
        }
    }
    optionsList.forEach(option => addOption(option));
    if(data.next_url)
    {
        console.log('====NEXT PAGE====')
        GetNextOptions(data.next_url)
    }

}

module.exports = {findOldPwd, deleteOldPwd, GetOptions};