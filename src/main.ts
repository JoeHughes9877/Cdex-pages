import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';

createApp(App).mount('#app')

const api = axios.create({
  baseURL:  import.meta.env.VUE_APP_API_URL,
  headers: {
    Authorization: `Bearer ${ import.meta.env.VUE_APP_API_KEY}`,
  }, 
});

export async function fetchAllData(searchTerm: string) {
  const res = await api.get('/authors/', {
    params: {
      search: searchTerm,
    },
  });
  return res.data;
}  