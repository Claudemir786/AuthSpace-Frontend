import { Link } from 'react-router-dom'
import Logo from './Logo'
import styles from './Navbar.module.css'
import UserNameHook, { type UserInfo } from '../Hooks/UserNameHook'


function Navbar() {
   
    const nameUser:UserInfo= UserNameHook();


  return (
    <div className={styles.container}>
        {/*Logo */}
        <div className={styles.logo}>
            <Logo/>
        </div>

        {/*botões ou links de navegação */}
        <div className={styles.navigation}>

            <Link to={"/dashboard"}>Visão geral</Link>
            <Link to={"/config"}>Configurações</Link>
            
        </div>

        <div className={styles.cardHelp}>
            <p className={styles.titleCard}>Podemos ajudar?</p>
            <p>Conta com a gente para cuidar da sua conta</p>
            <Link to={"/dashboard"}>Falar com o suporte</Link>
        </div>

        <div className={styles.logout}>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 12h11"/><path d="m17 16 4-4-4-4"/><path d="M21 6.344V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.344"/></svg></span>
            <button>Sair da conta</button>
        </div>

        <div className={styles.name}>
            <p>{nameUser.name}</p>
            <p>Conta pessoal</p>
        </div>




    </div>
  )
}

export default Navbar