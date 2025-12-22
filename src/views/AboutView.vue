<script setup>
import Timeline from 'primevue/timeline';

const events = [
  { status: 'Founded', date: '2020', icon: 'pi-flag', color: '#0f172a' },
  { status: 'Expanded to Mobile', date: '2021', icon: 'pi-mobile', color: '#3b82f6' },
  { status: 'Launched POS Suite', date: '2022', icon: 'pi-shopping-cart', color: '#64748b' },
  { status: 'AI Integration Era', date: '2024', icon: 'pi-bolt', color: '#0f172a' },
];
</script>

<template>
  <div class="about-view">
    <section class="about-hero bg-primary text-white py-8">
      <div class="container grid align-items-center">
        <div class="col-12 md:col-6">
          <h1 class="text-5xl font-bold mb-4">About Lumicore</h1>
          <p class="text-xl opacity-90">
            We are a team of passionate developers, designers, and strategists dedicated to building
            software that makes a difference.
          </p>
        </div>
        <div class="col-12 md:col-6 text-center">
          <i class="pi pi-users" style="font-size: 8rem"></i>
        </div>
      </div>
    </section>

    <section class="mission py-8">
      <div class="container">
        <div class="grid">
          <div class="col-12 md:col-6 p-4">
            <h2 class="text-3xl font-bold mb-4">Our Mission</h2>
            <p class="text-lg">
              To empower businesses through innovative technology and creative digital solutions. We
              believe in building long-term partnerships with our clients, helping them navigate the
              ever-changing digital landscape with confidence.
            </p>
          </div>
          <div class="col-12 md:col-6 p-4">
            <h2 class="text-3xl font-bold mb-4">Our Vision</h2>
            <p class="text-lg">
              To be a global leader in AI-first software development, setting the standard for
              quality, innovation, and client satisfaction in the digital age.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="journey bg-slate-50 py-8">
      <div class="container">
        <h2 class="text-3xl font-bold text-center mb-8">Our Journey</h2>
        <Timeline :value="events" align="alternate" class="customized-timeline">
          <template #marker="slotProps">
            <span
              class="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1"
              :style="{ backgroundColor: slotProps.item.color }"
            >
              <i :class="['pi', slotProps.item.icon]"></i>
            </span>
          </template>
          <template #content="slotProps">
            <div class="p-3 shadow-1 bg-white border-round">
              <div class="font-bold mb-1">{{ slotProps.item.status }}</div>
              <div class="text-secondary text-sm">{{ slotProps.item.date }}</div>
            </div>
          </template>
        </Timeline>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-primary {
  background-color: var(--primary-color);
}

.text-secondary {
  color: var(--text-secondary-color);
}

@media screen and (max-width: 960px) {
  ::v-deep(.customized-timeline) {
    .p-timeline-event:nth-child(even) {
      flex-direction: row;

      .p-timeline-event-content {
        text-align: left;
      }
    }

    .p-timeline-event-opposite {
      flex: 0;
    }
  }
}
</style>
