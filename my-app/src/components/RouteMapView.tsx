import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import { View, Text } from 'react-native';

// ... (rest of the imports and interface remain the same)

export const RouteMapView: React.FC<RouteMapViewProps> = ({
	mapRef,
	initialRegion,
	location,
	pathCoordinates,
	stopPoints,
	origin,
	destination,
}) => {
	return (
		<MapView
			ref={mapRef}
			style={styles.map}
			initialRegion={initialRegion}
			showsUserLocation={true}
			showsMyLocationButton={false}
			toolbarEnabled={false}
			showsCompass={false}
		>
			{pathCoordinates.map((route, index) => (
				<Polyline
					key={index}
					coordinates={route.coordinates}
					strokeColor={route.type === 'walking' ? '#2196F3' : '#615EFC'}
					strokeWidth={3}
				/>
			))}

			{stopPoints.map((stop, index) => (
				<Marker
					key={index}
					coordinate={stop.coordinate}
					title={stop.title}
				>
					<View style={styles.stopMarker} />
					<Callout tooltip>
						<View style={styles.calloutContainer}>
							<Text style={styles.calloutTitle}>{stop.title}</Text>
							{stop.arrivalTime && (
								<View style={styles.timeContainer}>
									<Text style={styles.timeLabel}>Llegada:</Text>
									<Text style={styles.timeValue}>{stop.arrivalTime}</Text>
								</View>
							)}
						</View>
					</Callout>
				</Marker>
			))}

			{origin && (
				<Marker
					coordinate={{
						latitude: origin.latLng.lat / 1e6,
						longitude: origin.latLng.lng / 1e6,
					}}
					title={origin.title}
				>
					<View style={styles.originMarker} />
				</Marker>
			)}

			{destination && (
				<Marker
					coordinate={{
						latitude: destination.latLng.lat / 1e6,
						longitude: destination.latLng.lng / 1e6,
					}}
					title={destination.title}
				>
					<View style={styles.destinationMarker} />
				</Marker>
			)}
		</MapView>
	);
};

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
	stopMarker: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: '#615EFC',
		borderWidth: 2,
		borderColor: '#fff',
	},
	originMarker: {
		width: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: '#4CAF50',
		borderWidth: 2,
		borderColor: '#fff',
	},
	destinationMarker: {
		width: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: '#F44336',
		borderWidth: 2,
		borderColor: '#fff',
	},
	calloutContainer: {
		backgroundColor: 'white',
		borderRadius: 8,
		padding: 12,
		maxWidth: 250,
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	calloutTitle: {
		fontSize: 14,
		fontWeight: '600',
		marginBottom: 8,
		color: '#333',
	},
	timeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	timeLabel: {
		fontSize: 12,
		color: '#666',
	},
	timeValue: {
		fontSize: 14,
		color: '#615EFC',
		fontWeight: '600',
	},
});
