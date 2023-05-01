import axios from "../api/axios";
import useAuth from "./useAuth";

const UseLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try{
            localStorage.removeItem('roles');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('id');
            const response = await axios.post('/api/authmanagement/logout', {}, {
                withCredentials: true
            });
        }catch (err) {
            console.error(err);
        }
    }

    return logout;
}
 
export default UseLogout;