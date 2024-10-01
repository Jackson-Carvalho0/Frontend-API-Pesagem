import { useEffect, useState, useRef, FormEvent } from 'react';
import { api } from '../services/api';
import './TruckRegistration.css'; 

interface TruckProps {
  id: string;
  name: string;
  licensePlate: string;
  supplier: string;
  inputWeight: string;
  exitWeight: string;
  netWeight: string;
  amount: string;
}

const TruckRegistration = () => {
  const [editingTruck, setEditingTruck] = useState<TruckProps | null>(null);
  const [trucks, setTrucks] = useState<TruckProps[]>([]);
  const [tempExitWeight, setTempExitWeight] = useState<string>('');
  const [isExitWeightEnabled, setIsExitWeightEnabled] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const licensePlateRef = useRef<HTMLInputElement | null>(null);
  const supplierRef = useRef<HTMLInputElement | null>(null);
  const inputWeightRef = useRef<HTMLInputElement | null>(null);
  const exitWeightRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);

  const calculateNetWeight = (inputWeight: number, exitWeight: number): number => {
    return inputWeight - exitWeight;
  };

  const loadTrucks = async () => {
    try {
      const response = await api.get('/api/Trucks');
      setTrucks(response.data);
    } catch (err) {
      console.error('Failed to load trucks:', err);
    }
  };

  useEffect(() => {
    loadTrucks();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    const licensePlate = licensePlateRef.current?.value;
    const supplier = supplierRef.current?.value;
    const inputWeight = inputWeightRef.current?.value;
    const exitWeight = tempExitWeight || '0';
    const amount = amountRef.current?.value;

    if (!name || !licensePlate || !supplier || !inputWeight || !amount) return;

    const inputWeightNum = parseFloat(inputWeight);
    const exitWeightNum = parseFloat(exitWeight);
    const netWeight = calculateNetWeight(inputWeightNum, exitWeightNum);

    if (editingTruck) {
      try {
        const response = await api.put(`/api/Trucks/${editingTruck.id}`, {
          name,
          licensePlate,
          supplier,
          inputWeight,
          exitWeight,
          netWeight: netWeight.toFixed(2),
          amount,
        });

        setTrucks(allTrucks =>
          allTrucks.map(truck =>
            truck.id === editingTruck.id ? response.data : truck
          )
        );
        setEditingTruck(null);
        setTempExitWeight('');
      } catch (err) {
        console.error('Failed to update truck:', err);
      }
    } else {
      try {
        const response = await api.post('/api/Trucks', {
          name,
          licensePlate,
          supplier,
          inputWeight,
          exitWeight: '0',
          netWeight: netWeight.toFixed(2),
          amount,
        });

        setTrucks(allTrucks => [...allTrucks, response.data]);
        setIsExitWeightEnabled(true);
      } catch (err) {
        console.error('Failed to create truck:', err);
      }
    }

    // Limpa os campos
    if (nameRef.current) nameRef.current.value = '';
    if (licensePlateRef.current) licensePlateRef.current.value = '';
    if (supplierRef.current) supplierRef.current.value = '';
    if (inputWeightRef.current) inputWeightRef.current.value = '';
    if (exitWeightRef.current) exitWeightRef.current.value = '';
    if (amountRef.current) amountRef.current.value = '';
  };

  const handleExitWeightUpdate = () => {
    if (exitWeightRef.current?.value) {
      setTempExitWeight(exitWeightRef.current.value);
    }
  };

  const handleNameChange = () => {
    const name = nameRef.current?.value;
    if (name) {
      const foundTruck = trucks.find(truck => truck.name.toLowerCase() === name.toLowerCase());
      if (foundTruck) {
        licensePlateRef.current!.value = foundTruck.licensePlate;
        supplierRef.current!.value = foundTruck.supplier;
        inputWeightRef.current!.value = foundTruck.inputWeight;
        exitWeightRef.current!.value = foundTruck.exitWeight;
        amountRef.current!.value = foundTruck.amount;
        setEditingTruck(foundTruck);
        setIsExitWeightEnabled(true);
      } else {
        licensePlateRef.current!.value = '';
        supplierRef.current!.value = '';
        inputWeightRef.current!.value = '';
        exitWeightRef.current!.value = '';
        amountRef.current!.value = '';
        setEditingTruck(null);
        setIsExitWeightEnabled(false);
      }
    }
  };

  return (
    <div className="TruckRegistration-background">
      <main className="main">
      <h1 className="text-4xl font-medium text-white">Registrar Pesagem</h1>
        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label>Nome do motorista:</label>
          <input
            type="text"
            placeholder="Digite o nome do motorista..."
            ref={nameRef}
            onChange={handleNameChange}
          />

          <label>Placa:</label>
          <input
            type="text"
            placeholder="Digite a placa do veículo..."
            ref={licensePlateRef}
          />

          <label>Fornecedor:</label>
          <input
            type="text"
            placeholder="Digite a empresa fornecedora..."
            ref={supplierRef}
          />

          <label>Peso de entrada:</label>
          <input
            type="number"
            step="10"
            placeholder="Digite o peso de entrada..."
            ref={inputWeightRef}
          />

          <label>Peso de saída:</label>
          <input
            type="number"
            step="10"
            placeholder="Digite o peso de saída..."
            ref={exitWeightRef}
            onChange={handleExitWeightUpdate}
            disabled={!isExitWeightEnabled}
          />

          <label>Quantidade de animais:</label>
          <input
            type="number"
            step="1"
            placeholder="Digite a quantidade de animais descarregados..."
            ref={amountRef}
          />

          <input
            type="submit"
            value={editingTruck ? 'Atualizar Pesagem' : 'Salvar Pesagem'}
          />
        </form>
      </main>
    </div>
  );
};

export default TruckRegistration;
