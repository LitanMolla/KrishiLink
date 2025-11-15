import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://krishilink-api.vercel.app' // live
    // baseURL: 'http://localhost:3000' // local
});

const useAxiosPublic = () => {
    return instance
}
export default useAxiosPublic