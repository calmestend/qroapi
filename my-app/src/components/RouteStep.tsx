import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RouteStepProps {
	leg: any;
	lines: any[];
}

export const RouteStep: React.FC<RouteStepProps> = ({ leg, lines }) => {
	if (leg.type === 'walking') {
		return (
			<View style={styles.stepContent}>
				<Text style={styles.stepIcon}>🚶</Text>
				<Text style={styles.stepText}>
					Caminar {(leg.distance / 1000).toFixed(1)} km ({Math.round(leg.time)} min)
				</Text>
			</View>
		);
	}

	return (
		<View style={styles.stepContent}>
			<Text style={styles.stepIcon}>🚌</Text>
			<View style={styles.busInfo}>
				<Text style={styles.busLine}>
					{lines.find(l => l.lineId === leg.lineId)?.number || 'Bus'}
				</Text>
				<Text style={styles.stepText}>
					{Math.round(leg.time)} min • {(leg.distance / 1000).toFixed(1)} km
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	stepContent: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	stepIcon: {
		fontSize: 20,
		marginRight: 12,
	},
	stepText: {
		color: '#666',
		flex: 1,
	},
	busInfo: {
		flex: 1,
	},
	busLine: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
		marginBottom: 4,
	},
});
