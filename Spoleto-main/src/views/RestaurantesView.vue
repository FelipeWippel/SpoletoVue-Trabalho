<template>
  <div class="restaurantes-page">
    <!-- Banner Section -->
    <section class="banner">
      <div class="banner-content">
        <h1>🍽️ Nossos Restaurantes</h1>
        <p class="subtext">Encontre a unidade Spoleto mais próxima de você e venha saborear a verdadeira culinária italiana.</p>
      </div>
    </section>

    <!-- Search and Filter Section -->
    <section class="search-section">
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Buscar por cidade ou bairro..." />
        <button class="search-btn">Buscar</button>
      </div>
    </section>

    <!-- Restaurant Listing Section -->
    <main class="restaurant-list-container">
      <div v-if="filteredRestaurants.length" class="restaurant-grid">
        <!-- Restaurant Card -->
        <div class="restaurant-card" v-for="restaurant in filteredRestaurants" :key="restaurant.id">
          <img :src="restaurant.image" @error="onImageError" :alt="`Foto do restaurante ${restaurant.name}`" class="restaurant-image" />
          <div class="card-content">
            <h2>{{ restaurant.name }}</h2>
            <p class="address">{{ restaurant.address }}</p>
            <p class="status" :class="{ 'open': restaurant.isOpen, 'closed': !restaurant.isOpen }">
              {{ restaurant.isOpen ? 'Aberto agora' : 'Fechado' }}
            </p>
            
          </div>
        </div>
      </div>
      <div v-else class="no-results">
        <p>Nenhum restaurante encontrado com o termo "{{ searchQuery }}".</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// --- Mock Data (substitua com sua API no futuro) ---
const restaurants = ref([
  {
    id: 1,
    name: 'Spoleto - Shopping Barra',
    address: 'Av. Embaixador Abelardo Bueno, 1300 - Barra da Tijuca, Rio de Janeiro',
    image: 'https://ded.com.br/wp-content/uploads/2020/12/restaurante_spoleto.jpg',
    isOpen: true,
  },
  {
    id: 2,
    name: 'Spoleto - NorteShopping',
    address: 'Av. Dom Hélder Câmara, 5474 - Cachambi, Rio de Janeiro',
    image: 'https://100fronteiras.com/wp-content/uploads/2024/10/Spoleto-scaled-1-e1727987287598.jpg',
    isOpen: false,
  },
  {
    id: 3,
    name: 'Spoleto - Shopping Tijuca',
    address: 'Av. Maracanã, 987 - Tijuca, Rio de Janeiro',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/1c/fc/99/spoleto.jpg?w=600&h=400&s=1',
    isOpen: true,
  },
   {
    id: 4,
    name: 'Spoleto - Botafogo Praia Shopping',
    address: 'Praia de Botafogo, 400 - Botafogo, Rio de Janeiro',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/71/bb/bc/spoleto.jpg?w=900&h=500&s=1', 
    isOpen: true,
  }
]);

const searchQuery = ref('');

const filteredRestaurants = computed(() => {
  if (!searchQuery.value) {
    return restaurants.value;
  }
  const lowerCaseQuery = searchQuery.value.toLowerCase();
  return restaurants.value.filter(restaurant =>
    restaurant.name.toLowerCase().includes(lowerCaseQuery) ||
    restaurant.address.toLowerCase().includes(lowerCaseQuery)
  );
});

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = 'https://via.placeholder.com/400x250?text=Spoleto'; // Imagem de fallback
  console.error('Image failed to load:', target.src);
};
</script>

<style scoped>
/* Herda a cor de fundo da body ou de um layout wrapper se houver */
.restaurantes-page {
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  color: #333;
  background-color: #fff; /* Fundo principal branco para a lista */
}

/* Banner Styling - Reutilizando o estilo da home page */
.banner {
  background: linear-gradient(90deg, #fff1e0, #ffe5cc);
  padding: 3rem 2rem;
  text-align: center;
  border-bottom: 2px solid #f5e0c5;
}

.banner-content h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #4a2c2a;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.subtext {
  margin-top: 1rem;
  font-size: 1.1rem;
  color: #666;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* Search Section Styling */
.search-section {
  padding: 2rem;
  background-color: #fff7ed;
  display: flex;
  justify-content: center;
}

.search-bar {
  display: flex;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 50px;
  overflow: hidden;
}

.search-bar input {
  flex-grow: 1;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  outline: none;
  color: #555;
}

.search-btn {
  border: none;
  background-color: #b35c00;
  color: white;
  padding: 0 2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: #9e5000;
}

/* Restaurant List Styling */
.restaurant-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.restaurant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}

/* Restaurant Card Styling - Visual consistente com os "itens" da home */
.restaurant-card {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.restaurant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.restaurant-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Faz o conteúdo preencher o card */
}

.card-content h2 {
  font-size: 1.3rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #4a2c2a;
}

.address {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex-grow: 1; /* Empurra o status e botão para baixo */
}

.status {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.status.open {
  color: #28a745;
}

.status.closed {
  color: #dc3545;
}

.menu-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #4a2c2a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.menu-btn:hover {
  background-color: #382120;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.2rem;
  color: #666;
}

/* Responsive Design */
@media (max-width: 768px) {
  .banner-content h1 {
    font-size: 2rem;
  }
  .subtext {
    font-size: 1rem;
  }
  .restaurant-grid {
    gap: 1.5rem;
  }
  .restaurant-list-container {
    padding: 2rem 1rem;
  }
}
</style>