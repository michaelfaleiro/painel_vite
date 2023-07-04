import "./index.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
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

export default App;
