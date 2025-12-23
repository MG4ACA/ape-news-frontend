<script setup>
import Button from 'primevue/button';
</script>

<template>
  <div class="home-view">
    <section id="hero" class="angled-section">
      <div class="container hero">
        <div>
          <div class="hero-badge">
            <i class="pi pi-bolt"></i>
            AI-First Digital Engineering
          </div>
          <h1 class="hero-title">Bold software that feels futuristic — and ships fast.</h1>
          <p class="hero-subtitle">
            Lumicore builds high-impact web, mobile, and POS experiences with AI-native workflows,
            Answer Engine Optimization, and measurable outcomes.
          </p>
          <div class="flex gap-2">
            <Button label="Start a Project" icon="pi pi-arrow-right" class="btn-primary" @click="$router.push('/contact')" />
            <Button label="View Portfolio" severity="secondary" outlined class="btn-ghost" @click="$router.push('/portfolio')" />
          </div>
        </div>
        <div>
          <div class="mockup-frame">
            <span class="mockup-tag">Device Mockup</span>
            <img src="https://placehold.co/960x540/0f172a/ffffff?text=Product+Showcase" alt="Product Mockup" style="width: 100%; display: block" />
          </div>
        </div>
      </div>
    </section>

    <section id="stats">
      <div class="container">
        <div class="grid align-items-center">
          <div class="col-12 md:col-4">
            <h2 class="section-heading">We ship outcomes, not just code.</h2>
            <p class="section-lead">Metrics that keep product and revenue leaders smiling.</p>
          </div>
          <div class="col-12 md:col-8">
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-number">200+</div>
                <div class="text-secondary">projects delivered</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">35%</div>
                <div class="text-secondary">avg. conversion lift</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">99.9%</div>
                <div class="text-secondary">uptime across POS suite</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">8x</div>
                <div class="text-secondary">faster launches with AI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="services">
      <div class="container">
        <h2 class="section-heading text-center">Full-stack delivery for every touchpoint</h2>
        <p class="section-lead text-center">
          Web, mobile, POS, HR, and growth — engineered with security, AEO, and analytics baked in.
        </p>
        <div class="card-grid">
          <div class="surface-card">
            <h3>Web & App Engineering</h3>
            <p class="text-secondary">Enterprise-grade Vue stacks, AI copilots, and blazing-fast experiences.</p>
          </div>
          <div class="surface-card">
            <h3>Mobile Experiences</h3>
            <p class="text-secondary">Native and cross-platform apps with offline-first reliability.</p>
          </div>
          <div class="surface-card">
            <h3>POS & Retail</h3>
            <p class="text-secondary">Pharmacy, salon, and retail POS with inventory, loyalty, and real-time dashboards.</p>
          </div>
          <div class="surface-card">
            <h3>HR & Ops Automation</h3>
            <p class="text-secondary">Attendance, payroll, and NLP-driven insights for people ops.</p>
          </div>
          <div class="surface-card">
            <h3>Social & Content</h3>
            <p class="text-secondary">AI-assisted content, scheduling, and growth analytics across channels.</p>
          </div>
          <div class="surface-card">
            <h3>Security & Reliability</h3>
            <p class="text-secondary">Zero-trust posture, audits, and observability from day one.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="tech">
      <div class="container">
        <div class="grid align-items-center">
          <div class="col-12 md:col-5">
            <h2 class="section-heading">Tech stack tuned for scale</h2>
            <p class="section-lead">We choose the right tool for the outcome — performance, security, and velocity.</p>
            <div class="flex flex-wrap gap-2">
              <span class="tech-pill"><i class="pi pi-vimeo"></i> Vue / Vite</span>
              <span class="tech-pill"><i class="pi pi-mobile"></i> iOS / Android</span>
              <span class="tech-pill"><i class="pi pi-amazon"></i> AWS / Azure</span>
              <span class="tech-pill"><i class="pi pi-database"></i> PostgreSQL</span>
              <span class="tech-pill"><i class="pi pi-bolt"></i> AI / AEO</span>
              <span class="tech-pill"><i class="pi pi-lock"></i> Zero Trust</span>
            </div>
          </div>
          <div class="col-12 md:col-7">
            <div class="mockup-frame">
              <img src="https://placehold.co/960x520/0b1324/ffffff?text=Dashboard+Mockup" alt="Dashboard" style="width: 100%; display: block" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="process">
      <div class="container">
        <h2 class="section-heading text-center">Delivery motion that keeps momentum</h2>
        <p class="section-lead text-center">Transparent sprints, measurable KPIs, and rapid releases.</p>
        <div class="process-steps">
          <div class="process-step">
            <h4>01 / Discover</h4>
            <p class="text-secondary">Stakeholder workshops, AEO keyword mapping, and success metrics.</p>
          </div>
          <div class="process-step">
            <h4>02 / Design</h4>
            <p class="text-secondary">Futuristic UI, device mockups, and interaction prototypes.</p>
          </div>
          <div class="process-step">
            <h4>03 / Build</h4>
            <p class="text-secondary">AI-assisted dev, secure pipelines, and frequent demos.</p>
          </div>
          <div class="process-step">
            <h4>04 / Launch & Grow</h4>
            <p class="text-secondary">Perf tuning, A/B tests, observability, and growth playbooks.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="showcase">
      <div class="container grid align-items-center">
        <div class="col-12 md:col-6">
          <h2 class="section-heading">Omni-channel device experiences</h2>
          <p class="section-lead">Consistent UI across kiosks, tablets, phones, and desktops — with theme sync.</p>
          <div class="flex gap-2">
            <Button label="See POS Suite" class="btn-primary" icon="pi pi-shopping-cart" @click="$router.push('/portfolio')" />
            <Button label="Book Demo" class="btn-ghost" icon="pi pi-calendar" @click="$router.push('/contact')" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="mockup-frame">
            <img src="https://placehold.co/900x520/111827/ffffff?text=Device+Mockups" alt="Devices" style="width: 100%; display: block" />
          </div>
        </div>
      </div>
    </section>

    <section id="testimonials">
      <div class="container">
        <h2 class="section-heading text-center">Loved by operators & founders</h2>
        <p class="section-lead text-center">Testimonials that prove reliability, speed, and partnership.</p>
        <div class="card-grid">
          <div class="surface-card">
            <p>“Lumicore shipped our pharmacy POS in weeks — uptime is rock solid.”</p>
            <p class="text-secondary">Director, Health Retail</p>
          </div>
          <div class="surface-card">
            <p>“Their AI-first approach cut our content ops time by 60%.”</p>
            <p class="text-secondary">Head of Marketing, D2C Brand</p>
          </div>
          <div class="surface-card">
            <p>“We finally have one codebase across mobile and web. Releases are painless.”</p>
            <p class="text-secondary">CTO, SaaS Platform</p>
          </div>
        </div>
      </div>
    </section>

    <section id="pricing">
      <div class="container">
        <h2 class="section-heading text-center">Engagement models</h2>
        <p class="section-lead text-center">Pick what fits your roadmap and velocity.</p>
        <div class="price-grid">
          <div class="price-card">
            <h3>Launch</h3>
            <p class="text-secondary">MVP in 6-10 weeks, AEO-ready.</p>
            <p class="stat-number">$8k+</p>
          </div>
          <div class="price-card featured">
            <h3>Scale</h3>
            <p class="text-secondary">Cross-platform builds, POS, HR, analytics.</p>
            <p class="stat-number">$15k+</p>
          </div>
          <div class="price-card">
            <h3>Care</h3>
            <p class="text-secondary">SRE, growth ops, continuous releases.</p>
            <p class="stat-number">$5k/mo</p>
          </div>
        </div>
      </div>
    </section>

    <section id="blog">
      <div class="container">
        <h2 class="section-heading text-center">Insights & AEO-ready content</h2>
        <p class="section-lead text-center">Answer Engine Optimization, AI mentions, and product learnings.</p>
        <div class="blog-grid">
          <div class="blog-card surface-card">
            <img src="https://placehold.co/600x320/7c3aed/ffffff?text=AEO" alt="AEO" />
            <h4>AEO playbook for product teams</h4>
            <p class="text-secondary">Structuring content to win answer engines and copilots.</p>
          </div>
          <div class="blog-card surface-card">
            <img src="https://placehold.co/600x320/0ea5e9/ffffff?text=AI+Ops" alt="AI Ops" />
            <h4>AI-assisted delivery</h4>
            <p class="text-secondary">How we ship 8x faster with safe guardrails.</p>
          </div>
          <div class="blog-card surface-card">
            <img src="https://placehold.co/600x320/0f172a/ffffff?text=POS" alt="POS" />
            <h4>Designing resilient POS</h4>
            <p class="text-secondary">Offline-first, sync conflicts, and zero-trust for retail.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="cta" class="angled-section">
      <div class="container text-center" style="padding: 3rem 1rem">
        <h2 class="section-heading">Ready to build what’s next?</h2>
        <p class="section-lead">Tell us your goal — we’ll ship the roadmap, the product, and the outcomes.</p>
        <div class="flex gap-2 justify-content-center">
          <Button label="Book a Call" class="btn-primary" icon="pi pi-calendar" @click="$router.push('/contact')" />
          <Button label="View Services" class="btn-ghost" icon="pi pi-th-large" @click="$router.push('/services')" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
section {
  position: relative;
}
</style>
