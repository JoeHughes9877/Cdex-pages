# 📚 Cdex-pages: API Registry Search Interface

Cdex-pages is a single-page application built with **Vue 3** and  **BootStrap** that serves as a search interface for the Cdex API registry. It allows users to search for entries across various categories like authors, worlds, and characters.

## 🚀 Deployment & Access

This application is deployed and accessible via the cloud at the following URL:
**pages.joe-hughes.dev**

---

## ✨ Features

* **Scoped Search:** Search across multiple categories: **Authors**, **Worlds**, **Series**, **Characters**, and **Quotes**.
* **Reactive Filtering:** Search results update based on the entered search term and selected category.
* **API Integration:** Uses **Axios** to fetch data from a protected external API endpoint.
* **User Experience:** Clear display of results or a "no results found" message.
* **Dark Theme:** A clean, dark interface for easy viewing.

---

## ⚙️ Setup and Installation (For Local Development)

This project requires a standard Node.js environment and package manager (npm or yarn).

### Prerequisites

* Node.js (LTS recommended)
* A package manager (npm, yarn, or pnpm)

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd cdex-pages
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    The application relies on environment variables for API connection. Create a file named **`.env`** in the project root and populate it with the following variables:

    ```
    VUE_APP_API_URL="[Your API Base URL here, e.g., [https://api.cdexregistry.com/](https://api.cdexregistry.com/)]"
    VUE_APP_API_KEY="[Your API Bearer Key here]"
    ```
    *The `VITE_APP_API_URL` is used as the base URL for Axios.*
    *The `VITE_APP_API_KEY` is used to create the `Authorization: Bearer <key>` header for secure API calls.*

4.  **Run the application:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically be available at `http://localhost:5173/` (or similar port).

---

## 🚀 Usage

The application is straightforward to use:

1.  **Enter a Search Term:** Type your query into the text input field.
2.  **Select a Scope:** Use the **"Scope"** dropdown to select the category you want to search within (e.g., Authors, Worlds).
3.  **Perform Search:**
    * Click the **"Search"** button.
    * Alternatively, press the **Enter** key while the input field is focused.

The search results will be displayed as a list below the search bar. If no results are found, a corresponding message will appear.

> **Note:** As mentioned in the application interface, "Hosting for Cdex api is using render's free option so the first api call may take a minute." If your initial search takes a moment, please be patient as the backend service may be waking up.

---

## 📁 Project Structure

* `src/main.ts`: Initializes the Vue app, configures the **Axios API client** with environment variables, and exports the `fetchData` function used for making API requests.
* `src/App.vue`: The main component containing the **search interface (HTML)**, **search logic (Composition API)**, and **styling (CSS)**. It manages the search state and displays results.
