<template>
  <div class="login-container">
    <!-- Left Panel: The Artistic Showcase -->
    <div class="art-panel">
      <div class="overlay">
        <h1 class="art-title">A sua massa, do seu jeito.</h1>
        <p class="art-subtitle">Acesse sua conta e monte seus pratos favoritos.</p>
      </div>
    </div>

    <!-- Right Panel: The Interactive Form -->
    <div class="form-panel">
      <div class="form-content">
        <div class="logo">SPOLETO ●</div>
        <h2>Bentornato!</h2>
        <p class="welcome-text">Faça o login para ter acesso ao seu mundo de sabores.</p>

        <form @submit.prevent="handleLogin">
          <!-- Email Input with SVG Icon -->
          <div class="form-group">
            <input type="email" id="email" v-model="email" required autocomplete="email" />
            <label for="email">E-mail</label>
            <!-- Mail Icon SVG -->
            <svg class="form-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </div>

          <!-- Password Input with SVG Icons -->
          <div class="form-group">
            <input :type="passwordFieldType" id="password" v-model="password" required autocomplete="current-password" />
            <label for="password">Senha</label>
             <!-- Lock Icon SVG -->
            <svg class="form-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <button type="button" @click="togglePasswordVisibility" class="password-toggle">
              <!-- Eye Open SVG -->
              <svg v-if="passwordFieldType === 'password'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <!-- Eye Closed SVG -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            </button>
          </div>

          <div class="form-options">
            <a href="#" class="forgot-password">Esqueceu a senha?</a>
          </div>
          
          <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>

          <button type="submit" class="login-btn" :disabled="isLoading">
            <div v-if="!isLoading" class="button-content-wrapper">
              <svg class="login-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span>Login</span>
            </div>
            <div v-else class="spinner"></div>
          </button>
        </form>

        <div class="divider"><span>ou continue com</span></div>

        <div class="social-login">
          <!-- Google Icon SVG -->
          <button class="social-btn google">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 9.92C34.553 6.08 29.613 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/></svg>
          </button>
          <!-- Apple Icon SVG -->
          <button class="social-btn apple">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.62 16.14a4.34 4.34 0 0 1-4.44-4.3c0-2.38 1.95-4.32 4.32-4.32a4.23 4.23 0 0 1 3.12 1.4c-1.4.88-2.28 2.37-2.28 3.82c0 2.22 1.83 4.14 4.04 4.14c.22 0 .44-.02.66-.06a4.34 4.34 0 0 1-5.42-0.72M15.4 11.23c-.1-.72-.3-1.42-.6-2.09c-.83-1.8-2.2-2.9-3.72-2.96c-1.54-.05-3.1.9-4.05 2.2c-1.2 1.6-1.9 3.8-1.5 5.86c.33 1.63 1.5 3.3 2.9 4.13c.7.4 1.5.6 2.3.6c.88 0 1.6-.2 2.2-.6c1.2-.8 2.1-2.1 2.5-3.6c.09-.3.17-.6.25-.9z"/></svg>
          </button>
        </div>
        
        <p class="signup-link">
          Não tem uma conta? <router-link to="/login">Cadastre-se</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Your script section remains the same - no changes needed here.
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const passwordFieldType = ref<'password' | 'text'>('password');
const isLoading = ref(false);
const errorMsg = ref('');

const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};

const handleLogin = () => {
  if (!email.value || !password.value) {
    errorMsg.value = 'Por favor, preencha todos os campos.';
    return;
  }
  
  errorMsg.value = '';
  isLoading.value = true;

  setTimeout(() => {
    if (email.value === 'cliente@spoleto.com' && password.value === 'password') {
      console.log('Login successful!');
      router.push('/');
    } else {
      errorMsg.value = 'E-mail ou senha inválidos. Tente novamente.';
    }
    isLoading.value = false;
  }, 1500);
};
</script>

