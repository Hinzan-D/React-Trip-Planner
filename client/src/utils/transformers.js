export function latLngToText(latLng, precision = 2) {
    return latLng ? `${latLng.lat.toFixed(precision)}°${evaluateLat(latLng.lat)}, ${latLng.lng.toFixed(precision)}°${evaluateLng(latLng.lng)}` : "";
}

export function placeToLatLng(place) {
    return place && place.latitude && place.longitude ? { lat: parseFloat(place.latitude), lng: parseFloat(place.longitude) } : place;
}

export function latLngToPlace(latLng) {
    return latLng && latLng.lat && latLng.lng ? { latitude: latLng.lat.toString(), longitude: latLng.lng.toString() } : latLng;
}

function evaluateLat(lat) {
	if (lat > 0) {
		return 'N';
	} else if (lat < 0) {
		return 'S';
	} else {
		return '';
	}
}

function evaluateLng(lng) {
	if (lng > 0) {
		return 'E';
	} else if (lng < 0) {
		return 'W';
	} else {
		return '';
	}
}