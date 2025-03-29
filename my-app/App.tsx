import { LocationProvider } from '@contexts/locationContext';
import { AppNavigator } from '@navigation/AppNavigation';

export default function App() {
	return (
		<LocationProvider>
			<AppNavigator />
		</LocationProvider>

	);
}
