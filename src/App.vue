<script setup>
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import { ref } from 'vue';

const items = ref([
  { label: 'Home', icon: 'pi pi-home', to: '/' },
  { label: 'Services', icon: 'pi pi-th-large', to: '/services' },
  { label: 'Portfolio', icon: 'pi pi-briefcase', to: '/portfolio' },
  { label: 'About', icon: 'pi pi-info-circle', to: '/about' },
  { label: 'Contact', icon: 'pi pi-envelope', to: '/contact' },
]);
</script>

<template>
  <div class="app-container">
    <header class="sticky top-0 z-5 shadow-1">
      <Menubar :model="items" class="border-none px-4 py-3">
        <template #start>
          <div class="flex align-items-center gap-2 mr-8 cursor-pointer" @click="$router.push('/')">
            <!-- <i class="pi pi-bolt text-primary text-3xl"></i>
            <span class="text-2xl font-bold text-slate-900">LUMICORE</span> -->
            <img src="/logo.png" alt="Lumicore Logo" class="w-3" />
          </div>
        </template>
        <template #item="{ item, props, hasSubmenu }">
          <router-link
            v-if="item.to"
            :to="item.to"
            v-bind="props.action"
            class="flex align-items-center"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
          </a>
        </template>
        <template #end>
          <Button
            label="Get a Quote"
            icon="pi pi-arrow-right"
            iconPos="right"
            size="small"
            @click="$router.push('/contact')"
          />
        </template>
      </Menubar>
    </header>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="bg-slate-900 text-white py-8 mt-8">
      <div class="container">
        <div class="grid">
          <div class="col-12 md:col-4 mb-4">
            <div class="flex align-items-center gap-2 mb-4">
              <i class="pi pi-bolt text-blue-400 text-2xl"></i>
              <span class="text-xl font-bold">LUMICORE</span>
            </div>
            <p class="opacity-70">
              Leading the way in AI-first software solutions and digital transformation for
              businesses worldwide.
            </p>
          </div>
          <div class="col-12 md:col-4 mb-4">
            <h3 class="text-lg font-bold mb-4">Quick Links</h3>
            <ul class="list-none p-0 opacity-70">
              <li class="mb-2"><router-link to="/services">Services</router-link></li>
              <li class="mb-2"><router-link to="/portfolio">Portfolio</router-link></li>
              <li class="mb-2"><router-link to="/about">About Us</router-link></li>
              <li class="mb-2"><router-link to="/contact">Contact</router-link></li>
            </ul>
          </div>
          <div class="col-12 md:col-4 mb-4">
            <h3 class="text-lg font-bold mb-4">Connect With Us</h3>
            <div class="flex gap-3">
              <i class="pi pi-facebook text-xl cursor-pointer hover:text-blue-400"></i>
              <i class="pi pi-twitter text-xl cursor-pointer hover:text-blue-400"></i>
              <i class="pi pi-linkedin text-xl cursor-pointer hover:text-blue-400"></i>
              <i class="pi pi-instagram text-xl cursor-pointer hover:text-blue-400"></i>
            </div>
            <p class="mt-4 opacity-70">&copy; 2025 Lumicore Labs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.text-primary {
  color: var(--accent-color);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.p-menubar {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}

.router-link-active {
  color: var(--accent-color) !important;
  font-weight: bold;
}
</style>
