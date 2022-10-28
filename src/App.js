import "rsuite/dist/rsuite.min.css";
import "./styles.css";
import NavBar from "./Components/Nav/Nav";
import Login from './Pages/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import {useState} from 'react'
import LandingPage from "./Pages/LandingPage/LandingPage";
import Register from "./Pages/Register";
export default function App() {
  const [user, setUser] = useState(false)
  return (
    <div className="App">
      <NavBar user={user}/>
      <Routes>
        <Route path="/" element={user?<LandingPage />:<Login/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
      </Routes>
    </div>
  );
}
