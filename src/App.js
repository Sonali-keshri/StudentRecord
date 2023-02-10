import Navbar from "./Component/navabar/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./Component/details/Details.js";
import ManagePage from "./Component/managepage/ManagePage.jsx";
import AddStudent from "./Component/addstudent/AddStudent.jsx";
import EditPage from "./Component/editpage/EditPage.js";
import Login from "./Component/login/Login.js";
import Signup from "./Component/signup/Signup.js";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { Provider } from "react";
import {UserAuthContextPorvider} from './context/UserAuthContext'

import ProtectedRoute from './Component/protectedRoute/ProtectedRoute.js'

export const AppContext = createContext();

function App() {

  const date = new Date().toDateString();
  const time = new Date().toLocaleTimeString();

  const [currentTime, setCurrentTime] = useState(time);

  const updateTime = () => {
    const time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };
  setInterval(updateTime, 1000);

  return (
    <div sx={{ maxWidth: "100vw" }}>
      <AppContext.Provider value={{ date, currentTime }}>
        <Router>
          <UserAuthContextPorvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route element={<ProtectedRoute/>}>
            <Route path="nav" element={<Navbar />}>
              <Route path="managepage" element={<ManagePage />} />
              <Route path="addstudent" element={<AddStudent />} />
              <Route path="edit/:id" element={<EditPage />} />
              <Route path="detail/:id" element={<Details />} />
            </Route>
            </Route>
          </Routes>
          </UserAuthContextPorvider>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
