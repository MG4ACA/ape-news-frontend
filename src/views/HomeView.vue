<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero flex align-items-center justify-content-center text-center">
      <div class="container fade-in">
        <h1 class="text-6xl font-bold mb-4">Illuminating Your Digital Future</h1>
        <p class="text-xl mb-8 text-secondary">
          Lumicore provides cutting-edge software solutions, from custom POS systems to AI-driven
          web applications.
        </p>
        <div class="flex gap-3 justify-content-center">
          <Button label="Our Services" icon="pi pi-th-large" @click="$router.push('/services')" />
          <Button
            label="Contact Us"
            icon="pi pi-envelope"
            severity="secondary"
            outlined
            @click="$router.push('/contact')"
          />
        </div>
      </div>
    </section>

    <!-- Quick Services Overview -->
    <section class="services-overview bg-white">
      <div class="container">
        <h2 class="text-4xl font-bold text-center mb-8">Expertise Across All Platforms</h2>
        <div class="grid">
          <div class="col-12 md:col-4 p-3">
            <Card class="h-full hover:shadow-lg transition-duration-300">
              <template #title>
                <i class="pi pi-desktop text-primary text-3xl mb-3"></i>
                <div>Web Development</div>
              </template>
              <template #content>
                <p>
                  Modern, responsive websites and complex web applications built with the latest
                  technologies like Vue.js and AI-optimized architectures.
                </p>
              </template>
            </Card>
          </div>
          <div class="col-12 md:col-4 p-3">
            <Card class="h-full hover:shadow-lg transition-duration-300">
              <template #title>
                <i class="pi pi-mobile text-primary text-3xl mb-3"></i>
                <div>Mobile Apps</div>
              </template>
              <template #content>
                <p>
                  Native and cross-platform mobile solutions designed for seamless user experiences
                  on iOS and Android.
                </p>
              </template>
            </Card>
          </div>
          <div class="col-12 md:col-4 p-3">
            <Card class="h-full hover:shadow-lg transition-duration-300">
              <template #title>
                <i class="pi pi-shopping-cart text-primary text-3xl mb-3"></i>
                <div>POS Systems</div>
              </template>
              <template #content>
                <p>
                  Tailored POS solutions for pharmacies, salons, and retail shops, integrating
                  inventory management and real-time analytics.
                </p>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Integration Section (SEO Trend) -->
    <section class="ai-section bg-slate-50">
      <div class="container grid align-items-center">
        <div class="col-12 md:col-6 slide-in-left">
          <h2 class="text-4xl font-bold mb-4">AI-First Software Solutions</h2>
          <p class="text-lg mb-4">
            At Lumicore, we don't just build software; we build intelligent systems. Our 2025/2026
            roadmap focuses on integrating Answer Engine Optimization (AEO) and AI-driven content
            strategies into every project.
          </p>
          <ul class="list-none p-0">
            <li class="mb-2">
              <i class="pi pi-check-circle text-green-500 mr-2"></i>
              AI-Powered Data Analytics
            </li>
            <li class="mb-2">
              <i class="pi pi-check-circle text-green-500 mr-2"></i>
              Natural Language Processing for HR Systems
            </li>
            <li class="mb-2">
              <i class="pi pi-check-circle text-green-500 mr-2"></i>
              Automated Content Creation for Social Media
            </li>
          </ul>
        </div>
        <div class="col-12 md:col-6 text-center">
          <i class="pi pi-bolt text-primary" style="font-size: 10rem"></i>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  min-height: 80vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.text-primary {
  color: var(--accent-color);
}

.text-secondary {
  color: var(--text-secondary-color);
}
</style>
