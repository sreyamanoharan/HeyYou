import './App.css'
import Register from './Components/Register'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import VerifyOtp from './Components/VerifyOtp'
// import Chat from './Components/Chat'
import ChatProvider from './Context/ChatProvider'
// import MyChats from './Components/MyChats'
// import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'

function App() {


  return (
    <>
   
    <Router>
    <ChatProvider>
      <Routes>
        <Route path='/register' element={ <Register/>}/>
        <Route path='/login' element={ <Login/>}/>
        <Route path='/' element={ <Home/>}/>
        <Route path='/verify-otp' element={ <VerifyOtp/>}/>
         <Route path='/chats' element={ <ChatPage/>}/>
      </Routes>
      </ChatProvider>
    </Router>
 
    </>
  )
}

export default App
