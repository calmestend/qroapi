import { ChatProvider } from '@contexts/chatContext';
import { LocationProvider } from '@contexts/locationContext';
import { NavigationContainer } from '@react-navigation/native';
import {
	createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Home from '@screens/Home';
import { MapDirections } from '@screens/MapDirections';
import { Settings } from '@screens/Settings';
import { StatusBar } from 'expo-status-bar';


export const AppNavigator: React.FC = () => {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<LocationProvider>
				<ChatProvider>
					<StatusBar />
					<Stack.Navigator
						initialRouteName='Home'
					>
						<Stack.Screen
							name="Home"
							component={Home}
						/>
						<Stack.Screen
							name="Settings" component={Settings}
						/>
						<Stack.Screen
							name="MapDirections"
							component={MapDirections}
						/>
					</Stack.Navigator>
				</ChatProvider>
			</LocationProvider>
		</NavigationContainer>
	);

}
