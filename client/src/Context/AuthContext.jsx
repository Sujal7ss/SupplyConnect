import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('accessToken') || '');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);

    const storeTokenInLS = (serverToken) => {
        localStorage.setItem('accessToken', serverToken);
        setToken(serverToken);
    }

    const logout = () => {
        localStorage.removeItem('accessToken');
        setToken("");
        setUser(null);
    };

    const userAuthentication = async () => {
        try {
            const url = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.get(`${url}/api/auth/getuser`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true      
            });
            console.log("response", response);
            const userData = response.data.data;

            if (userData) {
                setUser(userData);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error in verifyJWT middleware:", error);
            
        } finally {
            setLoading(false);  
        }
    };
    useEffect(() => {
        if (token) {
            userAuthentication();
        } else {
            setUser(null);
            setLoading(false);
        }
    }, [token]);
    useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token]);
    return (
        <AuthContext.Provider value={{ storeTokenInLS, isLoggedIn, logout, user, loading, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    return useContext(AuthContext);
}

// Basic Template for the context 

// import { createContext, useContext } from "react";


// export const Authcontext = createContext({});


// export const AuthProvider  = ({children}) => {
    
//     return <Authcontext.Provider value={{}}>
//         {children}
//     </Authcontext.Provider>
// }


// export const useAuth = () =>{
//     return useContext(Authcontext);
// }



