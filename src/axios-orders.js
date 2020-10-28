import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burgerapp-c0935.firebaseio.com/'
})

export default instance;