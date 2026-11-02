import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import type { UserInfo } from '../../Hooks/UserNameHook';
import UserNameHook from '../../Hooks/UserNameHook';
import { useEffect, useState } from 'react';
import { getUserEmail } from '../../service/UserService';


function Dashboard() {

  const[email,setEmail] = useState<string>("");
  const user:UserInfo = UserNameHook();

  useEffect(()=>{
    emailUser();
  },[user.idUser]);

  async function emailUser():Promise<void>{
    try {
      
        const userEmail:string = await getUserEmail(user.idUser === null ? 0 : user.idUser);

      if(userEmail.length > 0){
        setEmail(userEmail);
      }else{
        console.log("Email retornou vazio");
      }
      
    } catch (error) {
      console.error("Falaha ao trazer email do usuário")
    }

  }

  return (
    <div className={styles.container}>
      
      {/*Cabeçário e titula da página */}
      <div className={styles.header}>
          <p>VISÃO GERAL</p>
          <h2>Olá {user.name}👋</h2>
          <p>que bom ver você, Aqui está um resumo da sua conta.</p>
      </div>
      
      {/*Card principal */}
      <div className={styles.mainCard}>
          
          {/*Primeira linha */}
          <div className={styles.rowOne}>

            <div className={styles.icon}>
                <p>{user.name === null ? "" : user.name[0] }</p>
            </div>
            <div className={styles.userName}>
                <p className={styles.name}>{user.name}</p>
                <p>seu perfil pessoal</p>
            </div>
          </div>

          {/*Segunda linha */}
          <div className={styles.rowTwo}>

              <div className={styles.infoEmail}>
                  <p>E-mail da conta</p>
                  <p>{email}</p>
              </div>

              <div className={styles.infoDateCreate}>
                  <p>Membro desde</p>
                  <p>data</p>
              </div>
          </div>
      </div>

      {/*Segundo card */}
      <div className={styles.secondCard}>
        <p className={styles.secondCardTitle}>Sua conta do seu jeito</p>

          <div className={styles.alterEmail}>

              <div className={styles.iconEmail}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
              </div>
              <div className={styles.email}>
                <p>Mantenha seu e-mail em dia</p>
                <p>confira ou altere o endereço que você usa para entrar na sua conta</p>
                <Link to={"/config"}>Alterar e-mail</Link>
              </div>

          </div>

          <div className={styles.goConfig}>
            
            <div className={styles.iconEmail}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 17H5"/><path d="M19 7h-9"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
            </div>

            <div className={styles.config}>
                <p>Você está no controle</p>
                <p>Gerencie seus dados e as opções da sua conta em um só lugar</p>
                <Link to={"/config"}>Abrir configurações</Link>
            </div>


          </div>

      </div>

    </div>
  )
}

export default Dashboard