import { useState } from 'react';
import { supabase } from './supabaseClient';


export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    setError('');
    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-xl font-semibold text-center mb-4">
        {isLogin ? 'Login' : 'Sign Up'}
      </h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full border p-2 mb-3 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full border p-2 mb-3 rounded"
      />
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <button
        onClick={handleAuth}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
      <p className="mt-3 text-sm text-center">
        {isLogin ? 'New user?' : 'Already have an account?'}{' '}
        <button className="text-blue-500 underline" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
}
