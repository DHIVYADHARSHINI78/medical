


import React, { useState } from 'react';
import { useMedicationContext } from './MedicationContext';


const AddMedicationForm: React.FC<{ addMedication: (med: Omit<Medication, 'id'>) => void }> = ({ addMedication }) => {
  const [form, setForm] = useState({ name: '', dosage: '', frequency: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.name && form.dosage && form.frequency) {
      addMedication(form);
      setForm({ name: '', dosage: '', frequency: '' });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Add Medication</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Medication Name" className="p-2 border rounded" />
        <input name="dosage" value={form.dosage} onChange={handleChange} placeholder="Dosage" className="p-2 border rounded" />
        <input name="frequency" value={form.frequency} onChange={handleChange} placeholder="Frequency" className="p-2 border rounded" />
      </div>
      <button onClick={handleSubmit} className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Add</button>
    </div>
  );
};

export default AddMedicationForm;