<style scoped>
/* --- Main Container Layout --- */
.login-container { display: flex; min-height: 100vh; width: 100%; font-family: 'Segoe UI', 'Roboto', sans-serif; background-color: #fff7ed; }

/* --- Left Art Panel --- */
.art-panel { flex: 1; background-image: url('https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/167c88cd-a052-4305-9c47-0ab26a38dc4c/4549ed7f-1cd5-480c-938f-98399f73acab.png'); background-size: cover; background-position: center; position: relative; display: flex; justify-content: center; align-items: center; }
.overlay { background: rgba(0, 0, 0, 0.5); position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; justify-content: flex-end; padding: 4rem; color: #fff; }
.art-title { font-size: 3rem; font-weight: 800; line-height: 1.2; text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7); }
.art-subtitle { font-size: 1.2rem; font-weight: 300; max-width: 400px; opacity: 0.9; }

/* --- Right Form Panel --- */
.form-panel { flex: 1; display: flex; justify-content: center; align-items: center; padding: 2rem; animation: slideInFromRight 0.8s ease-in-out; }
.form-content { width: 100%; max-width: 400px; }
.logo { font-size: 1.5rem; font-weight: bold; color: #4a2c2a; margin-bottom: 1rem; }
.form-content h2 { font-size: 2.5rem; font-weight: 800; color: #4a2c2a; margin-bottom: 0.5rem; }
.welcome-text { color: #666; margin-bottom: 2.5rem; font-size: 1.1rem; }

/* --- Floating Label Inputs with ICONS --- */
.form-group { position: relative; margin-bottom: 2rem; }
.form-group input {
  width: 100%;
  border: none;
  border-bottom: 2px solid #ddd;
  padding: 10px 0 10px 35px; /* Added left padding for icon */
  background-color: transparent;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}
.form-group label {
  position: absolute;
  top: 10px;
  left: 35px; /* Adjusted label position */
  color: #999;
  pointer-events: none;
  transition: all 0.3s ease;
}
.form-icon {
  position: absolute;
  left: 0;
  top: 8px;
  color: #999;
  transition: color 0.3s ease;
}
.form-group input:focus ~ .form-icon,
.form-group input:valid ~ .form-icon {
  color: #b35c00; /* Change icon color on focus/valid */
}
.form-group input:focus, .form-group input:valid { border-bottom-color: #b35c00; }
.form-group input:focus + label, .form-group input:valid + label { top: -16px; left: 0; font-size: 0.8rem; color: #b35c00; }

.password-toggle { position: absolute; right: 0; top: 8px; background: none; border: none; cursor: pointer; color: #999; }

/* --- Buttons and other elements --- */
.form-options { text-align: right; margin-top: -1rem; margin-bottom: 1rem; }
.forgot-password { color: #b35c00; font-size: 0.9rem; text-decoration: none; }
.error-message { color: #e74c3c; background-color: #fdd; padding: 10px; border-radius: 5px; margin-bottom: 1rem; font-size: 0.9rem; }

.login-btn { width: 100%; padding: 15px; background: linear-gradient(90deg, #b35c00, #E69500); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(179, 92, 0, 0.3); position: relative; min-height: 52px; display: flex; justify-content: center; align-items: center; }
.login-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(179, 92, 0, 0.4); }
.login-btn:disabled { opacity: 0.7; cursor: not-allowed; }

.button-content-wrapper { display: flex; align-items: center; justify-content: center; gap: 10px; }
.login-icon { margin-top: -2px; }
.spinner { width: 24px; height: 24px; border: 3px solid rgba(255, 255, 255, 0.3); border-radius: 50%; border-top-color: #fff; animation: spin 1s ease-in-out infinite; margin: auto; }

/* Social Login */
.divider { display: flex; align-items: center; text-align: center; color: #ccc; margin: 2rem 0; }
.divider::before, .divider::after { content: ''; flex: 1; border-bottom: 1px solid #eee; }
.divider:not(:empty)::before { margin-right: .5em; }
.divider:not(:empty)::after { margin-left: .5em; }

.social-login { display: flex; justify-content: center; gap: 1.5rem; }
.social-btn { background: #f7f7f7; border: 1px solid #ddd; width: 50px; height: 50px; border-radius: 50%; display: grid; place-items: center; cursor: pointer; transition: all 0.3s ease; }
.social-btn:hover { background-color: #fff; border-color: #b35c00; color: #b35c00; }
.social-btn.apple { color: #333; } /* Apple logo is often black/grey */

/* Sign-up link */
.signup-link { text-align: center; margin-top: 2rem; color: #666; }
.signup-link a { color: #b35c00; font-weight: bold; text-decoration: none; }

/* --- Animations & Responsiveness --- */
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes slideInFromRight { from { transform: translateX(50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

@media (max-width: 900px) { .art-panel { display: none; } .form-panel { flex-basis: 100%; } }
</style>