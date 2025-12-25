<template>
  <div class="admin-news-list">
    <div class="list-header mb-4">
      <h1 class="text-3xl font-bold">News Management</h1>
      <div class="flex gap-2">
        <Button
          label="Load Sample Data"
          icon="pi pi-download"
          outlined
          severity="secondary"
          @click="loadSampleData"
          :loading="loadingSample"
        />
        <Button
          label="Create Article"
          icon="pi pi-plus"
          @click="$router.push('/admin/news/create')"
        />
      </div>
    </div>

    <Card>
      <template #content>
        <!-- Filters -->
        <div class="filters mb-4 flex gap-3 flex-wrap">
          <InputText
            v-model="filters.search"
            placeholder="Search articles..."
            class="flex-1"
            @input="applyFilters"
          />
          <Dropdown
            v-model="filters.status"
            :options="statusOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="All Status"
            class="w-12rem"
            @change="applyFilters"
          />
          <Dropdown
            v-model="filters.category"
            :options="categoryOptions"
            optionLabel="name"
            optionValue="id"
            placeholder="All Categories"
            class="w-12rem"
            @change="applyFilters"
          />
          <Button label="Clear" icon="pi pi-filter-slash" outlined @click="clearFilters" />
        </div>

        <!-- Data Table -->
        <DataTable
          :value="newsList"
          :loading="loading"
          paginator
          :rows="10"
          :totalRecords="pagination.total"
          :lazy="true"
          @page="onPage"
          stripedRows
          responsiveLayout="scroll"
        >
          <Column header="Image" style="width: 100px">
            <template #body="{ data }">
              <img
                :src="data.featured_image || '/placeholder.png'"
                :alt="data.title"
                class="news-thumbnail"
              />
            </template>
          </Column>

          <Column field="title" header="Title" sortable>
            <template #body="{ data }">
              <div class="title-cell">
                <div class="title-text">{{ data.title }}</div>
                <div class="badges">
                  <span v-if="data.is_featured" class="badge badge-featured">Featured</span>
                  <span v-if="data.is_breaking" class="badge badge-breaking">Breaking</span>
                </div>
              </div>
            </template>
          </Column>

          <Column field="author_name" header="Author" sortable style="width: 150px" />

          <Column field="status" header="Status" sortable style="width: 120px">
            <template #body="{ data }">
              <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
            </template>
          </Column>

          <Column field="views_count" header="Views" sortable style="width: 100px">
            <template #body="{ data }">
              <div class="flex align-items-center gap-2">
                <i class="pi pi-eye"></i>
                {{ data.views_count || 0 }}
              </div>
            </template>
          </Column>

          <Column field="created_at" header="Date" sortable style="width: 150px">
            <template #body="{ data }">
              {{ formatDate(data.created_at, 'short') }}
            </template>
          </Column>

          <Column header="Actions" style="width: 150px">
            <template #body="{ data }">
              <div class="flex gap-2">
                <Button
                  icon="pi pi-eye"
                  text
                  rounded
                  severity="secondary"
                  v-tooltip.top="'View'"
                  @click="viewArticle(data.id)"
                />
                <Button
                  icon="pi pi-pencil"
                  text
                  rounded
                  severity="info"
                  v-tooltip.top="'Edit'"
                  @click="editArticle(data.id)"
                />
                <Button
                  icon="pi pi-trash"
                  text
                  rounded
                  severity="danger"
                  v-tooltip.top="'Delete'"
                  @click="confirmDelete(data)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- Delete Confirmation Dialog -->
    <Dialog
      v-model:visible="deleteDialog"
      :style="{ width: '450px' }"
      header="Confirm Delete"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem; color: var(--red-500)" />
        <span>
          Are you sure you want to delete
          <b>{{ selectedArticle?.title }}</b>
          ?
        </span>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="deleteDialog = false" />
        <Button
          label="Delete"
          icon="pi pi-check"
          severity="danger"
          @click="deleteArticle"
          :loading="deleting"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { categoryService } from '@/services/categoryService';
import { newsService } from '@/services/newsService';
import { formatDate } from '@/utils/dateFormatter';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

const loading = ref(false);
const deleting = ref(false);
const loadingSample = ref(false);
const newsList = ref([]);
const deleteDialog = ref(false);
const selectedArticle = ref(null);

const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
});

