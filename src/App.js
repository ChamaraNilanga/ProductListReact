import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import SignUp from './Components/SignUpForm/SignUpForm';
import { useUserContext , UserProvider } from './ContextApi/UserContext';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import  PrivateRoute  from './Components/PrivateRoute/PrivateRoute';
import PublicRoute from './Components/PrivateRoute/PublicRoute';
import Profile from './Components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Routes>
            
            <Route path="/login" element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
                } />
            
            <Route path="/signup" element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
              } />
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
