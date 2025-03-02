// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    // <Router>
    //   {/* Routes */}
    //   <Routes>
    //     <Route path="/" element={<Navigate to="/register" />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //   </Routes>
    // </Router>

    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protect the dashboard route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
