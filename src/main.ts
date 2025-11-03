import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VUE_APP_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VUE_APP_API_KEY}`,
  },
});

createApp(App).mount('#app')

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchData(searchTerm: string, searchCategory: string) {
  try {
  if (searchTerm.length  < 3) { return }
  await delay(500);
  const res = await api.get(`${searchCategory}`, {
    params: {
      q: searchTerm,
    },
  });
  return res.data;
} catch {
  return [];
}
}
