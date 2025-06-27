import React, { useState, useEffect } from 'react';

const MedicationTracker = () => {
  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem('medications');
    return saved ? JSON.parse(saved) : [];
  });
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');

  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  const addMedication = (e) => {
    e.preventDefault();
    const newMed = {
      id: Date.now(),
      name,
      dosage,
      frequency,
      takenDates: [],
    };
    setMedications([...medications, newMed]);
    setName('');
    setDosage('');
    setFrequency('');
  };

  const markAsTakenToday = (id) => {
    const today = new Date().toISOString().split('T')[0];
    setMedications((prev) =>
      prev.map((med) =>
        med.id === id && !med.takenDates.includes(today)
          ? { ...med, takenDates: [...med.takenDates, today] }
          : med
      )
    );
  };

  const getAdherence = (med) => {
    const totalDays = med.takenDates.length;
    return `${totalDays} day(s) taken`;
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Medication Tracker</h2>

      <form onSubmit={addMedication} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Medication Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Add Medication</button>
      </form>

      <ul className="space-y-4">
        {medications.map((med) => (
          <li key={med.id} className="border p-4 rounded">
            <div className="font-semibold">{med.name}</div>
            <div>{med.dosage} – {med.frequency}</div>
            <div>Adherence: {getAdherence(med)}</div>
            <button
              onClick={() => markAsTakenToday(med.id)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              Mark as Taken Today
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicationTracker;
