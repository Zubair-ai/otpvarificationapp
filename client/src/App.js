import "./App.css";
import Home from "./Components/Homepage/Home";
import LoginPage from "./Components/LoginPage/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthenticationUserContext } from "./AuthContext.js/AuthContext";
import { useContext } from "react";

function App() {
  const ctx = useContext(AuthenticationUserContext);
  const { isAuthenticatedUser } = ctx;
  // console.log("isAuthenticatedUser", isAuthenticatedUser);
  return (
    <Router>
      {!isAuthenticatedUser &&
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
      }
      {isAuthenticatedUser && (
        <Routes>
          {" "}
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
