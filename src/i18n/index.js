import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import si from './locales/si.json';
import ta from './locales/ta.json';

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'si',
  fallbackLocale: 'en',
  messages: {
    en,
    si,
    ta,
  },
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
    si: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
    ta: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
  },
});

export default i18n;
