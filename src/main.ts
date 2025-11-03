import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';

createApp(App).mount('#app')

const API_URL = 'https://cdex.joe-hughes.dev';
const AUTH_KEY = 'PmLKYSrMjKDVS5XzqC3lxQ';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${AUTH_KEY}`,
  },
});

export async function fetchAllData() {
  const res = await api.get('/authors/');
  return res.data;
}