import postsAxios from 'axios'


// PORT can me manipulated to match what we are running our JSON server on for testing

export default postsAxios.create({
    baseURL: 'http://localhost:3200'
});