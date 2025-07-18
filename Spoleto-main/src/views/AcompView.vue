<template>
    <div class="wrapper">
      <header class="header">
        
        
        <div class="header-main">
          <div class="search-container">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
            </svg>
            <input type="text" placeholder="Buscar acompanhamentos" class="search-input" v-model="searchTerm">
          </div>
        </div>
      </header>
  
      <main class="main-content">
        <section class="menu-section">
          <h2 class="section-title">Escolha seu Acompanhamento</h2>
          <div class="dishes-grid">
            <div v-for="accompaniment in filteredAccompaniments" :key="accompaniment.id" class="dish-card"
                 :class="{ 'selected': selectedItem && selectedItem.id === accompaniment.id }"
                 @click="selectItem(accompaniment)">
              <img :src="accompaniment.image" :alt="accompaniment.name" class="dish-image">
              <div class="dish-info">
                <h3 class="dish-name">{{ accompaniment.name }}</h3>
                <p class="dish-description">{{ accompaniment.description }}</p>
                <p class="dish-price">R${{ accompaniment.price.toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </section>
  
        <div v-if="selectedItem" class="selection-box">
          <h3>Seleção Atual</h3>
          <p>{{ selectedItem.name }} - R${{ selectedItem.price.toFixed(2) }}</p>
          <button @click="goToCart" class="next-btn">Ir para o Carrinho</button>
          <button @click="goBack" class="back-btn">Voltar</button>
        </div>
      </main>
    </div>
  </template>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: #f5f5f5;
    line-height: 1.6;
  }
  
  /* Header Styles */
  .header {
    background-color: #FFA500;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .header-top {
    background-color: #4A2C2A;
    color: white;
    padding: 8px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding-left: 24px;
    padding-right: 24px;
  }
  
  .location {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    cursor: pointer;
  }
  
  .location-icon, .dropdown-icon {
    width: 16px;
    height: 16px;
  }
  
  .delivery-btn {
    background-color: #4A2C2A;
    color: white;
    border: 1px solid #666;
    padding: 6px 16px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .delivery-btn:hover {
    background-color: #5A3C3A;
  }
  
  .header-main {
    padding: 16px 24px;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 24px;
  }
  
  /* Search Styles */
  .search-container {
    position: relative;
    flex: 0 0 300px;
  }
  
  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
  
  .search-input {
    width: 100%;
    padding: 12px 12px 12px 40px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .search-input:focus {
    outline: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  
  /* Main Content */
  .main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }
  
  .menu-section {
    margin-bottom: 48px;
  }
  
  .section-title {
    font-size: 28px;
    font-weight: 700;
    color: #333;
    margin-bottom: 24px;
  }
  
  /* Dishes Grid */
  .dishes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }
  
  .dish-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }
  
  .dish-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  }
  
  .dish-card.selected {
    background-color: #FFF5E6;
    border: 2px solid #FFA500;
  }
  
  .dish-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 2px solid #ffe5cc;
  }
  
  .dish-info {
    padding: 16px;
  }
  
  .dish-name {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
    line-height: 1.4;
  }
  
  .dish-description {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    margin-bottom: 8px;
  }
  
  .dish-price {
    font-size: 16px;
    font-weight: 600;
    color: #FFA500;
  }
  
  /* Selection Box */
  .selection-box {
    background: white;
    border-radius: 12px;
    padding: 16px;
    margin: 24px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    text-align: center;
  }
  
  .selection-box h3 {
    font-size: 20px;
    margin-bottom: 12px;
  }
  
  .selection-box p {
    font-size: 16px;
    margin-bottom: 16px;
  }
  
  .next-btn, .back-btn {
    background-color: #FFA500;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 0 8px;
  }
  
  .next-btn:hover, .back-btn:hover {
    background-color: #E69500;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .header-main {
      flex-direction: column;
      gap: 16px;
      padding: 16px;
    }
    
    .search-container {
      flex: 1;
      width: 100%;
    }
    
    .main-content {
      padding: 16px;
    }
    
    .dishes-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    
    .section-title {
      font-size: 24px;
    }
  }
  
  @media (max-width: 480px) {
    .header-top {
      padding-left: 16px;
      padding-right: 16px;
    }
    
    .location {
      font-size: 12px;
    }
    
    .delivery-btn {
      font-size: 12px;
      padding: 4px 12px;
    }
  }
  </style>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  const searchTerm = ref('');
  const selectedItem = ref(null);
  const router = useRouter();
  
  const accompaniments = ref([
    { id: 1, name: 'Filé Mignon', description: 'Corte nobre grelhado ao ponto', price: 35.90, image: 'https://frigorificoarvoredo.com.br/blog/wp-content/uploads/2017/12/receitas-com-file-mignon-conheca-3-opcoes-irresistiveis.jpg' },
    { id: 2, name: 'Almondega', description: 'Almôndegas caseiras em molho de tomate', price: 19.90, image: 'https://www.agrimidia.com.br/wp-content/uploads/2024/04/PNK6277-almondegas-molho-tomate.jpg' },
    { id: 3, name: 'Costela', description: 'Costela bovina desfiada e suculenta', price: 32.90, image: 'https://conteudo.imguol.com.br/c/entretenimento/19/2020/11/09/costela-de-boi-1604926430242_v2_4x3.jpg' },
    { id: 4, name: 'Alcatra', description: 'Corte macio grelhado com ervas', price: 29.90, image: 'https://i.pinimg.com/736x/b6/2f/bc/b62fbc485d62cbfaa1aaa367653056eb.jpg' },
    { id: 5, name: 'Picanha', description: 'Corte suculento grelhado com sal grosso.', price: 69.69, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo1P-nU6zswe0ZM7HnfPZr6I3-Qr7AUBv8Sg&s' },
    { id: 7, name: 'Frango', description: 'Corte leve grelhado com toque de especiarias', price: 2.00, image: 'https://extra.globo.com/incoming/2509301-72e-9d5/w976h550-PROP/hao_mao.jpg' },
  ]);
  
  const filteredAccompaniments = computed(() => {
    return accompaniments.value.filter(accompaniment =>
      accompaniment.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      accompaniment.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });
  
  const selectItem = (item: any) => {
    selectedItem.value = item;
  };
  
  const goToCart = () => {
    const order = JSON.parse(localStorage.getItem('order') || '{}');
    order.accompaniment = selectedItem.value;
    localStorage.setItem('order', JSON.stringify(order));
    router.push('/pedidos');
  };
  
  const goBack = () => {
    router.push('/molho');
  };
  </script>