import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import Sidebar from "./Components/Sidebar/Sidebar"
import Add from "./Pages/Add/Add"
import List from "./Pages/List/List"
import Order from "./Pages/Orders/Order"
import { ToastContainer ,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Order url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
