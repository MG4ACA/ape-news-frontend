<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Textarea from 'primevue/textarea';
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');
const submitted = ref(false);

const handleSubmit = () => {
  // Placeholder for form submission
  submitted.ref = true;
  setTimeout(() => {
    submitted.value = true;
    name.value = '';
    email.value = '';
    message.value = '';
  }, 500);
};
</script>

<template>
  <div class="contact-view">
    <section class="page-header bg-slate-900 text-white text-center py-8">
      <div class="container">
        <h1 class="text-5xl font-bold mb-2">Get In Touch</h1>
        <p class="text-xl opacity-80">Let's discuss how Lumicore can help your business grow.</p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="grid">
          <div class="col-12 md:col-6 p-4">
            <h2 class="text-3xl font-bold mb-4">Contact Information</h2>
            <p class="mb-6 text-secondary">
              Have a question or ready to start a project? Reach out to us through any of the
              following channels.
            </p>

            <div class="flex align-items-center mb-4">
              <i class="pi pi-map-marker text-primary text-2xl mr-3"></i>
              <div>
                <div class="font-bold">Our Office</div>
                <div class="text-secondary">123 Tech Plaza, Digital City</div>
              </div>
            </div>

            <div class="flex align-items-center mb-4">
              <i class="pi pi-envelope text-primary text-2xl mr-3"></i>
              <div>
                <div class="font-bold">Email Us</div>
                <div class="text-secondary">hello@lumicore.com</div>
              </div>
            </div>

            <div class="flex align-items-center mb-4">
              <i class="pi pi-phone text-primary text-2xl mr-3"></i>
              <div>
                <div class="font-bold">Call Us</div>
                <div class="text-secondary">+1 (555) 123-4567</div>
              </div>
            </div>
          </div>

          <div class="col-12 md:col-6 p-4">
            <div class="surface-card p-5 shadow-2 border-round">
              <h2 class="text-2xl font-bold mb-4">Send us a Message</h2>
              <form @submit.prevent="handleSubmit" class="flex flex-column gap-3">
                <div class="flex flex-column gap-2">
                  <label for="name">Name</label>
                  <InputText id="name" v-model="name" required />
                </div>
                <div class="flex flex-column gap-2">
                  <label for="email">Email</label>
                  <InputText id="email" v-model="email" type="email" required />
                </div>
                <div class="flex flex-column gap-2">
                  <label for="message">Message</label>
                  <Textarea id="message" v-model="message" rows="5" required />
                </div>
                <Button type="submit" label="Send Message" icon="pi pi-send" class="mt-2" />
                <Message v-if="submitted" severity="success" class="mt-3">
                  Thank you! Your message has been sent.
                </Message>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.text-primary {
  color: var(--accent-color);
}

.text-secondary {
  color: var(--text-secondary-color);
}
</style>
