import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Login_user from './Components/Login/Login_user';
import SignUp from './Components/SignUp/SIgnUp';
import ProtectedRoute from "./Components/Authentication/ProtectedRoute";
import Dashboard from "./Components/Home/Dashboard";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login_user />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<Login_user />} />
        <Route
          path="/User"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
