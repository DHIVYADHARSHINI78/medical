


import React from 'react';


import { useMedicationContext } from './MedicationContext';


interface Props {
  role: 'patient' | 'caretaker';
  meds: Medication[];
  markAsTaken?: (id: number) => void;
  editMedication?: (id: number, med: Omit<Medication, 'id'>) => void;
  deleteMedication?: (id: number) => void;
}

const MedicationList: React.FC<Props> = ({ role, meds, markAsTaken, editMedication, deleteMedication }) => {
  const handleEdit = (id: number) => {
    const name = prompt('Edit medication name:');
    const dosage = prompt('Edit dosage:');
    const frequency = prompt('Edit frequency:');
    if (name && dosage && frequency && editMedication) {
      editMedication(id, { name, dosage, frequency });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Medication List</h2>
      {meds.length === 0 ? (
        <p className="text-gray-500">No medications available.</p>
      ) : (
        <ul className="space-y-4">
          {meds.map(med => (
            <li key={med.id} className={`p-4 border rounded-lg ${med.taken ? 'bg-green-100' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-lg">{med.name}</p>
                  <p className="text-sm text-gray-600">{med.dosage} – {med.frequency}</p>
                </div>
                <div className="flex gap-2">
                  {role === 'patient' && markAsTaken && (
                    <button
                      onClick={() => markAsTaken(med.id)}
                      className={`px-3 py-1 rounded text-white ${med.taken ? 'bg-gray-500' : 'bg-blue-600'}`}
                    >
                      {med.taken ? 'Unmark' : 'Mark Taken'}
                    </button>
                  )}
                  {role === 'caretaker' && (
                    <>
                      <button
                        onClick={() => handleEdit(med.id)}
                        className="px-3 py-1 rounded bg-yellow-500 text-white"
                      >Edit</button>
                      <button
                        onClick={() => deleteMedication && deleteMedication(med.id)}
                        className="px-3 py-1 rounded bg-red-600 text-white"
                      >Delete</button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicationList;


