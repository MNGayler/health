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
import UserFoodItems from "./pages/UserFoodItems";
import UserAllFoodItems from "./pages/UserAllFoodItems";
import UserMyFoodItems from "./pages/UserMyFoodItems";
import UserAddItem from "./pages/UserAddItem"
import ViewUserFoodItem from "./pages/ViewUserFoodItem"


function App() {
  

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* routes for global items */}
          <Route path="/globalfooditems" element={<GlobalFoodItems />} />
          <Route path="/globaladditem" element={<GlobalAddItem />} />
          <Route path="/viewglobalfooditem/:id" element={<ViewGlobalFoodItem />} />
          {/* routes for user items */}
          <Route path="/userfooditems" element={<UserFoodItems />} />
          <Route path="/usermyfooditems" element={<UserMyFoodItems />} />
          <Route path="/userallfooditems" element={<UserAllFoodItems />} />
          <Route path="/useradditem" element={<UserAddItem />} />
          <Route path="/viewuserfooditem/:id" element={<ViewUserFoodItem />} />
          

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
