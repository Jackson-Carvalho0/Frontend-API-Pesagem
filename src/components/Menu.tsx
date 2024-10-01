import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <Link to="/" className="text-white mr-4">
        Página Inicial
      </Link>
      <Link to="/register" className="text-white mr-4">
        Registrar Pesagem
      </Link>
      <Link to="/trucks" className="text-white">
        Lista De Pesagens 
      </Link>
    </nav>
  );
};

export default Menu;