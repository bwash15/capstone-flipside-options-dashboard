import dayApi from 'axios'

// PORT can me manipulated to match what we are running our JSON server on for testing

export default dayApi.create({
    baseURL: 'https://62ed81fca785760e676bf815.mockapi.io/'
});