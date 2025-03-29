import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	content: {
		flex: 1,
	},
	inputsContainer: {
		position: 'absolute',
		top: 20,
		left: 20,
		right: 20,
		borderRadius: 12,
		padding: 16,
		elevation: 4,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	button: {
		flex: 1,
		padding: 16,
		borderRadius: 8,
		marginHorizontal: 8,
		alignItems: 'center',
		elevation: 4,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	confirmButton: {
		backgroundColor: '#615EFC',
	},
	newRouteButton: {
		backgroundColor: '#2196F3',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
