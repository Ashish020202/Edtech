import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes ,Route } from "react-router";
import Signup from './Components/Signup.tsx';
import Login from './Components/Login.tsx';
import TDashboard from './Components/TDashboard.tsx';
import SDashboard from './Components/Sdashboard.tsx';
import UserList from './Components/UserLists.tsx';
import UpdateUserProfile from './Components/Userupdate.tsx';


createRoot(document.getElementById('root')!).render(
  
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/userlist" element={<UserList />}/>
      <Route path="/updateuser/:id" element={<UpdateUserProfile />}/>
      <Route path="/Tdashboard" element={<TDashboard />}/>
      <Route path="/Sdashboard" element={<SDashboard />}/>
    </Routes>
    </BrowserRouter>
  
)
