import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useLocation } from 'src/hooks/useLocation';
import { ChatResponse, useChat } from '@contexts/chatContext';

export const Chat: React.FC = () => {
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { location } = useLocation();
	const navigation = useNavigation();
	const { chatResponse, setChatResponse } = useChat();

	const handleSend = async () => {
		if (!message.trim()) return;

		setIsLoading(true);
		const chatbotUrl = 'http://192.168.137.70:8000/chatbot/';
		const searchUrl = "http://192.168.137.70:3000/search"
		const params = new URLSearchParams();
		params.append('user_input', message);

		if (!location) {
			setIsLoading(false);
			return;
		}

		try {
			const resChat = await fetch(chatbotUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: params.toString()
			});

			const data = await resChat.json();
			const { origin, destination, response } = data;
			const { latitude, longitude } = location.coords;

			const [originResponse, destinationResponse] = await Promise.all([
				fetch(searchUrl, {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						lat: latitude,
						lng: longitude,
						query: origin
					}),
				}),
				fetch(searchUrl, {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						lat: latitude,
						lng: longitude,
						query: destination
					}),
				})
			]);

			if (!originResponse.ok || !destinationResponse.ok) {
				throw new Error('Network response was not ok');
			}

			const [jsonOrigin, jsonDestination] = await Promise.all([
				originResponse.json(),
				destinationResponse.json()
			]);

			const chat: ChatResponse = {
				destination: jsonDestination,
				origin: jsonOrigin,
				response
			};

			setChatResponse(chat);
			navigation.navigate('MapDirections');
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const suggestions = [
		{ text: 'Ir a casa' },
		{ text: 'Ir al trabajo' }
	];

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.contentContainer}>
				<Text style={styles.headerTitle}>¿A dónde vamos?</Text>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						value={message}
						onChangeText={setMessage}
						placeholder="Escribe tu destino..."
						placeholderTextColor="#A0A0A0"
						multiline={false}
						editable={!isLoading}
					/>
					<TouchableOpacity
						onPress={handleSend}
						style={[
							styles.sendButton,
							isLoading && styles.sendButtonDisabled
						]}
						disabled={isLoading || !message.trim()}
					>
						{isLoading ? (
							<ActivityIndicator color="#FFFFFF" size="small" />
						) : (
							<Text style={styles.sendIcon}>→</Text>
						)}
					</TouchableOpacity>
				</View>

				<View style={styles.suggestionsContainer}>
					{suggestions.map((suggestion, index) => (
						<TouchableOpacity
							key={index}
							onPress={() => setMessage(suggestion.text)}
							style={styles.suggestionButton}
							disabled={isLoading}
						>
							<Text style={styles.suggestionText}>{suggestion.text}</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	contentContainer: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: '#615EFC',
		marginBottom: 20,
		textAlign: 'center',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: '#615EFC',
		borderWidth: 1,
		borderRadius: 12,
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 15,
		marginBottom: 20,
	},
	input: {
		flex: 1,
		paddingVertical: 12,
		fontSize: 16,
		color: '#333333',
	},
	sendButton: {
		backgroundColor: '#615EFC',
		borderRadius: 8,
		padding: 8,
		marginLeft: 10,
	},
	sendButtonDisabled: {
		backgroundColor: '#A5A4FC',
	},
	sendIcon: {
		color: '#FFFFFF',
		fontSize: 20,
	},
	suggestionsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
	suggestionButton: {
		padding: 12,
		borderRadius: 8,
		backgroundColor: '#F5F5FF',
		borderWidth: 1,
		borderColor: '#E0E0FF',
		flex: 0.48,
	},
	suggestionText: {
		fontSize: 14,
		color: '#615EFC',
		textAlign: 'center',
	},
});
