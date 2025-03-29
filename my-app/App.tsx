import { LocationProvider } from '@contexts/locationContext';
import { AppNavigator } from '@navigation/AppNavigation';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function App() {
	return (
		<LocationProvider>
			<AppNavigator />
		</LocationProvider>

	);
}
