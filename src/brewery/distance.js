function getDistance(coords1, coords2) {

    if(coords1.lon === 0 || coords1.lat === 0){
        // User location didnt load
        //TODO: improve this?
        return 0;
    }
    const lat1 = coords1.lat;
    const lat2 = coords2.lat;
    const lon1 = coords1.lon;
    const lon2 = coords2.lon;
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return (d * 0.000621371).toFixed(2);
}

export default getDistance;