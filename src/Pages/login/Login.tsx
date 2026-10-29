import styles from './Login.module.css'
import {useState, type ChangeEvent, type MouseEvent } from "react"
import { Link, useNavigate } from 'react-router-dom'
import ButtonDefault from "../../Components/ButtonDefault"
import InputDefault from "../../Components/InputDefault"
import CardLoginCreate from '../../Components/CardLoginCreate'
import verificEmailPassword from '../../util/VerificPasswordEmail'
import { userLogin as UserLogin } from '../../service/UserService'
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export type UserLogin = {
  name:string;
  id:number;
}

function Login() {
    
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [error,setError] = useState<string>("");

    const navigate = useNavigate();

     const context = useContext(UserContext);

        if (!context) {
            throw new Error("UserContext não encontrado");
        }

        const{setName, setId} = context;

       
    

    const handleSubmit = async(e: MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault()
      try {

        //verica se email e senhas são validos
       const verifyInputs:boolean = verificEmailPassword(email,password,setError);

       if(verifyInputs){
          const login:UserLogin = await UserLogin(email,password); 

          if(login.id !=0){
            setId(login.id);
            setName(login.name);
            console.log("Login Efetuado com sucesso")
            alert("Login realizado com sucesso");
            navigate("/dashboard");
          }else{
            setError("");
            setError("Usuário inválido ou não cadastrado")
          }
         
       }   
        
      } catch (error) {
        console.error("Não foi possível realizar o login: ", error);
        setError("Email ou senha invalidos");
      }
    }

  return (
    <div className={styles.container}>   

        {/*card da esquerda da pagina */}
        <div className={styles.leftCard}>
          <CardLoginCreate/>
        </div>

        {/*form login da esquerda*/}
        <div className={styles.RightCard}>

          {/*cabeçario do form de login*/}
          <div className={styles.titleLogin}>
            <div className={styles.goCreate}>
              <p>Ainda não tem conta?</p>
              <Link to={"/create"}>Criar conta</Link>
            </div>

            <span>BEM VINDO DE VOLTA</span>
            <h3>Entre na sua conta</h3>
            <p>Use seu e-mail e senha para acessar seu espaço pessoal</p>
          </div>
         <InputDefault
            label="Email"
            placeholder="voce@exemple.com"
            type="email" 
            onChange={(e:ChangeEvent<HTMLInputElement>)=> {
                e.preventDefault();
                setEmail(e.target.value)
            }}
        />
         <InputDefault
            label="Senha"
            placeholder="digite a sua senha"
            type="password" 
            onChange={(e:ChangeEvent<HTMLInputElement>)=> {
                e.preventDefault();
                setPassword(e.target.value)
            }}
        />
        {error &&(
          <>
          <p className={styles.ErrorMessage}>{error}</p>
          </>
        )}
        
        
        <ButtonDefault onPress={handleSubmit}  title="Entrar" color="#fff" backgroundColor="#285C4D" />
        </div>     
       
    </div>
  )
}

export default Login