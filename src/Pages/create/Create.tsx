import { useState, type MouseEvent, type ChangeEvent } from 'react'
import CardLoginCreate from '../../Components/CardLoginCreate'
import InputDefault from '../../Components/InputDefault'
import styles from './Create.module.css'
import { Link, useNavigate } from 'react-router-dom'
import ButtonDefault from '../../Components/ButtonDefault'
import verificEmailPassword from '../../util/VerificPasswordEmail'
import { userCreate } from '../../service/UserService'


function Create() {

  const [name,setName] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [confirmPassword,setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");



  const navigate = useNavigate();


  const handleCreate = async(e:MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault();

      //verifica se os campos são validos
      const verifyInput = verificEmailPassword(email,password,setError);
      if(!verifyInput)return;
       
      setError("");
      if(password !== confirmPassword){
       
        console.log("Senhas não são iguais");
        setError("Senhas não coincidem");
        return
      }

      try {

        const create = await userCreate(name,email,password);

        if(create){
          console.log("Usuário criado com sucesso");
          alert("usuário criado com sucesso");
          navigate("/");
        
        }

      
      } catch (error) {
        console.error("Falha ao cirar usuário: ", error);
        
      }
      

  }


  return (
    <div className={styles.container}>

      <div className={styles.cardLeft}>
        <CardLoginCreate/>
      </div>

      <div className={styles.cardRight}>

          <div className={styles.titleLogin}>

            <div className={styles.goCreate}>
              <p>Já tem uma conta?</p>
              <Link to={"/"}>Entrar</Link>
            </div>

            <span>VAMOS COMEÇAR</span>
            <h3>Crie a sua conta</h3>
            <p>Só precisamos de alguns dados para preparar seu espaço pessoal</p>


             {/*Form de cadastro */}
      <div>
        <InputDefault
          label='Nome Completo' 
          type='text'
          placeholder='Como você se chama'
          onChange={(e: ChangeEvent<HTMLInputElement>)=>{
            e.preventDefault()
            setName(e.target.value);
          }}
            
        />
        <InputDefault
          label='Email' 
          type='email'
          placeholder='voce@exemple.com'
          onChange={(e: ChangeEvent<HTMLInputElement>)=>{
            e.preventDefault()
            setEmail(e.target.value);
          }}
            
        />
        <InputDefault
          label='Senha' 
          type='password'
          placeholder='Crie uma senha segura'
          onChange={(e: ChangeEvent<HTMLInputElement>)=>{
            e.preventDefault()
            setPassword(e.target.value);
          }}
            
        />
        <p className={styles.pass}>Use pelo menos 8 caracteres,com letras,numero e cararcter especial</p>
        <InputDefault
          label='Confirmar senha' 
          type='password'
          placeholder='Repita a senha'
          onChange={(e: ChangeEvent<HTMLInputElement>)=>{
            e.preventDefault()
            setConfirmPassword(e.target.value);
          }}
            
        />
        
        {error && (
          <p className={styles.error}>{error}</p>
        )}

        <ButtonDefault title='Criar minha conta' color='#fff' backgroundColor='#285C4D' onPress={handleCreate}/>
        
      </div>

          </div>
          
      </div>

     

    </div>
  )
}

export default Create