import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  // Cambio de MaterialIcons a Ionicons

interface InfoButtonProps {
	onPress: () => void;
	isRouteCalculated: boolean;
}

export const InfoButton: React.FC<InfoButtonProps> = ({ onPress, isRouteCalculated }) => {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				{ backgroundColor: isRouteCalculated ? '#615EFC' : '#2196F3' }
			]}
			onPress={onPress}
		>
			<Icon name="information-circle" size={24} color="#FFF" /> {/* Cambié el ícono a uno de Ionic */}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		right: 16,
		top: 16,
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 4,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
});

