import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <div className="bg-primary w-full">
        <Navbar />
        <div className="min-h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
