export async function getPopulation(lat, lon) {

    const username = "demo";

    const response = await fetch(
        `https://secure.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&username=${username}`
    );

    const data = await response.json();

    return data;
}