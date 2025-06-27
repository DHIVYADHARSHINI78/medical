import React, { useState } from 'react';

interface EditMedicationModalProps {
  medication: any;
  onClose: () => void;
  onSave: (updatedMed: any) => void;
}

const EditMedicationModal: React.FC<EditMedicationModalProps> = ({ medication, onClose, onSave }) => {
  const [name, setName] = useState(medication.name);
  const [dosage, setDosage] = useState(medication.dosage);
  const [frequency,setFrequency]=useState(medication.frequency);

  const handleSave = () => {
    onSave({ ...medication, name, dosage,frequency});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Edit Medication</h2>

        <label className="block mb-2 font-semibold">Medication Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-semibold">Dosage</label>
        <input
          type="text"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />


   <label className="block mb-2 font-semibold">frequency</label>
        <input
          type="text"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="flex justify-end">
          <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditMedicationModal;
