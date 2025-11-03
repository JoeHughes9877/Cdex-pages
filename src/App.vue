<script setup lang="ts">
import { ref, watch } from 'vue';
import { fetchAllData } from '../src/main.ts';

const data = ref<any[] | string>([]);
const searchTerm = ref('');

watch(searchTerm, async (newValue) => {
  if (newValue.trim()) {
    await fetchAllData();
  }
});

</script>
<template>
  <div class="dark-registry">
    <h1>Cdex-pages</h1>
    
    <div class="search-container">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search..."
          class="search-input"
        />
      </div>

    <ul>
      <li v-for="item in data" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<style scoped>

.dark-registry {
  font-family: 'Arial Black', sans-serif;
  max-width: 900px;
  margin: 50px auto; 
  padding: 35px;
  background-color: #0d0d1a; 
  border: 1px solid #4a4e69;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.9);
}

h1 {
  color: #e0e0ff; 
  text-align: center;
  font-size: 2.2em;
  margin-top: 0;
  border-bottom: 3px solid #a29bfe; 
  padding-bottom: 10px;
}

.search-container {
    margin-bottom: 30px;
    text-align: center;
    background-color: transparent; 
}

.search-input {
    width: 100%;
    max-width: 400px;
    padding: 14px 20px;
    font-size: 1em;
    border: 1px solid #4a4e69; 
    border-radius: 8px;
    background-color: #1a1a2e; 
    color: #ffffff; 
    box-shadow: 0 0 5px rgba(162, 155, 254, 0.3); 
    transition: border-color 0.3s;
}

.search-input:focus {
    border-color: #a29bfe; 
    outline: none;
}

.registry-message {
  padding: 20px;
  text-align: center;
  background-color: #1a1a2e; 
  border: 1px solid #6a89cc;
  border-radius: 6px;
  color: #bdc3c7;
  font-style: normal;
}

.registry-message.error {
  background-color: #3c1c2e;
  border-color: #e74c3c;
  color: #ffdddd;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.registry-page {
  padding: 20px;
  background-color: #1a1a2e; 
  border: 1px solid #4a4e69;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.registry-page:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(162, 155, 254, 0.5);
}

.char-name {
  font-size: 1.5em;
  color: #a29bfe;
  margin-top: 0;
  margin-bottom: 5px;
}

.char-title {
  font-style: italic;
  color: #e0e0ff;
  margin-bottom: 15px;
}

.details p {
    margin: 5px 0;
    font-size: 0.95em;
}

.details strong {
    color: #a29bfe;
}

.char-desc {
    color: #bdc3c7;
}

.separator {
    border: 0;
    height: 1px;
    background: #6a89cc;
    margin: 40px 0 20px 0;
}

.footer-link {
  text-align: center;
  font-size: 0.9em;
  color: #a29bfe;
}
</style>