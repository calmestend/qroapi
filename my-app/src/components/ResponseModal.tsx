import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

interface ResponseModalProps {
	visible: boolean;
	onClose: () => void;
	message: string;
}

export const ResponseModal: React.FC<ResponseModalProps> = ({
	visible,
	onClose,
	message,
}) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>{message}</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={onClose}
					>
						<Text style={styles.buttonText}>Entendido</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 16,
		padding: 24,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: '90%',
	},
	modalText: {
		marginBottom: 20,
		textAlign: 'center',
		fontSize: 16,
		lineHeight: 24,
		color: '#333',
	},
	button: {
		backgroundColor: '#615EFC',
		borderRadius: 8,
		padding: 12,
		width: '100%',
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontWeight: '600',
		fontSize: 16,
	},
});
