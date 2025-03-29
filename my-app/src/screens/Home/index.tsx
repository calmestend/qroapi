import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Chat } from "./tabs/Chat";

const Home: React.FC = () => {
	const Tabs = createBottomTabNavigator();

	return (
		<Tabs.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen name="Chat" component={Chat} />
		</Tabs.Navigator>
	);
};

export default Home;

