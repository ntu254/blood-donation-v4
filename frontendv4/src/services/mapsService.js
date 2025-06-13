const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

async function geocodeAddress(address) {
    if (!apiKey) {
        throw new Error('API key not configured');
    }
    const encoded = encodeURIComponent(address);
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`);
    if (!response.ok) {
        throw new Error('Google API request failed');
    }
    const data = await response.json();
    if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
    }
    throw new Error('Không tìm thấy vị trí');
}

export default { geocodeAddress };
