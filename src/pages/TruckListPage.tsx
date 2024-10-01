import './TruckListPage.css';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import TruckList from '../components/TruckList';
import TruckForm, { TruckProps } from '../components/TruckForm';

function TruckListPage() {
  const [trucks, setTrucks] = useState<TruckProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTruck, setEditingTruck] = useState<TruckProps | null>(null);

  useEffect(() => {
    const loadTrucks = async () => {
      try {
        const response = await api.get('/api/Trucks');
        if (Array.isArray(response.data)) {
          setTrucks(response.data);
        } else {
          throw new Error('Dados inválidos recebidos da API.');
        }
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar caminhões.');
        console.error('Erro ao carregar caminhões:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTrucks();
  }, []);

  const handleEdit = (truck: TruckProps) => {
    setEditingTruck(truck);
  };

  const handleSave = async (truck: TruckProps) => {
    try {
      const response = await api.put(`/api/Trucks/${truck.id}`, truck);
      if (response.data) {
        setTrucks(trucks.map(t => (t.id === truck.id ? response.data : t)));
      }
    } catch (err: any) {
      console.error('Erro ao editar caminhão:', err);
      setError(err.message || 'Erro ao editar caminhão.');
    }
  };

  const handleDelete = async (truckId: string): Promise<void> => {
    try {
      await api.delete(`/api/Trucks/${truckId}`);
      setTrucks(trucks.filter(truck => truck.id !== truckId));
    } catch (error) {
      console.error('Erro ao deletar caminhão:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="TruckListPage-background min-h-screen flex flex-col items-center justify-center px-4">
      <main className="page-container my-10 mx-auto">
        <TruckList
          trucks={trucks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {editingTruck && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
              <TruckForm
                truck={editingTruck}
                onSave={handleSave}
                onCancel={() => setEditingTruck(null)} // Fecha o modal
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default TruckListPage;
