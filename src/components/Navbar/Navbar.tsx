import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";

export default function Navbar() {
  const auth = useAuth();
  const navigate = useNavigate();
  function logout() {
    auth.logout();
    navigate("/login");
  }

  return (
    <nav>
      <div className=" flex items-center justify-between mx-auto p-4 bg-primary border-b text-white">
        <div>
          <Link to="/">logo</Link>
        </div>
        <div className="container">
          <ul className="flex p-2 gap-3 ">
            <li className="">
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/remessas">Remessas</Link>
            </li>

            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>

        <div>
          <button onClick={() => logout()}>Sair</button>
        </div>
      </div>
    </nav>
  );
}
