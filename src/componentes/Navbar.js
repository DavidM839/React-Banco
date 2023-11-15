import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">


        <Link className="navbar-brand" to="HomePage">Inicio</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/Cliente">Cliente</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Cuenta">Cuenta</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Transaccion">Transaccion</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/GraficoDepositos">GraficoDepositos</Link>
            </li><li className="nav-item">
              <Link className="nav-link" to="/GraficoRetiros">GraficoRetiros</Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;