<template>
  <div class="cart-page">
    <header class="header">
      <h1>Carrinho de Compras</h1>
    </header>
    <main class="main-content">
      <div v-if="order.pasta || order.sauce || order.accompaniment">
        <h2>Resumo do Pedido</h2>
        <div class="order-summary">
          <!-- Item Details -->
          <div v-if="order.pasta">
            <p>{{ order.pasta.name }} - R$ {{ order.pasta.price.toFixed(2) }}</p>
          </div>
          <div v-if="order.sauce">
            <p>{{ order.sauce.name }} - R$ {{ order.sauce.price.toFixed(2) }}</p>
          </div>
          <div v-if="order.accompaniment">
            <p>{{ order.accompaniment.name }} - R$ {{ order.accompaniment.price.toFixed(2) }}</p>
          </div>

          <!-- Conditionally show Delivery Fee -->
          <div v-if="deliveryMethod === 'delivery'" class="delivery-fee-line">
            <p>Taxa de Entrega - R$ {{ DELIVERY_FEE.toFixed(2) }}</p>
          </div>
          
          <p class="total-price">Total: R$ {{ totalPrice.toFixed(2) }}</p>
        </div>
        <button @click="startPaymentProcess" class="pay-btn">Fazer Pagamento</button>
        <button @click="backToMenu" class="back-btn">Voltar ao Menu</button>
      </div>
      <div v-else>
        <p>Seu carrinho está vazio.</p>
        <button @click="backToMenu" class="back-btn">Voltar ao Menu</button>
      </div>
    </main>

    <!-- NEW: Delivery Choice Modal -->
    <div v-if="showDeliveryChoiceModal" class="delivery-modal">
      <div class="delivery-content">
        <h2>Como você prefere receber?</h2>
        <p>Escolha uma das opções abaixo para continuar.</p>
        <div class="choice-buttons">
          <button @click="selectDeliveryMethod('delivery')" class="choice-btn">
            🚴 Delivery <span class="fee-text">(+ R$ {{ DELIVERY_FEE.toFixed(2) }})</span>
          </button>
          <button @click="selectDeliveryMethod('pickup')" class="choice-btn">
            🛒 Retirar na Loja
          </button>
        </div>
        <button @click="closeDeliveryChoiceModal" class="close-btn">Voltar</button>
      </div>
    </div>

    <!-- Payment Modal (with QR Code) -->
    <div v-if="showPaymentModal" class="payment-modal">
      <div class="payment-content">
        <h2>Pagamento</h2>
        <div class="order-details">
          <h3>Detalhes do Pedido</h3>
          <div v-if="order.pasta">
            <p>{{ order.pasta.name }} - R$ {{ order.pasta.price.toFixed(2) }}</p>
          </div>
          <div v-if="order.sauce">
            <p>{{ order.sauce.name }} - R$ {{ order.sauce.price.toFixed(2) }}</p>
          </div>
          <div v-if="order.accompaniment">
            <p>{{ order.accompaniment.name }} - R$ {{ order.accompaniment.price.toFixed(2) }}</p>
          </div>
          <!-- Conditionally show Delivery Fee in final modal too -->
           <div v-if="deliveryMethod === 'delivery'" class="delivery-fee-line">
            <p>Taxa de Entrega - R$ {{ DELIVERY_FEE.toFixed(2) }}</p>
          </div>
          <p class="total-price">Total Final: R$ {{ totalPrice.toFixed(2) }}</p>
        </div>
        <div class="timer">Tempo restante: {{ formattedTimer }}</div>
        <div class="qr-code">
          <img :src="QrCode" alt="QR Code para Pagamento" class="qr-image" />
        </div>
        <button @click="closePaymentModal" class="close-btn">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import QrCode from '@/assets/img/QrCode.jpeg';

// --- Configuration ---
const DELIVERY_FEE = 15.00; // Define delivery fee as a constant
const PAYMENT_TIMER_MINUTES = 10;

// --- State Management ---
const router = useRouter();
const order = ref({ pasta: null as any, sauce: null as any, accompaniment: null as any });
const deliveryMethod = ref<'delivery' | 'pickup' | null>(null);
const showDeliveryChoiceModal = ref(false); // NEW: State for the choice modal
const showPaymentModal = ref(false); // State for the final payment modal

// --- Timer State ---
const timerValue = ref(PAYMENT_TIMER_MINUTES * 60);
let timerInterval: NodeJS.Timeout | null = null;

