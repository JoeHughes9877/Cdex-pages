import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

createApp(App).mount('#app')

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchData(searchTerm: string, searchCategory: string) {
  try {
    const res = await api.get(`${searchCategory}`, {
      params: { q: searchTerm },
    });
    return res.data;
  } catch (err) {
    return [];
  }
}
