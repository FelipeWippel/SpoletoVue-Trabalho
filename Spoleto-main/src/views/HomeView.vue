
<template>
  <main class="home">
    <!-- ... your banner section remains unchanged ... -->
    <section class="banner">
      <div class="banner-content">
        <div class="text-box">
          <h1>
            Conheça o sabor<br />
            da verdadeira <span class="italiano">culinária italiana!</span>
          </h1>
          <p class="subtext">
            Cupom válido para primeira compra no site em pedidos acima de R$ 30.
            Frete não incluso. Cupom de uso único. Desconto não cumulativo com outras promoções.
          </p>
        </div>

        <div class="carousel">
          <img :src="images[currentImage]" @error="onImageError" alt="Comida italiana" class="carousel-image" />
          <div class="carousel-controls">
            <button @click="prevImage" :disabled="currentImage === 0" class="carousel-btn">❮</button>
            <button @click="nextImage" :disabled="currentImage === images.length - 1" class="carousel-btn">❯</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Formas de consumo -->
    <section class="formas-consumo">
      <!-- Wrap the div.item with a router-link -->
      <router-link
        v-for="(item, index) in consumptionOptions"
        :key="index"
        :to="item.route"
        class="item-link"
      >
        <div class="item">
          <h2>{{ item.title }}</h2>
          <img :src="item.image" @error="onImageError" :alt="item.alt" class="item-image" />
          <p>{{ item.description }}</p>
        </div>
      </router-link>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' // Import useRouter

// Static imports for local images with fallback
import consumanorestaurante from '../assets/img/consumanorestaurante.jpg'
import pecapeloapp from '../assets/img/pecapeloapp.jpg'
import retirada from '../assets/img/retirada.jpg'

const images = [
  'https://spoleto.s3.sa-east-1.amazonaws.com/86c64c78d314e2c5445646254fa940c1375.png',
]

const currentImage = ref(0)
const router = useRouter() // Initialize the router

const consumptionOptions = ref([
  {
    title: '🍽️ Coma no restaurante',
    image: consumanorestaurante,
    alt: 'No restaurante',
    description: 'Consuma seu pedido no restaurante!',
    route: '/Restaurantes' // <-- Add route path
  },
  {
    title: '🚴 Delivery',
    image: pecapeloapp,
    alt: 'Delivery',
    description: 'Peça pelo app e receba em casa!',
    route: '/delivery' // <-- Add route path
  },
  {
    title: '🛒 Peça & retire',
    image: retirada,
    alt: 'Retirada',
    description: 'Retire seu pedido no Spoleto mais próximo!',
    route: '/cardapio' // <-- Add route path
  }
])

const prevImage = () => {
  currentImage.value = (currentImage.value - 1 + images.length) % images.length
}

const nextImage = () => {
  currentImage.value = (currentImage.value + 1) % images.length
}

const onImageError = (event) => {
  console.error('Image failed to load:', event.target.src)
  event.target.src = 'https://via.placeholder.com/400x300?text=Imagem+Indisponível'
}

onMounted(() => {
  // Verify image loading on mount
  consumptionOptions.value.forEach((item, index) => {
    const img = new Image()
    img.src = item.image
    img.onerror = () => {
      console.error(`Failed to load image: ${item.image}`)
      consumptionOptions.value[index].image = 'https://via.placeholder.com/200x150?text=Imagem+Indisponível'
    }
  })
})
</script>

<style scoped>
.home {
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  color: #333;
  background-color: #fff7ed;
  overflow-x: hidden;
}

.banner {
  background: linear-gradient(90deg, #fff1e0, #ffe5cc);
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #f5e0c5;
  position: relative;
}
.formas-consumo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: #fff;
}

/* Add this new rule to style the router-link */
.item-link {
  text-decoration: none; /* Removes the underline */
  color: inherit; /* Makes the text color same as parent */
  display: block; /* Ensures the link takes up the whole grid space */
  cursor: pointer;
}

.item {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%; /* Make sure the item fills the link wrapper */
}

.item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.banner-content {
  max-width: 1200px;
  width: 90vw;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  text-align: center;
  z-index: 1;
}

.text-box h1 {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: #4a2c2a;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.italiano {
  color: #b35c00;
  font-style: italic;
  text-transform: uppercase;
}

.subtext {
  margin-top: 1.5rem;
  font-size: 1rem;
  color: #666;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.carousel {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 15px;
}

.carousel-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  border: 2px solid #ffe5cc; /* Added border for loading feedback */
}

.carousel-image:hover {
  transform: scale(1.02);
}

.carousel-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 1rem;
  z-index: 2;
}

.carousel-btn {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  font-size: 1.8rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.carousel-btn:hover:not(:disabled) {
  background-color: #fff;
  transform: scale(1.1);
}

.carousel-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.formas-consumo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: #fff;
}

.item {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.item h2 {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: #4a2c2a;
}

.item-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  border: 2px solid #ffe5cc; /* Added border for loading feedback */
  transition: border-color 0.3s ease;
}

.item-image[src*="via.placeholder"] {
  border-color: #ff6347; /* Red border for placeholder images */
}

.item p {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .banner {
    padding: 2rem 1rem;
  }

  .banner-content {
    gap: 2rem;
  }

  .text-box h1 {
    font-size: 2rem;
  }

  .subtext {
    font-size: 0.9rem;
  }

  .carousel-image {
    height: 300px;
  }

  .carousel-btn {
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
  }

  .formas-consumo {
    padding: 2rem 1rem;
    gap: 1.5rem;
  }

  .item {
    padding: 1rem;
  }

  .item h2 {
    font-size: 1.1rem;
  }

  .item-image {
    height: 150px;
  }
}

@media (max-width: 480px) {
  .text-box h1 {
    font-size: 1.5rem;
  }

  .subtext {
    font-size: 0.85rem;
  }

  .carousel-image {
    height: 250px;
  }

  .item h2 {
    font-size: 1rem;
  }

  .item-image {
    height: 120px;
  }
}
</style>