
import React, { useState } from 'react';
import MedicationList from './MedicationList';
import { useMedicationContext } from './MedicationContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const PatientDashboard: React.FC = () => {
  const { meds = [], markAsTaken } = useMedicationContext();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const takenCount = meds.filter(med => med.taken).length;
  const totalCount = meds.length;
  const adherence = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;

  // Get all taken dates without duplication
  const takenDates = Array.from(
    new Set(
      meds
        .filter(m => m.taken)
        .map(m => {
          const ts = localStorage.getItem(`takenDate-${m.id}`);
          return ts ? new Date(new Date(ts).toDateString()) : null;
        })
        .filter(Boolean) as Date[]
    )
  );

  const handleMarkAsTakenWithProof = (id: number) => {
    const med = meds.find(m => m.id === id);
    if (med?.taken) {
      // Unmark without uploading
      localStorage.removeItem(`takenDate-${id}`);
      localStorage.removeItem(`proof-${id}`);
      markAsTaken(id);
      return;
    }

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async () => {
      const file = fileInput.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result?.toString();
          localStorage.setItem(`proof-${id}`, base64Image || '');
          localStorage.setItem(`takenDate-${id}`, new Date().toISOString());
          markAsTaken(id);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Patient Dashboard</h1>

      {/* Adherence Summary */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 text-center">
        <h2 className="text-lg font-semibold text-green-700">Adherence</h2>
        <p className="text-2xl font-bold text-blue-700">{adherence}%</p>
        <p className="text-sm text-gray-500">
          {takenCount} out of {totalCount} medications taken
        </p>
      </div>

      {/* Medication Calendar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 text-center">
        <h2 className="text-lg font-semibold text-indigo-700 mb-2">Medication Calendar</h2>
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          tileClassName={({ date }) =>
            takenDates.some(d =>
              date.getDate() === d.getDate() &&
              date.getMonth() === d.getMonth() &&
              date.getFullYear() === d.getFullYear()
            ) ? 'bg-green-300 rounded-full' : ''
          }
          tileContent={({ date }) =>
            takenDates.some(d =>
              date.getDate() === d.getDate() &&
              date.getMonth() === d.getMonth() &&
              date.getFullYear() === d.getFullYear()
            ) ? <div className="text-green-600 text-lg text-center">✅</div> : null
          }
        />
      </div>

      <MedicationList
        role="patient"
        meds={meds}
        markAsTaken={handleMarkAsTakenWithProof}
        showProof={true}
      />
    </div>
  );
};

export default PatientDashboard;