// --- Computed Properties ---
const totalPrice = computed(() => {
  let total = 0;
  if (order.value.pasta) total += order.value.pasta.price;
  if (order.value.sauce) total += order.value.sauce.price;
  if (order.value.accompaniment) total += order.value.accompaniment.price;

  // Add delivery fee if the method is 'delivery'
  if (deliveryMethod.value === 'delivery') {
    total += DELIVERY_FEE;
  }
  
  return total;
});

const formattedTimer = computed(() => {
  const minutes = Math.floor(timerValue.value / 60);
  const seconds = timerValue.value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

// --- Lifecycle Hooks ---
onMounted(() => {
  const storedOrder = localStorage.getItem('order');
  if (storedOrder) {
    order.value = JSON.parse(storedOrder);
  }
});

// --- Methods ---
const startPaymentProcess = () => {
  deliveryMethod.value = null; // Reset choice every time
  showDeliveryChoiceModal.value = true;
};

const selectDeliveryMethod = (method: 'delivery' | 'pickup') => {
  deliveryMethod.value = method;
  showDeliveryChoiceModal.value = false;
  showPaymentModal.value = true;
  startTimer();
};

const closeDeliveryChoiceModal = () => {
  showDeliveryChoiceModal.value = false;
};

const closePaymentModal = () => {
  showPaymentModal.value = false;
  if (timerInterval) clearInterval(timerInterval);
};

const backToMenu = () => {
  localStorage.removeItem('order');
  router.push('/');
};

const startTimer = () => {
  timerValue.value = PAYMENT_TIMER_MINUTES * 60; // Reset timer
  if (timerInterval) clearInterval(timerInterval);
  
  timerInterval = setInterval(() => {
    if (timerValue.value > 0) {
      timerValue.value--;
    } else {
      if (timerInterval) clearInterval(timerInterval);
      closePaymentModal();
    }
  }, 1000);
};
</script>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Segoe UI', Roboto, sans-serif;
}
.header {
  background-color: #FFA500;
  padding: 16px;
  text-align: center;
  margin-bottom: 24px;
  border-radius: 8px 8px 0 0;
}
.header h1 {
  color: white;
  font-size: 28px;
  font-weight: 700;
}
.main-content {
  padding: 24px;
  background: white;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
}
.order-summary {
  margin-bottom: 24px;
}
.order-summary p {
  font-size: 16px;
  margin: 8px 0;
}
.delivery-fee-line p {
  color: #555;
  font-style: italic;
}
.total-price {
  font-weight: 600;
  font-size: 18px;
  color: #FFA500;
  margin-top: 16px;
}
.pay-btn, .back-btn {
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
.pay-btn:hover, .back-btn:hover {
  background-color: #E69500;
}

/* --- Modal Base Styles --- */
/* This style applies to the overlay of BOTH modals */
.delivery-modal, .payment-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 1rem;
}

/* This style applies to the content box of BOTH modals */
.delivery-content, .payment-content {
  background: white;
  padding: 24px 32px;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.delivery-content h2, .payment-content h2 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #333;
}
.close-btn {
  background-color: #888;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 16px;
}
.close-btn:hover {
  background-color: #777;
}


/* --- Styles for SPECIFIC Modals --- */

/* NEW Styles for Delivery Choice Modal */
.delivery-content p {
  color: #666;
  margin-bottom: 24px;
}
.choice-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.choice-btn {
  background-color: #f7f7f7;
  border: 2px solid #ddd;
  padding: 16px;
  width: 100%;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: #333;
}
.choice-btn:hover {
  border-color: #FFA500;
  background-color: #fff8f0;
}
.fee-text {
  font-weight: normal;
  color: #e69500;
  font-size: 16px;
}

/* Styles for Payment Modal */
.order-details {
  margin-bottom: 16px;
}
.order-details h3 {
  font-size: 20px;
  margin-bottom: 12px;
}
.order-details p {
  font-size: 16px;
  margin: 8px 0;
}
.timer {
  font-size: 18px;
  font-weight: 600;
  color: #FF4500;
  margin: 16px 0;
}
.qr-code {
  margin: 16px 0;
}
.qr-image {
  max-width: 100%;
  max-height: 250px;
  height: auto;
  border: 2px solid #FFA500;
  border-radius: 8px;
}
</style>