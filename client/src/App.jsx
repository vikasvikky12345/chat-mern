import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import SignUp from "./pages/Signup/SignUp"
import Login from "./pages/Login/Login"
function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