const filters = ref({
  search: '',
  status: null,
  category: null,
});

const statusOptions = [
  { label: 'All Status', value: null },
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
];

const categoryOptions = ref([{ id: null, name: 'All Categories' }]);

const fetchNews = async () => {
  loading.value = true;
  try {
    const params = {
      page: pagination.value.page,
      limit: pagination.value.limit,
    };

    if (filters.value.search) {
      params.search = filters.value.search;
    }
    if (filters.value.status) {
      params.status = filters.value.status;
    }
    if (filters.value.category) {
      params.category = filters.value.category;
    }

    const response = await newsService.getAdminNews(params);
    if (response.success) {
      newsList.value = response.data || [];
      pagination.value.total = response.pagination?.total || 0;
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to fetch news articles',
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
      categoryOptions.value = [{ id: null, name: 'All Categories' }, ...(response.data || [])];
    }
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
};

const onPage = (event) => {
  pagination.value.page = event.page + 1;
  fetchNews();
};

const applyFilters = () => {
  pagination.value.page = 1;
  fetchNews();
};

const clearFilters = () => {
  filters.value = {
    search: '',
    status: null,
    category: null,
  };
  pagination.value.page = 1;
  fetchNews();
};

const getStatusSeverity = (status) => {
  return status === 'published' ? 'success' : 'warning';
};

const viewArticle = (id) => {
  window.open(`/news/${id}`, '_blank');
};

const editArticle = (id) => {
  router.push(`/admin/news/edit/${id}`);
};

const confirmDelete = (article) => {
  selectedArticle.value = article;
  deleteDialog.value = true;
};

const deleteArticle = async () => {
  deleting.value = true;
  try {
    const response = await newsService.deleteNews(selectedArticle.value.id);
    if (response.success) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Article deleted successfully',
        life: 3000,
      });
      deleteDialog.value = false;
      fetchNews();
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message || 'Failed to delete article',
      life: 3000,
    });
  } finally {
    deleting.value = false;
  }
};

