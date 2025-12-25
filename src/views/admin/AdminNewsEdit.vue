<template>
  <div class="admin-news-edit">
    <div class="page-header mb-4">
      <div>
        <h1 class="text-3xl font-bold">Edit Article</h1>
        <p class="text-color-secondary">Update article information</p>
      </div>
      <Button
        label="Back to List"
        icon="pi pi-arrow-left"
        outlined
        @click="$router.push('/admin/news')"
      />
    </div>

    <LoadingSpinner v-if="loading" message="Loading article..." />

    <Card v-else-if="article">
      <template #content>
        <NewsEditor
          :initial-data="article"
          :categories="categories"
          :saving="saving"
          @submit="updateArticle"
          @cancel="$router.push('/admin/news')"
        />
      </template>
    </Card>

    <Card v-else>
      <template #content>
        <div class="text-center py-8">
          <i class="pi pi-exclamation-triangle text-6xl text-color-secondary mb-3"></i>
          <p class="text-color-secondary">Article not found</p>
          <Button
            label="Back to List"
            icon="pi pi-arrow-left"
            @click="$router.push('/admin/news')"
            class="mt-3"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import NewsEditor from '@/components/admin/NewsEditor.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { categoryService } from '@/services/categoryService';
import { newsService } from '@/services/newsService';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const loading = ref(true);
const saving = ref(false);
const article = ref(null);
const categories = ref([]);

const fetchArticle = async () => {
  loading.value = true;
  try {
    const response = await newsService.getNewsById(route.params.id);
    if (response.success) {
      article.value = response.data;
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to fetch article',
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const response = await categoryService.getCategories();
    if (response.success) {
      categories.value = response.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
};

const updateArticle = async (formData) => {
  saving.value = true;
  try {
    const response = await newsService.updateNews(route.params.id, formData);
    if (response.success) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Article updated successfully',
        life: 3000,
      });
      router.push('/admin/news');
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message || 'Failed to update article',
      life: 3000,
    });
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  fetchArticle();
  fetchCategories();
});
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
}
</style>
