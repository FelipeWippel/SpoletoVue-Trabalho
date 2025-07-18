<template>
  <div class="delivery-page">
    <!-- Banner Section -->
    <section class="banner">
      <div class="banner-content">
        <h1>🚴 Peça pelo App!</h1>
        <p class="subtext">
          Baixe nosso aplicativo para ter a experiência Spoleto completa na palma da sua mão. É mais rápido, fácil e cheio de promoções exclusivas!
        </p>
      </div>
    </section>

    <!-- QR Code Section -->
    <main class="qr-code-container">
      <div class="qr-card">
        <h2>Aponte a câmera e baixe agora</h2>
        <p>Use o leitor de QR Code do seu celular para fazer o download direto.</p>
        <img :src="qrCodeImage" alt="QR Code para baixar o app Spoleto" class="qr-image" />
        <div class="divider">ou baixe pelas lojas</div>
        <div class="store-buttons">
          <a :href="appStoreUrl" target="_blank" rel="noopener noreferrer">
            <img :src="appStoreBadge" alt="Download on the App Store" class="store-badge" />
          </a>
          <a :href="googlePlayUrl" target="_blank" rel="noopener noreferrer">
            <img :src="googlePlayBadge" alt="Get it on Google Play" class="store-badge" />
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// --- Assets ---
// IMPORTANT: Replace these with your actual assets.
// You can generate a QR code from a URL using various free online tools.
// The URL should point to a landing page that detects the user's device (iOS/Android).
const qrCodeImage = ref('https://generator.qrcodefacil.com/qrcodes/static-865c7bf548523b8c60f61f14a7b086b8.svg'); // Found an official QR code from Spoleto's site
const appStoreBadge = ref('https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg');
const googlePlayBadge = ref('https://play.google.com/intl/en_us/badges/static/images/badges/pt-br_badge_web_generic.png');

// --- App Store Links ---
// IMPORTANT: Replace with the correct URLs for the Spoleto app
const appStoreUrl = ref('https://apps.apple.com/br/app/spoleto-comida-italiana/id6479528325');
const googlePlayUrl = ref('https://play.google.com/store/apps/details?id=br.com.alphacode.spoleto');
</script>

<style scoped>
/* Main page styling */
.delivery-page {
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  color: #333;
  background-color: #fff;
}

/* Banner Styling - Consistent with other pages */
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

/* QR Code Section Styling */
.qr-code-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  background-color: #fff7ed; /* Soft background color from the brand palette */
}

.qr-card {
  max-width: 450px;
  width: 100%;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.qr-card h2 {
  font-size: 1.8rem;
  color: #4a2c2a;
  margin: 0;
}

.qr-card p {
  font-size: 1rem;
  color: #666;
  max-width: 90%;
}

.qr-image {
  width: 100%;
  max-width: 280px;
  height: auto;
  margin: 1rem 0;
  border-radius: 10px;
  border: 1px solid #eee;
}

.divider {
  font-size: 0.9rem;
  color: #999;
  text-transform: uppercase;
  margin: 1rem 0;
}

.store-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.store-buttons a {
  display: block;
  transition: transform 0.2s ease;
}

.store-buttons a:hover {
  transform: scale(1.05);
}

.store-badge {
  height: 55px;
  width: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .banner-content h1 {
    font-size: 2rem;
  }
  .subtext {
    font-size: 1rem;
  }
  .qr-code-container {
    padding: 2rem 1rem;
  }
  .qr-card {
    padding: 2rem 1.5rem;
  }
}
</style>