
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  taken?: boolean;
}

export interface MedicationLog {
  id: number;
  medId: number;
  message: string;
  timestamp: string;
}

interface MedicationContextType {
  meds: Medication[];
  logs: MedicationLog[];
  addMedication: (med: Omit<Medication, 'id'>) => void;
  editMedication: (id: number, med: Omit<Medication, 'id'>) => void;
  deleteMedication: (id: number) => void;
  markAsTaken: (id: number) => void;
}

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export const useMedicationContext = () => {
  const context = useContext(MedicationContext);
  if (!context) throw new Error('useMedicationContext must be used within a MedicationProvider');
  return context;
};

export const MedicationProvider = ({ children }: { children: ReactNode }) => {
  const [meds, setMeds] = useState<Medication[]>([]);
  const [logs, setLogs] = useState<MedicationLog[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedMeds = localStorage.getItem('meds');
    const storedLogs = localStorage.getItem('logs');
    if (storedMeds) setMeds(JSON.parse(storedMeds));
    if (storedLogs) setLogs(JSON.parse(storedLogs));
  }, []);

  // Save to localStorage on updates
  useEffect(() => {
    localStorage.setItem('meds', JSON.stringify(meds));
    localStorage.setItem('logs', JSON.stringify(logs));
  }, [meds, logs]);

  const addMedication = (med: Omit<Medication, 'id'>) => {
    const newMed = { id: Date.now(), ...med };
    setMeds(prev => [...prev, newMed]);
  };

  const editMedication = (id: number, med: Omit<Medication, 'id'>) => {
    setMeds(prev => prev.map(m => (m.id === id ? { ...m, ...med } : m)));
  };

  const deleteMedication = (id: number) => {
    setMeds(prev => prev.filter(m => m.id !== id));
  };

  const markAsTaken = (id: number) => {
    setMeds(prev =>
      prev.map(med => {
        if (med.id === id) {
          const updated = { ...med, taken: !med.taken };
          setLogs(prevLogs => [
            ...prevLogs,
            {
              id: Date.now(),
              medId: id,
              message: `${updated.name} was ${updated.taken ? 'taken' : 'not taken'} by the patient`,
              timestamp: new Date().toLocaleString(),
            },
          ]);
          return updated;
        }
        return med;
      })
    );
  };

  return (
    <MedicationContext.Provider
      value={{ meds, logs, addMedication, editMedication, deleteMedication, markAsTaken }}
    >
      {children}
    </MedicationContext.Provider>
  );
};

