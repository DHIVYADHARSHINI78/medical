

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

import AuthForm from './AuthForm';
import AddMedicationForm from './AddMedicationForm';
import MedicationList from './MedicationList';

const Home = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe(); // ✅ safe in latest Supabase
    };
  }, []);

  if (!user) return <AuthForm />;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Welcome, {user.email}</h2>
      <AddMedicationForm user={user} />
      <MedicationList user={user} />
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          setUser(null);
        }}
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
