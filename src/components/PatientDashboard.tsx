
import React from 'react';
import MedicationList from './MedicationList';
import { useMedicationContext } from './MedicationContext';

const PatientDashboard: React.FC = () => {
  const { meds, markAsTaken } = useMedicationContext();

  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Patient Dashboard</h1>
      <MedicationList role="patient" meds={meds} markAsTaken={markAsTaken} />
    </div>
  );
};

export default PatientDashboard;