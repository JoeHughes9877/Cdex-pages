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

export async function fetchData(searchTerm: string, searchCategory: string) {
  const res = await api.get(`${searchCategory}`, {
    params: {
      q: searchTerm,
    },
  });
  return res.data;
}
