import HomeView from "@/views/HomeView.vue"
import CardapioView from "@/views/CardapioView.vue"

import MolhoView from "@/views/MolhoView.vue"
import AcompView from "@/views/AcompView.vue"
import PedidosView from "@/views/PedidosView.vue"
import Restaurantess from "@/views/RestaurantesView.vue"
import DeliveryView from "@/views/DeliveryView.vue"
import LoginView from "@/views/LoginView.vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: '/', component: HomeView },
  { path: '/cardapio', component: CardapioView },
  { path: '/molho', component: MolhoView },
  { path: '/acompanhamento', component: AcompView },
  { path: '/pedidos', component: PedidosView  },
  { path: '/restaurantes', component: Restaurantess  },
  { path: '/delivery', component: DeliveryView  },
  { path: '/login', component: LoginView  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router