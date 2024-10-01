import React, { useState, useEffect } from 'react';
import './TruckForm.css';

export interface TruckProps {
  id: string;
  name: string;
  licensePlate: string;
  supplier: string;
  inputWeight: number;
  exitWeight: number;
  netWeight: number;
  amount: number;
}

interface TruckFormProps {
  truck?: TruckProps;
  onSave: (truck: TruckProps) => Promise<void>;
  onCancel: () => void;
}

const TruckForm: React.FC<TruckFormProps> = ({ truck, onSave, onCancel }) => {
  const [formData, setFormData] = useState<TruckProps>({
    id: '',
    name: '',
    licensePlate: '',
    supplier: '',
    inputWeight: 0,
    exitWeight: 0,
    netWeight: 0,
    amount: 0,
  });

  useEffect(() => {
    if (truck) {
      setFormData(truck);
    }
  }, [truck]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = ['inputWeight', 'exitWeight'].includes(name) ? Number(value) : value;

    setFormData(prevData => {
      const updatedData = { ...prevData, [name]: newValue };

      // Atualiza o peso líquido sempre que os pesos de entrada ou saída mudam
      if (name === 'inputWeight' || name === 'exitWeight') {
        updatedData.netWeight = updatedData.inputWeight - updatedData.exitWeight;
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="TruckForm">
      <h1>Editar Pesagem</h1>
      <div>
        <label htmlFor="name">Nome</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="licensePlate">Placa</label>
        <input type="text" name="licensePlate" value={formData.licensePlate} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="supplier">Fornecedor</label>
        <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="inputWeight">Peso de Entrada (kg)</label>
        <input type="number" name="inputWeight" value={formData.inputWeight} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="exitWeight">Peso de Saída (kg)</label>
        <input type="number" name="exitWeight" value={formData.exitWeight} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="netWeight">Peso Líquido (kg)</label>
        <input type="number" name="netWeight" value={formData.netWeight} readOnly />
      </div>
      <div>
        <label htmlFor="amount">Quantidade de Animais</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
      </div>
      <div className="button-container">
        <button type="submit">Salvar</button>
        <button type="button" onClick={onCancel} className="cancel">Cancelar</button>
      </div>
    </form>
  );
};

export default TruckForm;
