import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./components/Register";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/user-list" element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />

        <Route path="/edit/:id" element={
                    <ProtectedRoute>
                      <EditUser />
                    </ProtectedRoute>
                  }
                />
        </Routes>
    </BrowserRouter>
  );
}

export default App;