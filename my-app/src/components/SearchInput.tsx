import React from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SearchInputProps {
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	onBlur?: () => void;
	results: any[];
	onResultSelect: (item: any) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
	placeholder,
	value,
	onChangeText,
	onBlur,
	results,
	onResultSelect,
}) => {
	return (
		<View style={styles.inputWrapper}>
			<TextInput
				placeholder={placeholder}
				style={styles.input}
				placeholderTextColor="#666"
				value={value}
				onChangeText={onChangeText}
				onBlur={onBlur}
			/>
			{results.length > 0 && (
				<FlatList
					data={results}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.listItem}
							onPress={() => onResultSelect(item)}
						>
							<Text style={styles.listItemText}>{item.title}</Text>
							{item.subTitle?.length > 0 && (
								<Text style={styles.subtitleText}>
									{item.subTitle.join(', ')}
								</Text>
							)}
						</TouchableOpacity>
					)}
					style={styles.resultsList}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	inputWrapper: {
		marginBottom: 10,
	},
	input: {
		backgroundColor: '#fff',
		padding: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ddd',
	},
	resultsList: {
		maxHeight: 200,
		backgroundColor: '#fff',
		borderRadius: 8,
		marginTop: 4,
	},
	listItem: {
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	listItemText: {
		fontSize: 16,
	},
	subtitleText: {
		fontSize: 14,
		color: '#666',
		marginTop: 4,
	},
});
