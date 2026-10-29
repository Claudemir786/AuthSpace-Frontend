import { createContext, useState, type ReactNode } from "react";



type UserContextType = {
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  id: number | null;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
};

type Props ={
    children:ReactNode;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({children}:Props)=>{

    const [name,setName] = useState<string | null>(null);
    const [id,setId] = useState<number | null>(null);

    return(
        <UserContext.Provider value={{name,setName,id,setId}}>
            {children}
        </UserContext.Provider>
    )
}