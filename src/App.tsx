import "./index.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider/auth";
import Login from "./pages/Login/Index";

function App() {
  const isAuth = useContext(AuthContext);

  {
    if (isAuth.isAuthenticate) {
      return (
        <>
          <div className="bg-primary h-screen ">
            <Navbar />

            <div className="">
              <Outlet />
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <Login />
    </>
  );
}

export default App;
