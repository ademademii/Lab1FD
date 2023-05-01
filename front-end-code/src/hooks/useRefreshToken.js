import axios from "../api/axios";
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post('/api/authmanagement/refreshtoken', {},{
            withCredentials: true
        });
        setAuth(prev => {
            console.log(prev)
            return { 
                ...prev, 
                roles: response.data.roles,
                accessToken: response.data.token }
        });
        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;