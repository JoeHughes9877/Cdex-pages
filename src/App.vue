<script setup lang="ts">
import { ref, watch } from 'vue';
import { fetchData } from '../src/main.ts'; 

const searchTerm = ref('');
const searchCategory = ref('/authors/');
const searchQuery = ref('');
const searchCategoryQuery = ref('/authors/');
const data = ref<any[]>([]);

watch([searchQuery, searchCategoryQuery], async ([newTerm, newCategory]) => {
  if (newTerm.trim()) {
    data.value = await fetchData(newTerm, newCategory);
  } else {
    data.value = [];
  }
}, { immediate: true });

const performSearch = () => {
  searchQuery.value = searchTerm.value;
  searchCategoryQuery.value = searchCategory.value;
};
</script>

<template>
  <div class="dark-registry">
    <h1 class="registry__title">Cdex-pages</h1>
    <div class="search-container">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search entries..."
        class="search-container__input"
        @keyup.enter="performSearch" />
      <div class="search-container__scope">
        <label for="category-select" class="search-container__label">Scope:</label>
        <select 
          id="category-select" 
          v-model="searchCategory"
          class="search-container__select"
        >
          <option value="/authors/">Authors</option>
          <option value="/worlds/">Worlds</option>
          <option value="/series/">Series</option>
          <option value="/characters/">Characters</option>
          <option value="/quotes/">Quotes</option>
        </select>
      </div>
      <button 
        @click="performSearch" 
        class="search-container__button"
        :disabled="!searchTerm.trim()"
      >
        Search
      </button>
    </div>
    <ul v-if="data && data.length" class="data-list">
      <li v-for="item in data" :key="item.id" class="data-list__item">
        {{ item.name }}
      </li>
    </ul>
    <p v-else-if="searchQuery.trim() && !data.length" class="data-list__message">
      No results found for "{{ searchQuery }}".
    </p>
  </div>
</template>

<style scoped>
.dark-registry {
  --color-bg: #1e1e1e;
  --color-surface: #252526;
  --color-text-primary: #f0f0f0;
  --color-text-secondary: #b0b0b0;
  --color-border: #3c3c3c;
  --color-accent: #00bcd4;
  --color-accent-hover: #00a8b6;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  padding: var(--spacing-lg);
  min-height: 100vh;
}

.registry__title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: var(--spacing-lg);
  padding-bottom: 10px;
  border-bottom: 2px solid var(--color-border);
}

.search-container {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  align-items: center;
}

.search-container__input {
  flex-grow: 1;
  padding: 12px 15px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.search-container__input:focus {
  border-color: var(--color-accent);
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.3);
}

.search-container__scope {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-container__label {
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.search-container__select {
  padding: 12px 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  appearance: none;
  cursor: pointer;
  min-width: 120px;
  transition: border-color 0.3s;
}

.search-container__select:focus {
  border-color: var(--color-accent);
  outline: none;
}

.search-container__button {
  padding: 12px 20px;
  background-color: var(--color-accent);
  color: var(--color-bg);
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.search-container__button:hover:not(:disabled) {
  background-color: var(--color-accent-hover);
}

.search-container__button:disabled {
  background-color: var(--color-border);
  cursor: not-allowed;
}

.data-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.data-list__item {
  padding: 14px 15px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 1.05rem;
  transition: background-color 0.2s;
}

.data-list__item:last-child {
  border-bottom: none;
}

.data-list__item:hover {
  background-color: #2c2c2d;
  color: var(--color-text-primary);
}

.data-list__message {
  color: var(--color-text-secondary);
  padding: var(--spacing-md);
  text-align: center;
}
</style>
