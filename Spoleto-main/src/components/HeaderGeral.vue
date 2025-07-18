<template>
    <header class="header">
      <div class="container">
        <!-- Logo -->
        <div class="logo">
          <span class="logo-text"><RouterLink to="/" class="logo-link">SPOLETO</RouterLink></span>
          <div class="logo-circle"></div>
        </div>
  

        <nav class="nav">
          <ul class="nav-list">
            <li class="nav-item"><RouterLink to="/cardapio" class="nav-link">Massas</RouterLink></li>
            <li class="nav-item"><RouterLink to="/molho" class="nav-link">Mólhos</RouterLink></li>
            <li class="nav-item"><RouterLink to="/acompanhamento" class="nav-link">Acompanhamento</RouterLink></li>
            <li class="nav-item"><RouterLink to="/pedidos" class="nav-link">Pedidos</RouterLink></li>
            <li class="nav-item"><RouterLink to="/Restaurantes" class="nav-link">Restaurantes</RouterLink></li>
          </ul>
        </nav>
  
        <div class="login-section">
          <button class="login-btn" @click="goToLogin">
            <svg class="login-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            Login
          </button>
        </div>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { RouterLink, useRouter } from 'vue-router'
  
  const router = useRouter()
  function goToLogin() {
    router.push('/login')
  }
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .header {
    background-color: #ffffff;
    border-bottom: 1px solid #e0e0e0;
    padding: 0;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
  }
  
  /* Logo Styles */
  .logo {
    text-decoration: none;
    color: #000000 ;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .logo-link {
    text-decoration: none;
    color: #333333;
  }
  
  .logo-text {
    text-decoration: none;
    font-size: 24px;
    font-weight: 700;
    color: #333333;
    letter-spacing: 2px;
  }
  
  .logo-circle {
    width: 12px;
    height: 12px;
    background-color: #FFD700;
    border-radius: 50%;
  }
  
  /* Navigation Styles */
  .nav {
    flex: 1;
    display: flex;
    justify-content: center;
    margin: 0 40px;
  }
  
  .nav-list {
    display: flex;
    list-style: none;
    gap: 40px;
    align-items: center;
  }
  
  .nav-item {
    position: relative;
  }
  
  .nav-link {
    text-decoration: none;
    color: #333333;
    font-size: 16px;
    font-weight: 400;
    padding: 8px 0;
    transition: color 0.3s ease;
  }
  
  .nav-link:hover {
    color: #666666;
  }
  
  /* Login Button Styles */
  .login-section {
    display: flex;
    align-items: center;
  }
  
  .login-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: #333333;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .login-btn:hover {
    background-color: #f5f5f5;
  }
  
  .login-icon {
    width: 20px;
    height: 20px;
    color: #333333;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .container {
      padding: 12px 16px;
    }
  
    .nav {
      display: none;
    }
  
    .logo-text {
      font-size: 20px;
    }
  }
  </style>
  