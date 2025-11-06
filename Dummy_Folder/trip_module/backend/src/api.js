// ✅ Itinerary APIs
export function addItinerary(itineraryData, token) {
  return apiRequest("/itinerary", "POST", itineraryData, token);
}

export function getItineraries(tripId, token) {
  return apiRequest(`/itinerary/${tripId}`, "GET", null, token);
}

export function deleteItinerary(itineraryId, token) {
  return apiRequest(`/itinerary/${itineraryId}`, "DELETE", null, token);
}

// ✅ ADMIN APIs
export function getAllTrips(token) {
  return apiRequest("/trips", "GET", null, token);
}

export function getAllItineraries(token) {
  return apiRequest("/itinerary", "GET", null, token);
}

