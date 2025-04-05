'use client';
import { useState, useEffect } from 'react';

export default function Home() {
	const [message, setMessage] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:3001/api/test');
				const data = await response.json();
				setMessage(data.message);
				setLoading(false);
			} catch (err) {
				setError('Błąd podczas komunikacji z backendem');
				setLoading(false);
				console.error(err);
			}
		};

		fetchData();
	}, []);

	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24'>
			<h1 className='text-4xl font-bold mb-8'>Property Management</h1>

			<div className='mb-8 p-6 border rounded-lg bg-white'>
				<h2 className='text-2xl font-semibold mb-4'>
					Test połączenia z backendem:
				</h2>

				{loading ? (
					<p>Ładowanie...</p>
				) : error ? (
					<p className='text-red-500'>{error}</p>
				) : (
					<p className='text-green-500'>{message}</p>
				)}
			</div>
		</main>
	);
}
