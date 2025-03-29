import React, { createContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';

export interface LocationContextType {
	locationPermission: boolean;
	location: Location.LocationObject | null;
	address: {
		city: string | null;
	};
}
export const LocationContext = createContext<LocationContextType>({
	locationPermission: false,
	location: null,
	address: {
		city: null,
	},
});

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [locationPermission, setLocationPermission] = useState(false);
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
	const [address, setAddress] = useState<{
		city: string | null;
	}>({
		city: null,
	});

	useEffect(() => {
		(async () => {
			const { status } =
				await Location.requestForegroundPermissionsAsync();
			setLocationPermission(status === 'granted');

			if (status === 'granted') {
				try {
					const currentLocation =
						await Location.getCurrentPositionAsync({
							timeInterval: 1000,
							distanceInterval: 5,
							accuracy: Location.LocationAccuracy.Highest,
						});
					setLocation(currentLocation);

					const [geocodeResult] = await Location.reverseGeocodeAsync({
						latitude: currentLocation.coords.latitude,
						longitude: currentLocation.coords.longitude,
					});

					if (geocodeResult) {
						setAddress({
							city: geocodeResult.city || null,
						});
					}
				} catch (error) {
					console.error('Error getting location or address:', error);
				}
			}
		})();
	}, []);

	return (
		<LocationContext.Provider
			value={{
				locationPermission,
				location,
				address,
			}}
		>
			{children}
		</LocationContext.Provider>
	);
};
