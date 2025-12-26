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
          <Select
            v-model="filters.status"
            :options="statusOptions"
            option-label="label"
            option-value="value"
            placeholder="All Status"
            class="w-12rem"
            @change="applyFilters"
          />
          <Select
            v-model="filters.category"
            :options="categoryOptions"
            option-label="name"
            option-value="id"
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
      title_si: 'තාක්ෂණික ප්‍රගතියේ විශාල ජයග්‍රහණයක්',
      title_en: 'Breaking: Major Technology Breakthrough Announced',
      title_ta: 'முக்கிய தொழில்நுட்ப முன்னேற்றம் அறிவிக்கப்பட்டது',
      excerpt_si:
        'ක්වොන්ටම් පරිගණක ක්ෂේත්‍රයේ විශාල ජයග්‍රහණයක් ලබා ගැනීමට විද්‍යාඥයින්ට සමත් විය.',
      excerpt_en:
        'Scientists achieve quantum computing milestone that could revolutionize computing industry.',
      excerpt_ta:
        'கணினித் துறையை புரட்சிகரமாக மாற்றக்கூடிய குவாண்டம் கம்ப்யூட்டிங் மைல்கல்லை விஞ்ஞானிகள் அடைந்துள்ளனர்.',
      content_si:
        'ලෝක ක්වොන්ටම් පර්යේෂණ ආයතනයේ පර්යේෂකයන් අද ක්වොන්ටම් පරිගණක තාක්ෂණයේ විශාල ජයග්‍රහණයක් ප්‍රකාශයට පත් කළහ. නව ක්වොන්ටම් ප්‍රොසෙසරය පෙර නොවූ විරූ ස්ථායීතාවයක් සහ ගණනය කිරීමේ බලයක් පෙන්නුම් කරයි.\n\nඩොක්ටර් සාරා චෙන්ගේ නායකත්වයෙන් පර්යේෂණ කණ්ඩායම විසින් නව දෝෂ නිවැරදි කිරීමේ ඇල්ගොරිතමයක් සංවර්ධනය කර ඇත. මෙම තාක්ෂණය ආර්ථික ආකෘති නිර්මාණයේ සිට ඖෂධ සොයාගැනීම දක්වා විශාල බලපෑමක් ඇති කළ හැකිය.',
      content_en:
        'In a groundbreaking announcement today, researchers at the Global Quantum Research Institute unveiled a major breakthrough in quantum computing technology. The new quantum processor demonstrates unprecedented stability and computational power, potentially marking a turning point in the race towards practical quantum computers.\n\nThe breakthrough addresses one of the most persistent challenges in quantum computing: maintaining quantum coherence for extended periods. The research team, led by Dr. Sarah Chen, developed a novel error-correction algorithm that allows quantum bits to maintain their state for up to 10 seconds—a significant improvement over previous records.\n\n"This achievement represents years of collaborative effort," Dr. Chen stated during the press conference. "We believe this technology will accelerate the development of quantum computers capable of solving problems currently impossible for classical computers."\n\nIndustry experts suggest this development could have far-reaching implications for fields ranging from drug discovery to climate modeling.',
      content_ta:
        'உலகளாவிய குவாண்டம் ஆராய்ச்சி நிறுவனத்தின் ஆராய்ச்சியாளர்கள் இன்று குவாண்டம் கம்ப்யூட்டிங் தொழில்நுட்பத்தில் ஒரு பெரிய முன்னேற்றத்தை வெளியிட்டனர். புதிய குவாண்டம் செயலி முன்னோடியில்லாத நிலைத்தன்மையையும் கணக்கீட்டு சக்தியையும் வெளிப்படுத்துகிறது.\n\nடாக்டர் சாரா சென் தலைமையிலான ஆராய்ச்சிக் குழு ஒரு புதிய பிழை-திருத்த அல்காரிதத்தை உருவாக்கியுள்ளது. இந்த தொழில்நுட்பம் மருந்து கண்டுபிடிப்பு முதல் காலநிலை மாடலிங் வரை பல துறைகளில் தூரநோக்கு தாக்கங்களை ஏற்படுத்தலாம்.',
      status: 'published',
      is_breaking: true,
      is_featured: false,
      category_ids: categoryOptions.value.length > 1 ? [categoryOptions.value[2].id] : [],
    },
    {
      title_si: 'ප්‍රජා සංස්කෘතික උත්සවය සාර්ථකව පැවැත්විණි',
      title_en: 'Local Community Celebrates Annual Cultural Festival',
      title_ta: 'உள்ளூர் சமூகம் வருடாந்த கலாச்சார விழாவை கொண்டாடுகிறது',
      excerpt_si: 'වසරේ වඩාත්ම අපේක්ෂිත සංස්කෘතික උත්සවය සඳහා දහස් ගණනක් එක්විය.',
      excerpt_en: 'Thousands gather for the citys most anticipated cultural event of the year.',
      excerpt_ta:
        'ஆண்டின் மிகவும் எதிர்பார்க்கப்பட்ட கலாச்சார நிகழ்வுக்கு ஆயிரக்கணக்கானோர் கூடினர்.',
      content_si:
        'වාර්ෂික සංස්කෘතික උරුමය උත්සවය මේ සති අන්තයේ වාර්තාගත සෙනඟක් ආකර්ෂණය කර ගත්තේය. තෙදින උත්සවය ලොව පුරා සිට සම්ප්‍රදායන් ප්‍රදර්ශනය කරන කණ්ඩායම් 100කට වඩා විශේෂාංග ඇතුළත් විය.\n\nසංවිධායකයින් උත්සවය පුරා අමුත්තන් 50,000කට වඩා වාර්තා කළ අතර එය පසුගිය වසරට වඩා 30% වැඩි වීමකි. නගරාධිපති ජෙනිෆර් රොබට්ස් පැවසුවේ "මෙම උත්සවය අපගේ ප්‍රජාවේ ආත්මය මූර්තිමත් කරයි" යනුවෙනි.\n\nඉදිරි වසරේ පුළුල් කරන ලද උත්සවයක් සඳහා සැලසුම් ප්‍රකාශයට පත් කිරීමට උත්සවයේ සාර්ථකත්වය සංවිධායකයින්ට පොළඹවා ඇත.',
      content_en:
        'The annual Cultural Heritage Festival drew record crowds this weekend as residents and visitors came together to celebrate the citys rich diversity. The three-day event featured performances, food stalls, and exhibitions showcasing traditions from around the world.\n\nOrganizers reported over 50,000 attendees throughout the festival, marking a 30% increase from last year. The event featured more than 100 cultural groups representing various communities, each presenting their unique traditions through music, dance, and cuisine.\n\n"This festival embodies the spirit of our community," said Mayor Jennifer Roberts. "Its a beautiful reminder of how our diversity makes us stronger and more vibrant."\n\nHighlights included traditional dance performances, cooking demonstrations, and a craft marketplace featuring artisans from local communities. The festivals success has prompted organizers to announce plans for an expanded event next year.',
      content_ta:
        'வருடாந்த கலாச்சார பாரம்பரிய விழா இந்த வார இறுதியில் சாதனை கூட்டத்தை ஈர்த்தது. மூன்று நாள் நிகழ்வில் உலகம் முழுவதும் இருந்து பாரம்பரியங்களை காட்சிப்படுத்தும் 100க்கும் மேற்பட்ட கலாச்சார குழுக்கள் இடம்பெற்றன.\n\nஏற்பாடாளர்கள் விழா முழுவதும் 50,000க்கும் மேற்பட்ட பங்கேற்பாளர்களை அறிவித்தனர், இது கடந்த ஆண்டை விட 30% அதிகரிப்பாகும். மேயர் ஜெனிஃபர் ராபர்ட்ஸ் கூறியதாவது, "இந்த விழா நமது சமூகத்தின் ஆவியை பிரதிபலிக்கிறது".\n\nவிழாவின் வெற்றி அடுத்த ஆண்டு விரிவாக்கப்பட்ட நிகழ்வுக்கான திட்டங்களை அறிவிக்க ஏற்பாடாளர்களைத் தூண்டியுள்ளது.',
      status: 'published',
      is_breaking: false,
      is_featured: true,
      category_ids: categoryOptions.value.length > 1 ? [categoryOptions.value[4].id] : [],
    },
    {
      title_si: 'අධ්‍යාපන දෙපාර්තමේන්තුව නව STEM වැඩසටහන ප්‍රකාශයට',
      title_en: 'Education Department Announces New STEM Program for Schools',
      title_ta: 'கல்வித் துறை புதிய STEM திட்டத்தை அறிவிக்கிறது',
      excerpt_si:
        'නව විෂයමාලාව විද්‍යාව හා තාක්ෂණය කෙරෙහි සිසුන්ගේ උනන්දුව වැඩි කිරීම අරමුණු කරයි.',
      excerpt_en:
        'Innovative curriculum aims to increase student engagement in science and technology.',
      excerpt_ta:
        'புதுமையான பாடத்திட்டம் அறிவியல் மற்றும் தொழில்நுட்பத்தில் மாணவர் ஈடுபாட்டை அதிகரிக்க நோக்கமாக உள்ளது.',
      content_si:
        'අධ්‍යාපන දෙපාර්තමේන්තුව දිසා පුරා පාසල්වල විද්‍යාව, තාක්ෂණය, ඉංජිනේරු විද්‍යාව සහ ගණිතය ඉගෙනීම වැඩි දියුණු කිරීම සඳහා නව STEM අධ්‍යාපන වැඩසටහනක් එළිදැක්වීය.\n\nවැඩසටහන තාක්ෂණ අංශවල නිපුණ සේවකයින් සඳහා වැඩෙන ඉල්ලුමට ප්‍රතිචාර දක්වයි. අධ්‍යාපන අධ්‍යක්ෂ ලීසා මාර්ටිනෙස් පැවසුවේ "අපට ඊළඟ පරම්පරාවේ නවෝත්පාදකයින් දිරිමත් කිරීමට අවශ්‍යයි" යනුවෙනි.\n\nප්‍රාථමික පරීක්ෂණ වැඩසටහන් සිසුන්ගේ සහභාගීත්වය සහ විභාග ලකුණු සැලකිය යුතු ලෙස වැඩි වීමක් පෙන්නුම් කර ඇත.',
      content_en:
        'The Department of Education has unveiled a new comprehensive STEM education program designed to enhance science, technology, engineering, and mathematics learning in schools across the district. The program, which will launch in the upcoming academic year, includes updated curricula, teacher training, and partnerships with local technology companies.\n\nThe initiative responds to growing demand for skilled workers in technology sectors while addressing concerns about declining student interest in STEM fields. The program features hands-on learning experiences, including robotics clubs, coding workshops, and science competitions.\n\n"We want to inspire the next generation of innovators," said Education Director Lisa Martinez. "This program provides students with real-world skills and experiences that will prepare them for the careers of tomorrow."\n\nLocal tech companies have pledged support through mentorship programs and equipment donations. Early pilot programs in select schools have shown promising results, with significant increases in student engagement and test scores.',
      content_ta:
        'கல்வித் துறை மாவட்டம் முழுவதும் உள்ள பள்ளிகளில் அறிவியல், தொழில்நுட்பம், பொறியியல் மற்றும் கணிதக் கற்றலை மேம்படுத்த வடிவமைக்கப்பட்ட ஒரு புதிய விரிவான STEM கல்வித் திட்டத்தை வெளியிட்டுள்ளது.\n\nஇத்திட்டம் தொழில்நுட்பத் துறைகளில் திறமையான தொழிலாளர்களுக்கான வளர்ந்து வரும் தேவைக்கு பதிலளிக்கிறது. கல்வி இயக்குனர் லிசா மார்டினெஸ் கூறியதாவது, "நாம் அடுத்த தலைமுறை புதுமையாளர்களை ஊக்குவிக்க விரும்புகிறோம்".\n\nதேர்ந்தெடுக்கப்பட்ட பள்ளிகளில் ஆரம்ப பைலட் திட்டங்கள் மாணவர் ஈடுபாடு மற்றும் தேர்வு மதிப்பெண்களில் குறிப்பிடத்தக்க அதிகரிப்பைக் காட்டியுள்ளன.',
      status: 'published',
      is_breaking: false,
      is_featured: false,
      category_ids: categoryOptions.value.length > 1 ? [categoryOptions.value[1].id] : [],
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
