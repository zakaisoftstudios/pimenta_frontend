import wretch from 'wretch'

export const byPostalCode = async postalCode => {
  const url = `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&addressdetails=1&format=json`

  const results = await wretch()
    .url(url)
    .get()
    .json()

  if (results && results.length > 0) {
    return results
      .filter(result => getValidCity(result) && result.lat && result.lon)
      .map(result => ({
        ...result.address,
        city: getValidCity(result),
        latitude: result.lat,
        longitude: result.lon
      }))
  } else {
    return []
  }
}

const getValidCity = result =>
  result.address.city || result.address.city_district || result.address.suburb || result.address.town 
