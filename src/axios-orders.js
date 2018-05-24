import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-b66dd.firebaseio.com/'
})

export default instance; 