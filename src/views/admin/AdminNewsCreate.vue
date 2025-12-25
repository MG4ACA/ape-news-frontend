<template>
  <div class="admin-news-create">
    <div class="page-header mb-4">
      <div>
        <h1 class="text-3xl font-bold">Create Article</h1>
        <p class="text-color-secondary">Create a new news article</p>
      </div>
      <Button
        label="Back to List"
        icon="pi pi-arrow-left"
        outlined
        @click="$router.push('/admin/news')"
      />
    </div>

    <Card>
      <template #content>
        <NewsEditor
          :categories="categories"
          :saving="saving"
          @submit="createArticle"
          @cancel="$router.push('/admin/news')"
        />
      </template>
    </Card>
  </div>
</template>

<script setup>
import NewsEditor from '@/components/admin/NewsEditor.vue';
import { categoryService } from '@/services/categoryService';
import { newsService } from '@/services/newsService';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

const saving = ref(false);
const categories = ref([]);

const fetchCategories = async () => {
  try {
    const response = await categoryService.getCategories();
    if (response.success) {
      categories.value = response.data || [];
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to fetch categories',
      life: 3000,
    });
  }
};

const createArticle = async (formData) => {
  saving.value = true;
  try {
    const response = await newsService.createNews(formData);
    if (response.success) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: `Article ${
          formData.status === 'published' ? 'published' : 'saved as draft'
        } successfully`,
        life: 3000,
      });
      router.push('/admin/news');
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message || 'Failed to create article',
      life: 3000,
    });
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
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
