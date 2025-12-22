import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Lumicore | Software Solutions & Digital Excellence',
        description:
          'Lumicore offers expert web development, mobile apps, POS systems, and social media management. Your partner for digital transformation.',
      },
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue'),
      meta: {
        title: 'Our Services | Lumicore',
        description:
          "Explore Lumicore's wide range of services including web apps, mobile development, POS systems, and HR management solutions.",
      },
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('../views/PortfolioView.vue'),
      meta: {
        title: 'Portfolio | Lumicore Projects',
        description:
          'See how Lumicore has helped businesses grow with custom software solutions and creative digital strategies.',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About Us | Lumicore Team',
        description:
          "Learn about Lumicore's mission to provide innovative software solutions for businesses of all sizes.",
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        title: 'Contact Us | Get in Touch with Lumicore',
        description:
          'Ready to start your project? Contact Lumicore today for a free consultation on your software needs.',
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Lumicore';
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', to.meta.description || '');
  }
  next();
});

export default router;
