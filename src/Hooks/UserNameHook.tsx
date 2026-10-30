import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";

export type UserInfo = {
    name:string | null;
    idUser:number | null;
}

//hook que sempre traz o nome e id do usuário slavo no context
function UserNameHook():UserInfo{

    const context = useContext(UserContext);
        const [nameUser,setNameUser] = useState<string | null>("")
        const [id,setId] = useState<number | null>(null);
    
        useEffect(()=>{
            readContext();
    
        },[]);
       
        //verifica o contexto e set o nome do usuário;
        function readContext(){
             
            if(!context){
                console.error("context não econtrado");
                
            }else{
                const {name, id} = context;
                console.log("nome do usuário: ", name);
                setNameUser(name);
                setId(id);            
            }
            
            }

            const user:UserInfo ={name:nameUser,idUser:id}

        return user;          
}

export default UserNameHook