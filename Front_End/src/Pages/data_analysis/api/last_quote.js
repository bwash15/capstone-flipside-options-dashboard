import lastQuoteAxios from 'axios'

// PORT can me manipulated to match what we are running our JSON server on for testing

export default lastQuoteAxios.create({
    baseURL: 'http://localhost:4400'
});