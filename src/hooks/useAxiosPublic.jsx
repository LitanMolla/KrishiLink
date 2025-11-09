import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:3000'
});

const useAxiosPublic = () => {
    return instance
}
export default useAxiosPublic