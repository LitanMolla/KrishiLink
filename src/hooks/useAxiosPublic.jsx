import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://krishilink-api.vercel.app'
});

const useAxiosPublic = () => {
    return instance
}
export default useAxiosPublic