const loadSampleData = async () => {
  loadingSample.value = true;

  const sampleArticles = [
    {
      title: 'Breaking: Major Technology Breakthrough Announced',
      excerpt:
        'Scientists achieve quantum computing milestone that could revolutionize computing industry.',
      content:
        'In a groundbreaking announcement today, researchers at the Global Quantum Research Institute unveiled a major breakthrough in quantum computing technology. The new quantum processor demonstrates unprecedented stability and computational power, potentially marking a turning point in the race towards practical quantum computers.\n\nThe breakthrough addresses one of the most persistent challenges in quantum computing: maintaining quantum coherence for extended periods. The research team, led by Dr. Sarah Chen, developed a novel error-correction algorithm that allows quantum bits to maintain their state for up to 10 seconds—a significant improvement over previous records.\n\n"This achievement represents years of collaborative effort," Dr. Chen stated during the press conference. "We believe this technology will accelerate the development of quantum computers capable of solving problems currently impossible for classical computers."\n\nIndustry experts suggest this development could have far-reaching implications for fields ranging from drug discovery to climate modeling.',
      status: 'published',
      is_breaking: true,
      is_featured: false,
      categories: categoryOptions.value.length > 1 ? [categoryOptions.value[1].id] : [],
    },
    {
      title: 'Local Community Celebrates Annual Cultural Festival',
      excerpt: 'Thousands gather for the citys most anticipated cultural event of the year.',
      content:
        'The annual Cultural Heritage Festival drew record crowds this weekend as residents and visitors came together to celebrate the citys rich diversity. The three-day event featured performances, food stalls, and exhibitions showcasing traditions from around the world.\n\nOrganizers reported over 50,000 attendees throughout the festival, marking a 30% increase from last year. The event featured more than 100 cultural groups representing various communities, each presenting their unique traditions through music, dance, and cuisine.\n\n"This festival embodies the spirit of our community," said Mayor Jennifer Roberts. "Its a beautiful reminder of how our diversity makes us stronger and more vibrant."\n\nHighlights included traditional dance performances, cooking demonstrations, and a craft marketplace featuring artisans from local communities. The festivals success has prompted organizers to announce plans for an expanded event next year.',
      status: 'published',
      is_breaking: false,
      is_featured: true,
      categories: categoryOptions.value.length > 1 ? [categoryOptions.value[1].id] : [],
    },
    {
      title: 'New Environmental Initiative Aims to Restore Local Wetlands',
      excerpt:
        'Conservation group launches ambitious project to restore 500 acres of wetland habitat.',
      content:
        'The Regional Conservation Alliance has launched a comprehensive initiative to restore and protect the areas vital wetland ecosystems. The five-year project aims to rehabilitate over 500 acres of degraded wetlands, which serve as crucial habitats for numerous species of birds, fish, and other wildlife.\n\nThe initiative, funded through a combination of government grants and private donations, will focus on removing invasive species, reintroducing native plants, and improving water quality. Scientists estimate that the restored wetlands will support populations of over 150 different species.\n\n"Wetlands are among our most valuable natural resources," explained project director Michael Torres. "They filter water, prevent flooding, and provide essential habitat for wildlife. This restoration project is an investment in our environmental future."\n\nThe project has already begun with community volunteer days, where residents can participate in planting native vegetation and monitoring wildlife. Response from the community has been overwhelmingly positive, with volunteer slots filling up weeks in advance.',
      status: 'published',
      is_breaking: false,
      is_featured: true,
      categories: categoryOptions.value.length > 1 ? [categoryOptions.value[1].id] : [],
    },
    {
      title: 'Education Department Announces New STEM Program for Schools',
      excerpt:
        'Innovative curriculum aims to increase student engagement in science and technology.',
      content:
        'The Department of Education has unveiled a new comprehensive STEM education program designed to enhance science, technology, engineering, and mathematics learning in schools across the district. The program, which will launch in the upcoming academic year, includes updated curricula, teacher training, and partnerships with local technology companies.\n\nThe initiative responds to growing demand for skilled workers in technology sectors while addressing concerns about declining student interest in STEM fields. The program features hands-on learning experiences, including robotics clubs, coding workshops, and science competitions.\n\n"We want to inspire the next generation of innovators," said Education Director Lisa Martinez. "This program provides students with real-world skills and experiences that will prepare them for the careers of tomorrow."\n\nLocal tech companies have pledged support through mentorship programs and equipment donations. Early pilot programs in select schools have shown promising results, with significant increases in student engagement and test scores.',
      status: 'published',
      is_breaking: false,
      is_featured: false,
      categories: categoryOptions.value.length > 1 ? [categoryOptions.value[1].id] : [],
    },
    {
      title: 'Sports: Local Team Advances to Championship Finals',
      excerpt: 'Hometown heroes secure decisive victory in semi-final match.',
      content:
        'The City Eagles delivered a stunning performance last night, defeating their rivals 3-1 to secure a spot in the championship finals. The victory marks the teams first finals appearance in over a decade and has energized fans across the city.\n\nCaptain James Rodriguez led the team with two goals, while goalkeeper Maria Santos made several crucial saves to maintain the lead. The sold-out crowd of 40,000 fans created an electric atmosphere that players credited as a key factor in their success.\n\n"The support from our fans was incredible," Rodriguez said after the match. "We felt their energy throughout the game, and it pushed us to give everything we had."\n\nThe championship final is scheduled for next month at the National Stadium. Tickets went on sale this morning and are expected to sell out quickly. Team management has announced plans for public viewing events for fans unable to secure stadium tickets.',
      status: 'draft',
      is_breaking: false,
      is_featured: false,
      categories: categoryOptions.value.length > 1 ? [categoryOptions.value[1].id] : [],
    },
  ];

  try {
    let successCount = 0;
    for (const article of sampleArticles) {
      try {
        await newsService.createNews(article);
        successCount++;
      } catch (error) {
        console.error('Failed to create article:', article.title, error);
      }
    }

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Created ${successCount} sample articles`,
      life: 3000,
    });

    fetchNews();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load sample data',
      life: 3000,
    });
  } finally {
    loadingSample.value = false;
  }
};

onMounted(() => {
  fetchNews();
  fetchCategories();
});
</script>

<style scoped>
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filters {
  padding: 1rem;
  background: var(--surface-50);
  border-radius: 8px;
}

.news-thumbnail {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.title-cell {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title-text {
  font-weight: 500;
  color: var(--text-color);
}

.badges {
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-featured {
  background: var(--blue-100);
  color: var(--blue-700);
}

.badge-breaking {
  background: var(--red-100);
  color: var(--red-700);
}

.confirmation-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
