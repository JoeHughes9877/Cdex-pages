<script setup lang="ts">
import { ref, watch } from 'vue';
import { fetchData } from '../src/main.ts';

const data = ref<any[] | string>([]);
const searchTerm = ref('');
const searchCategory = ref('/authors/');

watch([searchTerm, searchCategory], async ([newTerm, newCategory]) => {
  if (newTerm.trim()) {
    data.value = await fetchData(newTerm, newCategory);
  } else {
    data.value = [];
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
        
        <div class="category-dropdown">
          <label for="category-select">Scope:</label>
          <select 
            id="category-select" 
            v-model="searchCategory"
            class="search-select"
          >
            <option value="/authors/">Authors</option>
            <option value="/worlds/">Worlds</option>
            <option value="/series/">Series</option>
            <option value="/characters/">Characters</option>
            <option value="/quotes/">Quotes</option>
          </select>
        </div>
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

/* --- NEW Dropdown Styles --- */
.category-dropdown {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: #e0e0ff;
    font-size: 0.95em;
}

.search-select {
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #4a4e69;
    background-color: #1a1a2e;
    color: #a29bfe;
    font-family: 'Arial Black', sans-serif;
    cursor: pointer;
    appearance: none; /* Remove default arrow for better custom styling */
    -webkit-appearance: none;
    -moz-appearance: none;
    min-width: 150px;
}

.search-select:focus {
    border-color: #a29bfe; 
    outline: none;
    box-shadow: 0 0 5px rgba(162, 155, 254, 0.5); 
}
/* --- End Dropdown Styles --- */

.registry-message {
  padding: 20px;
  text-align: center;
  background-color: #1a1a2e; 
  border: 1px solid #6a89cc;
  border-radius: 6px;
  color: #bdc3c7;
  font-style: normal;
}

/* ... (Rest of your existing styles for .registry-message, .character-grid, etc. remain the same) ... */

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