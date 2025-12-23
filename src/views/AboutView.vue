<script setup>
const timeline = [
  { label: 'Founded', detail: 'Started as a two-person studio shipping Vue apps.', year: '2020' },
  {
    label: 'Mobile expansion',
    detail: 'Cross-platform delivery with offline-first playbooks.',
    year: '2021',
  },
  {
    label: 'POS Suite launch',
    detail: 'Retail and pharmacy POS with compliance baked in.',
    year: '2022',
  },
  {
    label: 'AI-first era',
    detail: 'AEO, copilots, and security-first delivery at scale.',
    year: '2024',
  },
];

const values = [
  {
    title: 'Outcome over output',
    copy: 'We measure success by lift, uptime, and user adoption — not ticket counts.',
  },
  {
    title: 'Security everywhere',
    copy: 'Zero-trust posture, privacy-first data handling, and audits on repeat.',
  },
  {
    title: 'Design with intent',
    copy: 'Interfaces that feel futuristic, performant, and accessible on every device.',
  },
];

const stats = [
  { label: 'Projects delivered', value: '200+' },
  { label: 'Avg. conversion lift', value: '35%' },
  { label: 'Platform coverage', value: 'Web · Mobile · POS' },
];
</script>

<template>
  <div class="about-view">
    <section class="angled-section">
      <div class="container hero" style="padding-top: calc(var(--nav-height) + 1.5rem)">
        <div>
          <div class="hero-badge">
            <i class="pi pi-compass"></i>
            Who we are
          </div>
          <h1 class="hero-title">Builders obsessed with reliable, AI-first products.</h1>
          <p class="hero-subtitle">
            We’re designers, engineers, and product partners shipping secure, future-forward
            experiences — from POS to mobile to content ops.
          </p>
          <div class="card-grid" style="margin-top: 1.5rem">
            <div v-for="item in stats" :key="item.label" class="surface-card">
              <div class="stat-number">{{ item.value }}</div>
              <div class="text-secondary">{{ item.label }}</div>
            </div>
          </div>
        </div>
        <div>
          <div class="mockup-frame">
            <span class="mockup-tag">Team</span>
            <img
              src="https://placehold.co/1000x540/0b1324/ffffff?text=Team+at+work"
              alt="Team"
              style="width: 100%; display: block"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="values">
      <div class="container">
        <div class="section-heading text-center">Principles we run on</div>
        <p class="section-lead text-center">
          Clear guardrails that keep quality, security, and user delight aligned.
        </p>
        <div class="card-grid">
          <div v-for="item in values" :key="item.title" class="surface-card">
            <h3 class="m-0 mb-2">{{ item.title }}</h3>
            <p class="text-secondary">{{ item.copy }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="timeline" class="angled-section">
      <div class="container">
        <div class="section-heading text-center">Milestones</div>
        <p class="section-lead text-center">A quick pulse on how we evolved.</p>
        <div class="process-steps">
          <div v-for="item in timeline" :key="item.label" class="process-step">
            <h4 class="m-0">{{ item.year }} — {{ item.label }}</h4>
            <p class="text-secondary">{{ item.detail }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.m-0 {
  margin: 0;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

h4 {
  margin: 0;
}

.text-secondary {
  color: var(--text-secondary-color);
}
</style>
