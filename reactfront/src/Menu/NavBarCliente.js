import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../Store/AuthSlice";
import { useSelector } from "react-redux";

export const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.value);

  const logOutHandler = () => {
    dispatch(logOut());
    navigate("/Login");
  };

  const cuentaHandler = () => {
    navigate("/cuenta");
  };
  //agregar funcionalidades de lista de deseos, etc
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Menu</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Productos
            </Nav.Link>
            {role === 3 && (
              <Nav.Link as={Link} to="/orden">
                Ordenes
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/orden">
              Buscar Orden
            </Nav.Link>
            <Nav.Link as={Link} to="/usuario/deseo">
              Lista de deseados
            </Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={cuentaHandler}>
                Administrar Cuenta
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logOutHandler}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
