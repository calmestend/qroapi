import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLocation } from 'src/hooks/useLocation';
import { useChat } from '@contexts/chatContext';
import { useRouteSearch } from 'src/hooks/useRouteSearch';
import { decodePolyline } from '@lib/polyline';
import { RouteMapView } from '@components/RouteMapView';
import { SearchInput } from '@components/SearchInput';
import { RouteInfoWidget } from '@components/RouteInfoWidget';
import { ResponseModal } from '@components/ResponseModal';
import { InfoButton } from '@components/InfoButton';
import { styles } from './styles';

const API_URL = 'http://192.168.137.70:3000';

export const MapDirections: React.FC = () => {
	const navigation = useNavigation();
	const mapRef = useRef(null);
	const { location } = useLocation();
	const { chatResponse } = useChat();
	const [showConfirm, setShowConfirm] = useState(false);
	const [pathCoordinates, setPathCoordinates] = useState([]);
	const [stopPoints, setStopPoints] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [routeInfo, setRouteInfo] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showRouteInfo, setShowRouteInfo] = useState(true);
	const [isRouteReady, setIsRouteReady] = useState(false);

	const {
		originQuery,
		setOriginQuery,
		destinationQuery,
		setDestinationQuery,
		originResults,
		destinationResults,
		origin,
		setOrigin,
		destination,
		setDestination,
		handleSearch,
		timeoutRef,
	} = useRouteSearch(location);

	const initialRegion = {
		latitude: 20.5881,
		longitude: -100.3889,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			setIsRouteReady(false);
			setShowRouteInfo(true);

			if (!origin || !destination) {
				throw new Error('Origin or destination is missing');
			}

			const destinationData = {
				lat: destination.latLng.lat,
				lng: destination.latLng.lng,
				title: destination.title
			};

			const originData = {
				lat: origin.latLng.lat,
				lng: origin.latLng.lng,
				title: origin.title
			};

			const url = `https://moovitapp.com/queretaro-3143/poi/${encodeURIComponent(destinationData.title)}/${encodeURIComponent(originData.title)}/es-419?tll=${destinationData.lat / 1e6}_${destinationData.lng / 1e6}&fll=${originData.lat / 1e6}_${originData.lng / 1e6}`;

			const res = await fetch(`${API_URL}/directions`, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ url })
			});

			if (!res.ok) {
				throw new Error('Network response was not ok');
			}

			const json = await res.json();

			const routeInformation = {
				lines: json.supplementalData.lineGroupSummaryList.map(line => ({
					number: line.lineNumber,
					name: line.caption1,
					color: `#${line.color.toString(16).substring(2)}`,
					lineId: line.lineId
				})),
				stops: json.supplementalData.mVStopSyncedMetaDataList.map(stop => ({
					name: stop.stopName,
					code: stop.stopCode
				})),
				legs: json.result.itinerary.legs.map(leg => {
					if (leg.walkLeg) {
						return {
							type: 'walking',
							distance: Math.round(leg.walkLeg.shape.distanceInMeters),
							time: (leg.walkLeg.time.endTimeUtc - leg.walkLeg.time.startTimeUtc) / 1000 / 60,
							instructions: leg.walkLeg.walkingInstructions
						};
					} else if (leg.lineWithAlternativesLeg) {
						const line = leg.lineWithAlternativesLeg.alternativeLines[0];
						return {
							type: 'bus',
							lineId: line.lineId,
							time: (line.time.endTimeUtc - line.time.startTimeUtc) / 1000 / 60,
							distance: Math.round(line.shape.distanceInMeters),
							stops: line.stopSequenceIds
						};
					}
					return null;
				}).filter(Boolean)
			};

			const walkingRoutes = [];
			const busRoutes = [];

			json.result.itinerary.legs.forEach(leg => {
				if (leg.walkLeg?.shape?.polyline) {
					const points = decodePolyline(leg.walkLeg.shape.polyline);
					walkingRoutes.push({
						coordinates: points,
						type: 'walking'
					});
				} else if (leg.lineWithAlternativesLeg?.alternativeLines[0]?.shape?.polyline) {
					const points = decodePolyline(leg.lineWithAlternativesLeg.alternativeLines[0].shape.polyline);
					busRoutes.push({
						coordinates: points,
						type: 'bus'
					});
				}
			});

			const stops = json.supplementalData.mVStopSyncedMetaDataList.map(stop => ({
				coordinate: {
					latitude: stop.stopLocation.latitude / 1e6,
					longitude: stop.stopLocation.longitude / 1e6,
				},
				title: stop.stopName,
				stopId: stop.stopId
			}));

			const allRoutes = [...walkingRoutes, ...busRoutes];

			await Promise.all([
				new Promise(resolve => {
					setRouteInfo(routeInformation);
					resolve(null);
				}),
				new Promise(resolve => {
					setPathCoordinates(allRoutes);
					resolve(null);
				}),
				new Promise(resolve => {
					setStopPoints(stops);
					resolve(null);
				})
			]);

			setIsRouteReady(true);

			if (chatResponse?.response) {
				setShowModal(true);
			}

		} catch (error) {
			console.error('Error in handleSubmit:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleResultSelect = (item: any, type: 'origin' | 'destination') => {
		if (type === 'origin') {
			setOriginQuery(item.title);
			setOrigin(item);
			setOriginResults([]);
		} else {
			setDestinationQuery(item.title);
			setDestination(item);
			setDestinationResults([]);
		}
	};

	const validateOrigin = () => {
		if (originResults.length > 0) {
			const isValid = originResults.some(item => item.title === originQuery);
			if (!isValid) {
				handleResultSelect(originResults[0], 'origin');
			}
		}
	};

	const handleNavigateBack = () => {
		navigation.goBack();
	};

	useEffect(() => {
		if (chatResponse && chatResponse.response) {
			setShowModal(true);
			setOriginQuery(chatResponse.origin[2].title);
			setDestinationQuery(chatResponse.destination[0].title);
			setOrigin(chatResponse.origin[2]);
			setDestination(chatResponse.destination[0]);
		}
	}, [chatResponse]);

	useEffect(() => {
		if (origin && destination) {
			setShowConfirm(true);
		} else {
			setShowConfirm(false);
		}
	}, [origin, destination]);

	useEffect(() => {
		if (isRouteReady && mapRef.current && pathCoordinates.length > 0) {
			const allCoordinates = pathCoordinates.reduce((acc, route) => {
				return [...acc, ...route.coordinates];
			}, []);

			mapRef.current.fitToCoordinates(allCoordinates, {
				edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
				animated: true
			});
		}
	}, [isRouteReady, pathCoordinates]);

	useEffect(() => {
		if (origin) return;

		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			if (originQuery.length > 0) {
				handleSearch('origin', originQuery);
			}
		}, 500);

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [originQuery, origin]);

	useEffect(() => {
		if (destination) return;

		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			if (destinationQuery.length > 0) {
				handleSearch('destination', destinationQuery);
			}
		}, 500);

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [destinationQuery, destination]);

	return (
		<View style={styles.container}>
			{location ? (
				<View style={styles.content}>
					<RouteMapView
						mapRef={mapRef}
						initialRegion={initialRegion}
						location={location}
						pathCoordinates={pathCoordinates}
						stopPoints={stopPoints}
						origin={origin}
						destination={destination}
					/>

					<View style={styles.inputsContainer}>
						{showRouteInfo && routeInfo ? (
							<RouteInfoWidget routeInfo={routeInfo} />
						) : (
							<>
								<SearchInput
									placeholder="Origen"
									value={originQuery}
									onChangeText={setOriginQuery}
									onBlur={validateOrigin}
									results={originResults}
									onResultSelect={(item) => handleResultSelect(item, 'origin')}
								/>
								<SearchInput
									placeholder="Destino"
									value={destinationQuery}
									onChangeText={setDestinationQuery}
									results={destinationResults}
									onResultSelect={(item) => handleResultSelect(item, 'destination')}
								/>
							</>
						)}
					</View>

					{routeInfo && (
						<InfoButton
							onPress={() => setShowRouteInfo(prev => !prev)}
							isRouteCalculated={true}
						/>
					)}

					{showConfirm && (
						<View style={styles.buttonContainer}>
							{routeInfo ? (
								<TouchableOpacity
									style={[styles.button, styles.confirmButton]}
									onPress={handleNavigateBack}
								>
									<Text style={styles.buttonText}>Calcular otra ruta</Text>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									style={[styles.button, styles.confirmButton]}
									onPress={handleSubmit}
									disabled={isLoading}
								>
									{isLoading ? (
										<ActivityIndicator color="#fff" />
									) : (
										<Text style={styles.buttonText}>Confirmar viaje</Text>
									)}
								</TouchableOpacity>
							)}
						</View>
					)}

					<ResponseModal
						visible={showModal}
						onClose={() => setShowModal(false)}
						message={chatResponse?.response || ''}
					/>
				</View>
			) : (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#2196F3" />
					<Text>Cargando ubicación...</Text>
				</View>
			)}
		</View>
	);
};
