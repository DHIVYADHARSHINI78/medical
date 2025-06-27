

import React, { useState } from 'react';
import EditMedicationModal from './EditMedicationModal';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  taken?: boolean;
}

interface Props {
  role: 'patient' | 'caretaker';
  meds: Medication[];
  markAsTaken?: (id: number) => void;
  editMedication?: (id: number, med: Omit<Medication, 'id'>) => void;
  deleteMedication?: (id: number) => void;
  showProof?: boolean;
}

const MedicationList: React.FC<Props> = ({
  role,
  meds,
  markAsTaken,
  editMedication,
  deleteMedication,
  showProof = false
}) => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTimestamp, setModalTimestamp] = useState<string | null>(null);
  const [editingMed, setEditingMed] = useState<Medication | null>(null);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Medication List</h2>
      {meds.length === 0 ? (
        <p className="text-gray-500">No medications available.</p>
      ) : (
        <ul className="space-y-4">
          {meds.map(med => {
            const proof = localStorage.getItem(`proof-${med.id}`);
            const timestamp = localStorage.getItem(`takenDate-${med.id}`);
            return (
              <li key={med.id} className={`p-4 border rounded-lg ${med.taken ? 'bg-green-100' : 'bg-gray-100'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-lg">{med.name}</p>
                    <p className="text-sm text-gray-600">{med.dosage} – {med.frequency}</p>
                    {showProof && proof && (
                      <div className="mt-2">
                        <img
                          src={proof}
                          alt="Proof"
                          className="w-32 h-32 object-cover rounded border border-gray-300 cursor-pointer"
                          onClick={() => {
                            setModalImage(proof);
                            setModalTimestamp(timestamp || 'No timestamp');
                          }}
                        />
                        {timestamp && (
                          <p className="text-xs text-gray-500 mt-1">Taken on: {new Date(timestamp).toLocaleString()}</p>
                        )}
                      </div>
                    )}
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
                          onClick={() => setEditingMed(med)}
                          className="px-3 py-1 rounded bg-yellow-500 text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this medication?")) {
                              deleteMedication && deleteMedication(med.id);
                            }
                          }}
                          className="px-3 py-1 rounded bg-red-600 text-white"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setModalImage(null)}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative">
            <img src={modalImage} alt="Full Proof" className="w-full h-auto rounded" />
            <p className="text-sm text-gray-600 mt-2">Taken on: {modalTimestamp}</p>
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-2 right-2 text-gray-800 font-bold text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {editingMed && (
        <EditMedicationModal
          medication={editingMed}
          onClose={() => setEditingMed(null)}
          onSave={(updatedMed) => {
            if (editMedication) editMedication(updatedMed.id, updatedMed);
          }}
        />
      )}
    </div>
  );
};

export default MedicationList;
