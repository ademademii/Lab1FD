import { Link } from 'react-router-dom';
import './styles/AppNavbar.css';
import useLogout from './hooks/useLogout';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AppNavbar = (props) => {

  const roles = localStorage.getItem('roles');

  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate('/');
  }

  let menu = '';


  if (roles !== null) {
    if (roles.includes('Klient')) {
      menu = (
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/shfletoRestorantet" className="nav-link">
                Shfleto Restaurantet
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/klientidashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/kontakto" className="nav-link">
                Kontakto
              </Link>
            </li>
            <li className="nav-item m-2">
              <button onClick={signOut} className="btn btn-danger">Sign Out</button>
            </li>
            <li onClick={() => { props.setShow(!props.show) 
              console.log(props.size)
            }}>
              <div className="cart">
                <span>
                  <i className="fas fa-cart-plus"></i>
                </span>
                <span>{props.size}</span>
              </div>
            </li>
          </ul>
        </div>
      )
    } else if (roles.includes('Administrator')) {
      menu = (
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item m-2">
              <button onClick={signOut} className="btn btn-danger">Sign Out</button>
            </li>
          </ul>
        </div>
      )
    } else if (roles.includes('Transportues')) {
      menu = (
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/kontakto" className="nav-link">
                Kontakto
              </Link>
            </li>
            <li className="nav-item m-2">
              <button onClick={signOut} className="btn btn-danger">Sign Out</button>
            </li>
            <li>
              <div className="cart" onClick={() => { props.setShow(!props.show) }}>
                <span>
                  <i className="fas fa-cart-plus"></i>
                </span>
                <span>{props.size}</span>
              </div>
            </li>
          </ul>
        </div>
      )
    } else if (roles.includes('Restorant')) {
      menu = (
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/restorantiDashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/kontakto" className="nav-link">
                Kontakto
              </Link>
            </li>
            <li className="nav-item m-2">
              <button onClick={signOut} className="btn btn-danger">Sign Out</button>
            </li>
            <li>
              <div className="cart" onClick={() => { props.setShow(!props.show) }}>
                <span>
                  <i className="fas fa-cart-plus"></i>
                </span>
                <span>{props.size}</span>
              </div>
            </li>
          </ul>
        </div>
      )
    }
  }


  return (

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <Link to="/" class="navbar-brand text-primary">
          ckapohajna
        </Link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          {menu}
        </div>
      </div>
    </nav>
  )
}

export default AppNavbar
