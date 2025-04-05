import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface Property {
  id: string;
  name?: string;
  address?: string;
  price?: number;
  created_at?: string;
}

function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getProperties() {
      try {
        // Sprawdzamy połączenie z Supabase
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .limit(10);

        if (error) {
          throw error;
        }

        if (data) {
          setProperties(data);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
        setError('Nie udało się pobrać danych z Supabase');
      } finally {
        setLoading(false);
      }
    }

    getProperties();
  }, []);

  // Sprawdzamy również połączenie z backendem
  const [backendStatus, setBackendStatus] = useState<string>('');
  const [backendLoading, setBackendLoading] = useState(true);

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch('http://localhost:3001/api/test');
        const data = await response.json();
        setBackendStatus(data.message);
      } catch (err) {
        console.error(err);
        setBackendStatus('Błąd połączenia z backendem');
      } finally {
        setBackendLoading(false);
      }
    }

    checkBackend();
  }, []);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='text-4xl font-bold mb-8'>Property Management</h1>

      {/* Status backendu */}
      <div className='mb-8 p-6 border rounded-lg bg-white'>
        <h2 className='text-2xl font-semibold mb-4'>Status backendu:</h2>
        {backendLoading ? (
          <p>Sprawdzanie połączenia z backendem...</p>
        ) : (
          <p className='text-green-500'>{backendStatus}</p>
        )}
      </div>

      {/* Status Supabase */}
      <div className='mb-8 p-6 border rounded-lg bg-white'>
        <h2 className='text-2xl font-semibold mb-4'>Status Supabase:</h2>
        {loading ? (
          <p>Ładowanie danych z Supabase...</p>
        ) : error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <div>
            <p className='text-green-500 mb-4'>
              Połączenie z Supabase działa prawidłowo!
            </p>
            <p>Liczba nieruchomości: {properties.length}</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default HomePage;
