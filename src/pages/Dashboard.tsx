import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-background">
      <div className="container">
        <h1 className="text-4xl font-medium text-white">Sistema de Pesagem</h1>
        <p className="mt-4 text-white">
          Bem-vindo ao sistema! Aqui você pode registrar e controlar as pesagens
          de caminhões com facilidade.
        </p>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-white">Acesso Rápido</h2>
          <div className="access-quick">
            <div className="bg-gray-700 p-4 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-medium text-white">Registrar Peso</h3>
              <Link to="/register" className="text-green-400 hover:underline">
                Registrar Caminhão
              </Link>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-medium text-white">Ver Pesagens Registradas</h3>
              <Link to="/trucks" className="text-green-400 hover:underline">
                Lista de Caminhões
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
