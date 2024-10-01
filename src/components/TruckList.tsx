import { TruckProps } from '../components/TruckForm';
import { useState } from 'react';



interface TruckListProps {
  trucks: TruckProps[];
  onEdit: (truck: TruckProps) => void;
  onDelete: (id: string) => Promise<void>;
}

const TruckList: React.FC<TruckListProps> = ({ trucks, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [expandedTruckId, setExpandedTruckId] = useState<string | null>(null);

  const filteredTrucks = trucks.filter(truck =>
    truck.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleDetails = (id: string) => {
    setExpandedTruckId(expandedTruckId === id ? null : id);
  };

  return (
    <div className="truck-list-container mt-6 bg-gray-800 bg-opacity-75 p-4 rounded-lg shadow-lg">
      <h1 className="text-4xl font-medium text-white mb-4">Editar Pesagem</h1>
      <input
        type="text"
        placeholder="Buscar motorista"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
      />
      <div className="truck-list">
        {filteredTrucks.length === 0 ? (
          <p className="text-red-500">Motorista não registrado.</p>
        ) : (
          <ul className="space-y-2">
            {filteredTrucks.map(truck => (
              <li key={truck.id} className="bg-gray-700 shadow-lg rounded-lg p-4">
                <div onClick={() => handleToggleDetails(truck.id)} className="cursor-pointer">
                  <h3 className="text-white font-semibold">{truck.name}</h3>
                </div>
                <div className={`transition-all duration-300 text-white ${expandedTruckId === truck.id ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                  <p>Placa: <span className="font-medium">{truck.licensePlate}</span></p>
                  <p>Fornecedor: <span className="font-medium">{truck.supplier}</span></p>
                  <p>Peso de Entrada: <span className="font-medium">{truck.inputWeight} kg</span></p>
                  <p>Peso de Saída: <span className="font-medium">{truck.exitWeight} kg</span></p>
                  <p>Peso Líquido: <span className="font-medium">{truck.netWeight} kg</span></p>
                  <p>Quantidade de Animais: <span className="font-medium">{truck.amount}</span></p>
                  <div className="flex space-x-2 mt-2">
                    <button onClick={() => onEdit(truck)} className="bg-blue-500 text-white rounded px-2 py-1">Editar</button>
                    <button onClick={async () => {
                      const confirmDelete = window.confirm('Tem certeza que deseja excluir este caminhão?');
                      if (confirmDelete) {
                        await onDelete(truck.id!);
                      }
                    }} className="bg-red-500 text-white rounded px-2 py-1">Excluir</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TruckList;
