import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteStep } from './RouteStep';

interface RouteInfoWidgetProps {
	routeInfo: {
		legs: any[];
		lines: any[];
	};
}

export const RouteInfoWidget: React.FC<RouteInfoWidgetProps> = ({ routeInfo }) => {
	if (!routeInfo) return null;

	const totalDistance = routeInfo.legs.reduce((acc, leg) => acc + leg.distance, 0);
	const totalTime = routeInfo.legs.reduce((acc, leg) => acc + leg.time, 0);
	const walkingDistance = routeInfo.legs
		.filter(leg => leg.type === 'walking')
		.reduce((acc, leg) => acc + leg.distance, 0);

	return (
		<View style={styles.widgetContainer}>
			<View style={styles.widgetHeader}>
				<Text style={styles.widgetTitle}>Información de la Ruta</Text>
			</View>

			<View style={styles.widgetContent}>
				<RouteInfoItem label="Tiempo Total" value={`${Math.round(totalTime)} min`} />
				<RouteInfoItem label="Distancia Total" value={`${(totalDistance / 1000).toFixed(1)} km`} />
				<RouteInfoItem label="Distancia Caminando" value={`${(walkingDistance / 1000).toFixed(1)} km`} />

				<View style={styles.routeSteps}>
					{routeInfo.legs.map((leg, index) => (
						<RouteStep key={index} leg={leg} lines={routeInfo.lines} />
					))}
				</View>
			</View>
		</View>
	);
};

interface RouteInfoItemProps {
	label: string;
	value: string;
}

const RouteInfoItem: React.FC<RouteInfoItemProps> = ({ label, value }) => (
	<View style={styles.infoRow}>
		<Text style={styles.infoLabel}>{label}:</Text>
		<Text style={styles.infoValue}>{value}</Text>
	</View>
);

const styles = StyleSheet.create({
	widgetContainer: {
		backgroundColor: '#fff',
		borderRadius: 12,
		margin: 16,
		elevation: 4,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	widgetHeader: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	widgetTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#333',
	},
	widgetContent: {
		padding: 16,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	infoLabel: {
		color: '#666',
		fontSize: 14,
	},
	infoValue: {
		color: '#333',
		fontSize: 14,
		fontWeight: '600',
	},
	routeSteps: {
		marginTop: 16,
	},
});
