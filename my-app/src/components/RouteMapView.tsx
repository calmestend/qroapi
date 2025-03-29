import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

interface Coordinate {
	latitude: number;
	longitude: number;
}

interface StopPoint {
	coordinate: Coordinate;
	title: string;
	stopId: string;
}

interface Route {
	coordinates: Coordinate[];
	type: 'walking' | 'bus';
}

interface Location {
	latitude: number;
	longitude: number;
}

interface LatLng {
	lat: number;
	lng: number;
}

interface Point {
	latLng: LatLng;
	title: string;
}

interface RouteMapViewProps {
	mapRef: any;
	initialRegion: {
		latitude: number;
		longitude: number;
		latitudeDelta: number;
		longitudeDelta: number;
	};
	location: Location;
	pathCoordinates: Route[];
	stopPoints: StopPoint[];
	origin: Point | null;
	destination: Point | null;
}

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
});
