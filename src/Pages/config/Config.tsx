import { useContext, useEffect, useState, type ChangeEvent, type MouseEvent } from 'react'
import ButtonDefault from '../../Components/ButtonDefault'
import InputDefault from '../../Components/InputDefault'
import styles from './Config.module.css'
import type { UserInfo } from '../../Hooks/UserNameHook';
import UserNameHook from '../../Hooks/UserNameHook';
import { deleteUser, getUserEmail, updateEmailUser } from '../../service/UserService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';


function Config() {

  const [email,setEmail] = useState<string>("");
  const [newEmail,setNewEmail] = useState<string>("")
  const [modal,setModal] = useState<boolean>(false);


  const navigate = useNavigate();

  //guarda os dados do contexto para ser utilizado para limpar os dados quando excluir a conta
  const context = useContext(UserContext)
 

  //pega info do usuário
  const user:UserInfo = UserNameHook();

  useEffect(()=>{
     
      readUser();

  },[user.idUser])

  //retorna o email do usuário para exibição;
   const readUser = async():Promise<void>=>{
      console.log("estou aqui com o id:", user.idUser);
     try {

      const infoUser:string = await getUserEmail(user.idUser == null ? 0 : user.idUser);

      if(infoUser.length > 0){
        setEmail(infoUser);
      }else{
        console.log("Email retornou vazio");
      }
      
     } catch (error) {
      console.error("Error: ", error);
     }  
  }

  //altera o email e set o novo e-mail para exibição;
  const handleNewEmail = async():Promise<void>=>{
    try{

      const update:boolean = await updateEmailUser(user.idUser == null? 0 : user.idUser, newEmail);

      if(update){
        console.log("Email alterado com sucesso");
        alert("E-mail alterado com sucesso");
        setEmail(newEmail);

      }else{
        console.log("Email não foi alterado")
      }

    }catch(error){
      console.error("Erro: ", error);
    }
  }

  const handleDelete = async():Promise<void>=>{
    try {

      const delUser:boolean = await deleteUser(user.idUser == null? 0 : user.idUser);

      if(delUser){
        console.log("usuário excluído");
        if(!context){
          console.error("falha ao buscar o context")
        }else{
          const {setId,setName} = context
          setId(null);
          setName(null);
          alert("Usuário excluido");
          navigate("/");
        }

       

      }else{
        console.log("Usuário não foi excluido");
      }
      
    } catch (error) {
      console.error("Error: ", error)
    }
  }




  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <p>preferências</p>
        <h2>Configurações da conta</h2>
        <p>mantenha seus dados atualizados e gerencie sua conta com tranquilidade</p>
      </div>

      <div className={styles.card}>
        
        <div className={styles.rowOne}>
          <div className={styles.iconEmail}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
          </div>
         <div className={styles.detailsRowOne}>
            <p>E-mail da conta</p>
            <p>Este é o endereço que você usa para entrar e receber nossas menssagens</p>
          </div>
        </div>

        <div className={styles.rowTwo}>
          <p>E-mail atual</p>
          <p>{email}</p>
        </div>
        
        <div className={styles.rowThree}>
          {/*Campo de digitação de um novo email*/}
          <InputDefault 
            label='Novo e-mail' 
            placeholder='Digite seu novo e-mail'
            type='email'
            onChange={(e:ChangeEvent<HTMLInputElement>)=>{
              e.preventDefault();
              setNewEmail(e.target.value);
            }}
          />
          <div className={styles.button}>
            <ButtonDefault 
              title='Salvar novo e-mail' 
              color='#fff'
              backgroundColor='#285C4D'
              onPress={(e:MouseEvent<HTMLButtonElement>):void=>{
                handleNewEmail();
              }}
              />
          </div>
          
          <p>Enviaremos un link para confirmar o novo endereço.Até lá, seu e-mail atual continua valido</p>
          
        </div>
      </div>

      <div className={styles.cardTwo}>
        <div>
          <p>Excuir minha conta</p>
          <p>A exclusão remove permanentemente sua conta e seus dados pessoais</p>
          <p>Voceê perderá o acesso e não poderá desfazer esta ação</p>
        </div>
        <div className={styles.button}>
          <ButtonDefault
            title='Excluir minha conta'
            color='red'
            backgroundColor='#fff'
            onPress={(e:MouseEvent<HTMLButtonElement>)=>{
                setModal(true);
            }}
          />
        </div>

      </div>
      {modal &&(
         <div className={styles.modal}>
        <div>
            <h2>Tem certeza que deseja excluir a conta?</h2>

            <p>
                Essa ação removerá permanentemente sua conta e seus dados.
                Não será possível desfazer essa operação.
            </p>

            <div className={styles.modalActions}>
                <button
                    className={styles.cancelButton}
                    onClick={() => setModal(false)}
                >
                    Cancelar
                </button>

                <button
                    className={styles.confirmButton}
                    onClick={() => handleDelete()}
                >
                    Confirmar exclusão
                </button>
            </div>
        </div>
    </div>
        
      )}

    </div>
  )
}

export default Config