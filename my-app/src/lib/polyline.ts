export const decodePolyline = (encodedPolyline: string) => {
	try {
		if (encodedPolyline.includes(' ')) {
			return encodedPolyline.split(' ').map(coord => {
				const [lat, lng] = coord.split(',').map(num => parseFloat(num) / 1e6);
				return { latitude: lat, longitude: lng };
			});
		}

		const coordinates = [];
		let index = 0;
		let lat = 0;
		let lng = 0;

		while (index < encodedPolyline.length) {
			let result = 0;
			let shift = 0;
			let b;

			do {
				b = encodedPolyline.charCodeAt(index++) - 63;
				result |= (b & 0x1f) << shift;
				shift += 5;
			} while (b >= 0x20);

			const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
			lat += dlat;

			result = 0;
			shift = 0;

			do {
				b = encodedPolyline.charCodeAt(index++) - 63;
				result |= (b & 0x1f) << shift;
				shift += 5;
			} while (b >= 0x20);

			const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
			lng += dlng;

			coordinates.push({
				latitude: lat * 1e-5,
				longitude: lng * 1e-5
			});
		}

		return coordinates;
	} catch (error) {
		console.error('Error decoding polyline:', error);
		return [];
	}
};
