import underlyingAssetAxios from 'axios'

// PORT can me manipulated to match what we are running our JSON server on for testing

export default underlyingAssetAxios.create({
    baseURL: 'http://localhost:4500'
});