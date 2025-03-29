import { LocationContext } from '@contexts/locationContext';
import { useContext } from 'react';

export const useLocation = () => {
	const context = useContext(LocationContext);
	if (!context) {
		throw new Error('useLocation must be used within an LocationProvider');
	}
	return context;
};

