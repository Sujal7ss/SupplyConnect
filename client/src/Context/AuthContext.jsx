import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('accessToken') || '');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  

    const storeTokenInLS = (serverToken) => {
        localStorage.setItem('accessToken', serverToken);
        setToken(serverToken);
    }

    let isLoggedIn = !!token;

    const logout = () => {
        localStorage.removeItem('accessToken');
        setToken("");
    }

    const userAuthentication = async () => {
        try {
            const url = import.meta.env.BACKEND_URL;
            const response = await axios.get(`${url}/api/auth/getuser`, {
                headers: {
                    'Authorization': `${token}`
                }                
            });
            const userData = response.data;
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
        userAuthentication();
    },[token])
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



