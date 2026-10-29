


const verificEmailPassword = (email:string, password:string, setError:(arg:string)=>void):boolean=>{
       const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       
        setError("");
        if(!validEmail.test(email) && validPassword.test(password)){
           
          setError("Formato de email invalido")
          return false;

        }else if(validEmail.test(email) && !validPassword.test(password)){
          
          setError("Formato de senha incorreto \na senha deve conter 8 caracteres \nNo mínimo uma letra maíuscula e mínuscula\n,Numero e caractere especial");
          return false

        }else if(!validEmail.test(email) && !validPassword.test(password)){
           
          setError("Email e senha invalidos");
          return false;
        }

        return true;
        
    }


    export default verificEmailPassword;