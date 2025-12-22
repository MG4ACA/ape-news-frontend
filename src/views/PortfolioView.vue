<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';

const projects = [
  {
    title: 'MediFlow POS',
    category: 'Pharmacy Management',
    image: 'https://placehold.co/600x400/0f172a/ffffff?text=MediFlow+POS',
    description: 'A comprehensive POS and inventory system for large-scale pharmacies.',
  },
  {
    title: 'StyleSync',
    category: 'Salon Management',
    image: 'https://placehold.co/600x400/3b82f6/ffffff?text=StyleSync',
    description: 'Appointment scheduling and sales tracking for modern hair and beauty salons.',
  },
  {
    title: 'LumiHR',
    category: 'Enterprise Software',
    image: 'https://placehold.co/600x400/64748b/ffffff?text=LumiHR',
    description: 'An AI-integrated HR management system for medium to large enterprises.',
  },
  {
    title: 'EcoShop',
    category: 'E-commerce',
    image: 'https://placehold.co/600x400/0f172a/ffffff?text=EcoShop',
    description: 'A high-performance web application for a sustainable consumer goods brand.',
  },
];
</script>

<template>
  <div class="portfolio-view">
    <section class="page-header bg-slate-100 text-center py-8">
      <div class="container">
        <h1 class="text-5xl font-bold mb-2">Our Portfolio</h1>
        <p class="text-xl text-secondary">A showcase of our latest work and digital innovations.</p>
      </div>
    </section>

    <section class="portfolio-grid">
      <div class="container">
        <div class="grid">
          <div v-for="project in projects" :key="project.title" class="col-12 md:col-6 p-3">
            <Card class="overflow-hidden fade-in">
              <template #header>
                <img :src="project.image" :alt="project.title" class="w-full block" />
              </template>
              <template #title>
                <div class="flex justify-content-between align-items-center">
                  <span>{{ project.title }}</span>
                  <span class="text-sm font-normal text-secondary">{{ project.category }}</span>
                </div>
              </template>
              <template #content>
                <p class="mb-4">{{ project.description }}</p>
                <Button label="View Case Study" icon="pi pi-external-link" size="small" text />
              </template>
            </Card>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.text-secondary {
  color: var(--text-secondary-color);
}
</style>
