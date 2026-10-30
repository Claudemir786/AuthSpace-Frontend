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
            {id && (<Navbar/>)} 
          <main className={styles.content}>
            <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/create" element={<Create/>}/>       
            <Route path="/dashboard" element={<Dashboard/> }/>
            <Route path="/config" element={<Config/>}/>
                          
          </Routes>
          </main> 
          </div>
          
          
        </BrowserRouter>
    </div>
  )
}

export default App