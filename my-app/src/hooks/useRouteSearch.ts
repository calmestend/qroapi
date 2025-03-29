import { useState, useRef } from 'react';
import Fuse from 'fuse.js';

const API_URL = 'http://192.168.137.70:3000';

export const useRouteSearch = (location: any) => {
	const [originQuery, setOriginQuery] = useState('');
	const [destinationQuery, setDestinationQuery] = useState('');
	const [originResults, setOriginResults] = useState([]);
	const [destinationResults, setDestinationResults] = useState([]);
	const [origin, setOrigin] = useState(null);
	const [destination, setDestination] = useState(null);
	const timeoutRef = useRef(null);

	const fuseOptions = {
		keys: ['title'],
		threshold: 0.3,
	};

	const handleSearch = async (queryType: 'origin' | 'destination', searchQuery: string) => {
		if (!location || !searchQuery) return;

		const { latitude: lat, longitude: lng } = location.coords;

		try {
			const res = await fetch(`${API_URL}/search`, {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ lat, lng, query: searchQuery }),
			});

			if (!res.ok) throw new Error('Network response was not ok');

			const json = await res.json();
			const fuse = new Fuse(json, fuseOptions);
			const filteredResults = fuse.search(searchQuery).map(result => result.item);

			queryType === 'origin'
				? setOriginResults(filteredResults)
				: setDestinationResults(filteredResults);

		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	};

	return {
		originQuery,
		setOriginQuery,
		destinationQuery,
		setDestinationQuery,
		originResults,
		destinationResults,
		origin,
		setOrigin,
		destination,
		setDestination,
		handleSearch,
		timeoutRef,
	};
};
