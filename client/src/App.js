import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import GlobalFoodItems from "./pages/GlobalFoodItems";
import Home from "./pages/Home"
import GlobalAddItem from "./pages/GlobalAddItem";
import UserLogin from "./pages/UserLogin"
import AdminLogin from "./pages/AdminLogin"
import UserHome from "./pages/UserHome";
import AdminHome from "./pages/AdminHome";
import RegisterAdmin from "./pages/RegisterAdmin"
import UserRegister from "./pages/UserRegister"
import ViewGlobalFoodItem from "./pages/ViewGlobalFoodItem";


function App() {
  

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* routes for global items */}
          <Route path="/globalfooditems" element={<GlobalFoodItems />} />
          <Route path="/globaladditem" element={<GlobalAddItem />} />
          <Route path="/viewglobalfooditem/:id" element={<ViewGlobalFoodItem />} />

          {/* other routes */}
          <Route path="/" element={<Home />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/registeradmin" element={<RegisterAdmin/>} />
          <Route path="/userregister" element={<UserRegister />} />

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
