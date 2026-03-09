import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const generateCampaign = (data) => API.post('/campaigns/generate', data);
export const generateEmailSequence = (data) => API.post('/campaigns/email', data);
export const generatePitch = (data) => API.post('/pitches/generate', data);
export const generateElevatorPitch = (data) => API.post('/pitches/elevator', data);
export const scoreLeads = (data) => API.post('/leads/score', data);
export const generateOutreach = (data) => API.post('/leads/outreach', data);
export const analyzeMarket = (data) => API.post('/market/analyze', data);
export const competitorAnalysis = (data) => API.post('/market/competitor', data);
export const generateInsights = (data) => API.post('/insights/generate', data);
export const salesForecast = (data) => API.post('/insights/forecast', data);

export default API;
