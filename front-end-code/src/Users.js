import { useState, useEffect } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import useLogout from "./hooks/useLogout";

const Users = () => {
    const [ users, setUsers ] = useState();
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const navigate = useNavigate();

    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/');
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try{
                const response = await axiosPrivate.get('/api/setup/GetAllUsers', {
                    signal: controller.signal
                });
                isMounted && setUsers(response.data);
            }catch(err){
                console.error(err);
                navigate('/', { state: {from: location }, replace: true })
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    return ( 
        <article>
            <button onClick={signOut} className="btn btn-danger">Sign Out</button>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.userName}</li>)}
                    </ul>
                ) : <p>No Users to display!</p> 
            }
        </article>
     );
}
 
export default Users;