import "rsuite/dist/rsuite.min.css";
import "./styles.css";
import Nav from "./Components/Nav/Nav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

import LandingPage from "./Pages/LandingPage/LandingPage";
export default function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}
