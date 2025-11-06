// ✅ frontend/src/api.js

const API_BASE_URL = "http://localhost:3000/api";

// 🔧 Generic API request helper
export async function apiRequest(endpoint, method = "GET", data = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || result.error || "Request failed");
  return result;
}

//
// ✅ USER APIs
//
export function registerUser(userData) {
  return apiRequest("/users/register", "POST", userData);
}

export function loginUser(credentials) {
  return apiRequest("/users/login", "POST", credentials);
}

export function getAllUsers(token) {
  return apiRequest("/users", "GET", null, token);
}

export function deleteUser(userId, token) {
  return apiRequest(`/users/${userId}`, "DELETE", null, token);
}

//
// ✅ CONTACT APIs
//
export function sendContactMessage(contactData) {
  return apiRequest("/contact", "POST", contactData);
}

//
// ✅ TRIP APIs
//
export function addTrip(tripData, token) {
  return apiRequest("/trips", "POST", tripData, token);
}

export function getTrips(userId, token) {
  return apiRequest(`/trips/${userId}`, "GET", null, token);
}

// ✅ Admin: Get all trips
export function getAllTrips(token) {
  return apiRequest("/trips", "GET", null, token);
}

export function updateTrip(tripId, data, token) {
  return apiRequest(`/trips/${tripId}`, "PUT", data, token);
}

export function deleteTrip(tripId, token) {
  return apiRequest(`/trips/${tripId}`, "DELETE", null, token);
}

//
// ✅ ITINERARY APIs
//
export function addItinerary(itineraryData, token) {
  return apiRequest("/itinerary", "POST", itineraryData, token);
}

export function getItineraries(tripId, token) {
  return apiRequest(`/itinerary/${tripId}`, "GET", null, token);
}

export function deleteItinerary(itineraryId, token) {
  return apiRequest(`/itinerary/${itineraryId}`, "DELETE", null, token);
}

// ✅ Admin: Get all itineraries
export function getAllItineraries(token) {
  return apiRequest("/itinerary", "GET", null, token);
}

//
// ✅ FEEDBACK APIs
//
export function submitFeedback(feedbackData, token) {
  return apiRequest("/feedback", "POST", feedbackData, token);
}

export function getAllFeedback(token) {
  return apiRequest("/feedback", "GET", null, token);
}
