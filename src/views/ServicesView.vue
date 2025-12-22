<script setup>
import Card from 'primevue/card';
import Tag from 'primevue/tag';

const services = [
  {
    title: 'Web Site Design & Development',
    description:
      'Stunning, high-performance websites tailored to your brand identity. Optimized for speed, SEO, and user engagement.',
    icon: 'pi-globe',
    tags: ['Responsive', 'SEO Optimized', 'Vue.js'],
  },
  {
    title: 'Web Application Development',
    description:
      'Complex, scalable web applications to streamline your business processes. From SaaS platforms to internal tools.',
    icon: 'pi-server',
    tags: ['Scalable', 'Secure', 'Cloud-Ready'],
  },
  {
    title: 'Mobile App Development',
    description:
      'Custom mobile applications for iOS and Android. We focus on intuitive UI/UX and robust performance.',
    icon: 'pi-mobile',
    tags: ['iOS', 'Android', 'Cross-Platform'],
  },
  {
    title: 'POS Systems',
    description:
      'Specialized Point of Sale systems for pharmacies, salons, consumer goods shops, and phone shops.',
    icon: 'pi-shopping-cart',
    tags: ['Inventory', 'Sales Tracking', 'Reporting'],
  },
  {
    title: 'HR Management Systems',
    description:
      'Comprehensive HR solutions including payroll, attendance tracking, and employee performance management.',
    icon: 'pi-users',
    tags: ['Payroll', 'Attendance', 'HR Analytics'],
  },
  {
    title: 'Social Media & Content',
    description:
      'Strategic social media management and high-quality content creation to boost your online presence.',
    icon: 'pi-camera',
    tags: ['Marketing', 'Content Strategy', 'Growth'],
  },
];
</script>

<template>
  <div class="services-view">
    <section class="page-header bg-primary text-white text-center py-8">
      <div class="container">
        <h1 class="text-5xl font-bold mb-2">Our Services</h1>
        <p class="text-xl opacity-80">Comprehensive software solutions for the modern era.</p>
      </div>
    </section>

    <section class="services-list">
      <div class="container">
        <div class="grid">
          <div
            v-for="service in services"
            :key="service.title"
            class="col-12 md:col-6 lg:col-4 p-3"
          >
            <Card class="h-full fade-in">
              <template #header>
                <div class="flex justify-content-center pt-4">
                  <div class="icon-circle bg-blue-50 p-4 border-circle">
                    <i :class="['pi', service.icon, 'text-4xl text-primary']"></i>
                  </div>
                </div>
              </template>
              <template #title>
                <div class="text-center">{{ service.title }}</div>
              </template>
              <template #content>
                <p class="text-center mb-4">{{ service.description }}</p>
                <div class="flex flex-wrap gap-2 justify-content-center">
                  <Tag v-for="tag in service.tags" :key="tag" :value="tag" severity="info" />
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section for AEO (SEO Trend) -->
    <section class="faq bg-white">
      <div class="container">
        <h2 class="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div class="grid justify-content-center">
          <div class="col-12 md:col-8">
            <div class="mb-4">
              <h3 class="text-xl font-semibold mb-2">
                How does Lumicore ensure software security?
              </h3>
              <p>
                We implement industry-standard security protocols, including end-to-end encryption
                and regular security audits, especially for our POS and HR systems.
              </p>
            </div>
            <div class="mb-4">
              <h3 class="text-xl font-semibold mb-2">
                Can you migrate my existing data to a new POS system?
              </h3>
              <p>
                Yes, we offer comprehensive data migration services to ensure a smooth transition
                from your old system to our modern POS solutions.
              </p>
            </div>
            <div class="mb-4">
              <h3 class="text-xl font-semibold mb-2">Do you provide ongoing support?</h3>
              <p>
                Absolutely. Lumicore offers 24/7 technical support and regular software updates to
                keep your systems running at peak performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-primary {
  background-color: var(--primary-color);
}

.text-primary {
  color: var(--accent-color);
}

.icon-circle {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
