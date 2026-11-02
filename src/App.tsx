import styles from './App.module.css'
import { BrowserRouter,Route, Routes } from "react-router-dom"
import Login from "./Pages/login/Login"
import Create from "./Pages/create/Create"
import Dashboard from "./Pages/dashboard/Dashboard"
import { UserContext } from "./Context/UserContext"
import { useContext } from "react"
import Config from "./Pages/config/Config"
import Navbar from "./Components/Navbar"


function App() {

  //utiliza o contexto criado
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext não encontrado");
  }
  
  const{id} = context;
  console.log("id do usuário: ", id);

  return (
    <div>
        <BrowserRouter>
          <div className={styles.layout}>
            {id != null && (<Navbar/>)} 
          <main className={styles.content}>
            <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/create" element={<Create/>}/>    
            {/* rotas com condição caso o suário não esteja logado e setado o context  */}  
            <Route path="/dashboard" element={ id != null ? <Dashboard/> : <Login/> }/>
            <Route path="/config" element={id !=null ?<Config/> : <Login/>}/>
                          
          </Routes>
          </main> 
          </div>
          
          
        </BrowserRouter>
    </div>
  )
}

export default App