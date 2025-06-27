

import React from 'react';
import AddMedicationForm from './AddMedicationForm';
import MedicationList from './MedicationList';
import { useMedicationContext } from './MedicationContext';

const CaretakerDashboard: React.FC = () => {
  const { meds, addMedication, editMedication, deleteMedication } = useMedicationContext();

  return (
    <div className="min-h-screen p-6 bg-green-50">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Caretaker Dashboard</h1>
      <AddMedicationForm addMedication={addMedication} />
      <MedicationList role="caretaker" meds={meds} editMedication={editMedication} deleteMedication={deleteMedication} />
    </div>
  );
};

export default CaretakerDashboard

