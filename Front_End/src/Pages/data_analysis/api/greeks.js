import greeksAxios from 'axios'

// PORT can me manipulated to match what we are running our JSON server on for testing

export default greeksAxios.create({
    baseURL: 'http://localhost:4300'
});