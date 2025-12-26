<template>
  <Dropdown
    v-model="selectedLocale"
    :options="languages"
    optionLabel="name"
    optionValue="code"
    @change="changeLanguage"
    class="language-switcher"
  >
    <template #value="slotProps">
      <div class="flex align-items-center gap-2">
        <i class="pi pi-globe"></i>
        <span class="font-semibold">{{ slotProps.value?.toUpperCase() || 'SI' }}</span>
      </div>
    </template>
    <template #option="slotProps">
      <div class="flex align-items-center gap-2">
        <span>{{ slotProps.option.name }}</span>
        <span class="text-sm text-color-secondary">{{ slotProps.option.native }}</span>
      </div>
    </template>
  </Dropdown>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const languages = [
  { code: 'si', name: 'Sinhala', native: 'සිංහල' },
  { code: 'en', name: 'English', native: 'English' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
];

const selectedLocale = computed({
  get: () => locale.value,
  set: (value) => {
    locale.value = value;
  },
});

const getLanguageName = (code) => {
  const lang = languages.find((l) => l.code === code);
  return lang ? lang.native : code;
};

const changeLanguage = (event) => {
  const newLocale = event.value;
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);

  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', newLocale);
};
</script>

<style scoped>
.language-switcher {
}
</style>
