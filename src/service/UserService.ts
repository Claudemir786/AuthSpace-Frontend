import type { UserLogin } from "../Pages/login/Login";


const URL = "http://localhost:3000/api/";


type User = {
    success:string;
    message:string;
    user:{id:number,name:string,email:string,token:string}

}

export async function userLogin(email:string,password:string):Promise<UserLogin>{

    try {

        const res = await fetch(`${URL}login`,{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({email,password})
        });

        if(!res.ok)throw new Error("Falha ao encontrar cadastro de usuário");

        const user:User= await res.json();

        console.log("Login realizado com sucesso");

        const user_login:UserLogin ={name:user.user.name, id:user.user.id} 
        
        return user_login;
        
    } catch (error) {
        console.error("Erro: ", error);
        const user_login:UserLogin ={name:"", id:0} 
        return user_login;
    }

}


export async function userCreate(name:string,email:string,password:string):Promise<boolean>{
    
    try {

        const res = await fetch(`${URL}create`, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name,email,password})
        });

        if(!res.ok)throw new Error("Não foi possível criar usuário na base de dados");
        
        console.log("Usuário criado com sucesso na base de dados ");

        return true;
    } catch (error) {
        console.error("Erro: ", error);
        return false;        
    }
}


type GetUser = {
    success:boolean;
    message:string;
    user:{id:number,name:string, email:string}
} 

export async function getUserEmail(id:number):Promise<string>{

    try {

        const res  = await fetch(`${URL}get/user?id=${id}`,{
            method:"GET",

        } );

        if(!res.ok)throw new Error("Falha ao buscar dados do usuário");

        const user:GetUser = await res.json();

        return user.user.email;
        
    } catch (error) {
        console.error("Error: ", error);
        return"";
    }

}