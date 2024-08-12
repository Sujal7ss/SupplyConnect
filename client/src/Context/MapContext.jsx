import { createContext, useContext } from "react";


export const MapContext = createContext({});

const
export const MapProvider  = ({children}) => {
    
    return <Authcontext.Provider value={{}}>
        {children}
    </Authcontext.Provider>
}


export const useAuth = () =>{
    return useContext(MapContext);
}


