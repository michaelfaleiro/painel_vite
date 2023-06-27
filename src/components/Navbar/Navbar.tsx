import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="w-full flex items-center justify-between mx-auto p-4 bg-primary border-b text-white">
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

        <div>Sair</div>
      </div>
    </nav>
  );
}
