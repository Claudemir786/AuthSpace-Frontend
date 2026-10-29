import { BrowserRouter,Route, Routes } from "react-router-dom"
import Login from "./Pages/login/Login"
import Create from "./Pages/create/Create"
import Dashboard from "./Pages/dashboard/Dashboard"
import { UserContext } from "./Context/UserContext"
import { useContext } from "react"


function App() {

  //utiliza o contexto criado
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext não encontrado");
  }
  const{id} = context;

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/create" element={<Create/>}/>            
            <Route path="/dashboard" element={<Dashboard/> }/>
              
            
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App