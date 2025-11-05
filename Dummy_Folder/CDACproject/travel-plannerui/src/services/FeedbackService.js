import axios from 'axios';
import { FEEDBACK_API_URL } from '../constant/APIconstant';

export async function saveFeedback(payload) {
   
    return axios.post(FEEDBACK_API_URL, payload);
}

export function getAllFeedback() {
    return axios.get(FEEDBACK_API_URL);
}