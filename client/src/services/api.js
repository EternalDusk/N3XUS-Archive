import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

//export const getNotes = () => api.get('/notes');
export const getRecentNotes = (limit = 10) => api.get(`/notes/recent?limit=${limit}`);
export const createNote = (note) => api.post('/notes', note);

export const getNotesByTopic = (topicUID) => api.get(`/notes/by-topic?topicUID=${topicUID}`);

export const getTopics = () => api.get('/topic/fetchAll');
export const getTopicByUID = (topicUID) => api.get(`/topic/fetch/${topicUID}`);

export default api;
