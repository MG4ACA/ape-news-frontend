<template>
  <div class="news-editor">
    <form @submit.prevent="handleSubmit">
      <div class="grid">
        <!-- Language Selection -->
        <div class="col-12">
          <Card>
            <template #title>
              <div class="flex align-items-center gap-2">
                <i class="pi pi-globe"></i>
                <span>Language Options</span>
              </div>
            </template>
            <template #content>
              <div class="flex gap-4">
                <div class="field-checkbox">
                  <Checkbox id="lang_si" value="si" :binary="true" :modelValue="true" disabled />
                  <label for="lang_si" class="ml-2 font-semibold">සිංහල (Sinhala) *</label>
                </div>
                <div class="field-checkbox">
                  <Checkbox id="lang_en" v-model="languageFlags.hasEnglish" :binary="true" />
                  <label for="lang_en" class="ml-2">English</label>
                </div>
                <div class="field-checkbox">
                  <Checkbox id="lang_ta" v-model="languageFlags.hasTamil" :binary="true" />
                  <label for="lang_ta" class="ml-2">தமிழ் (Tamil)</label>
                </div>
              </div>
              <small class="text-color-secondary">
                Sinhala is required. Check boxes to add English or Tamil translations.
              </small>
            </template>
          </Card>
        </div>

        <!-- Sinhala Content (Default/Required) -->
        <div class="col-12">
          <Card>
            <template #title>සිංහල Content (Required)</template>
            <template #content>
              <div class="grid">
                <!-- Sinhala Title -->
                <div class="col-12">
                  <div class="field">
                    <label for="title_si" class="font-semibold">ශීර්ෂය (Title) *</label>
                    <InputText
                      id="title_si"
                      v-model="formData.title_si"
                      class="w-full"
                      :class="{ 'p-invalid': errors.title_si }"
                      placeholder="ශීර්ෂය ඇතුළත් කරන්න"
                    />
                    <small v-if="errors.title_si" class="p-error">{{ errors.title_si }}</small>
                  </div>
                </div>

                <!-- Sinhala Excerpt -->
                <div class="col-12">
                  <div class="field">
                    <label for="excerpt_si" class="font-semibold">කෙටි සාරාංශය (Excerpt)</label>
                    <Textarea
                      id="excerpt_si"
                      v-model="formData.excerpt_si"
                      rows="3"
                      class="w-full"
                      placeholder="ලිපියේ කෙටි සාරාංශයක්"
                    />
                  </div>
                </div>

                <!-- Sinhala Content -->
                <div class="col-12">
                  <div class="field">
                    <label for="content_si" class="font-semibold">අන්තර්ගතය (Content) *</label>
                    <Textarea
                      id="content_si"
                      v-model="formData.content_si"
                      rows="15"
                      class="w-full"
                      :class="{ 'p-invalid': errors.content_si }"
                      placeholder="ඔබේ ලිපියේ අන්තර්ගතය මෙහි ලියන්න..."
                    />
                    <small v-if="errors.content_si" class="p-error">{{ errors.content_si }}</small>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>

        <!-- English Content (Optional) -->
        <div class="col-12" v-if="languageFlags.hasEnglish">
          <Card>
            <template #title>English Content (Optional)</template>
            <template #content>
              <div class="grid">
                <!-- English Title -->
                <div class="col-12">
                  <div class="field">
                    <label for="title_en" class="font-semibold">Title</label>
                    <InputText
                      id="title_en"
                      v-model="formData.title_en"
                      class="w-full"
                      placeholder="Enter article title"
                    />
                  </div>
                </div>

                <!-- English Excerpt -->
                <div class="col-12">
                  <div class="field">
                    <label for="excerpt_en" class="font-semibold">Excerpt</label>
                    <Textarea
                      id="excerpt_en"
                      v-model="formData.excerpt_en"
                      rows="3"
                      class="w-full"
                      placeholder="Brief summary of the article"
                    />
                  </div>
                </div>

                <!-- English Content -->
                <div class="col-12">
                  <div class="field">
                    <label for="content_en" class="font-semibold">Content</label>
                    <Textarea
                      id="content_en"
                      v-model="formData.content_en"
                      rows="15"
                      class="w-full"
                      placeholder="Write your article content here..."
                    />
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>

        <!-- Tamil Content (Optional) -->
        <div class="col-12" v-if="languageFlags.hasTamil">
          <Card>
            <template #title>தமிழ் Content (Optional)</template>
            <template #content>
              <div class="grid">
                <!-- Tamil Title -->
                <div class="col-12">
                  <div class="field">
                    <label for="title_ta" class="font-semibold">தலைப்பு (Title)</label>
                    <InputText
                      id="title_ta"
                      v-model="formData.title_ta"
                      class="w-full"
                      placeholder="கட்டுரையின் தலைப்பை உள்ளிடவும்"
                    />
                  </div>
                </div>

                <!-- Tamil Excerpt -->
                <div class="col-12">
                  <div class="field">
                    <label for="excerpt_ta" class="font-semibold">சுருக்கம் (Excerpt)</label>
                    <Textarea
                      id="excerpt_ta"
                      v-model="formData.excerpt_ta"
                      rows="3"
                      class="w-full"
                      placeholder="கட்டுரையின் சுருக்கம்"
                    />
                  </div>
                </div>

                <!-- Tamil Content -->
                <div class="col-12">
                  <div class="field">
                    <label for="content_ta" class="font-semibold">உள்ளடக்கம் (Content)</label>
                    <Textarea
                      id="content_ta"
                      v-model="formData.content_ta"
                      rows="15"
                      class="w-full"
                      placeholder="உங்கள் கட்டுரை உள்ளடக்கத்தை இங்கே எழுதுங்கள்..."
                    />
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>

        <!-- Article Metadata -->
        <div class="col-12">
          <Card>
            <template #title>Article Metadata</template>
            <template #content>
              <div class="grid">
                <!-- Featured Image -->
                <div class="col-12 md:col-6">
                  <div class="field">
                    <label class="font-semibold">Featured Image</label>
                    <div class="image-upload">
                      <img
                        v-if="imagePreview"
                        :src="imagePreview"
                        alt="Preview"
                        class="image-preview"
                      />
                      <FileUpload
                        mode="basic"
                        accept="image/*"
                        :maxFileSize="5000000"
                        chooseLabel="Choose Image"
                        @select="onImageSelect"
                        :auto="true"
                        customUpload
                      />
                      <Button
                        v-if="imagePreview"
                        label="Remove"
                        icon="pi pi-times"
                        severity="danger"
                        text
                        @click="removeImage"
                      />
                    </div>
                  </div>
                </div>

                <!-- Categories -->
                <div class="col-12 md:col-6">
                  <div class="field">
                    <label for="categories" class="font-semibold">Categories *</label>
                    <MultiSelect
                      id="categories"
                      v-model="formData.categories"
                      :options="categories"
                      optionLabel="name"
                      optionValue="id"
                      placeholder="Select categories"
                      class="w-full"
                      :class="{ 'p-invalid': errors.categories }"
                    />
                    <small v-if="errors.categories" class="p-error">{{ errors.categories }}</small>
                  </div>
                </div>

                <!-- YouTube Video URL -->
                <div class="col-12 md:col-6">
                  <div class="field">
                    <label for="youtube_url" class="font-semibold">YouTube Video URL</label>
                    <InputText
                      id="youtube_url"
                      v-model="formData.youtube_url"
                      class="w-full"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                </div>

                <!-- Status -->
                <div class="col-12 md:col-6">
                  <div class="field">
                    <label for="status" class="font-semibold">Status *</label>
                    <Dropdown
                      id="status"
                      v-model="formData.status"
                      :options="statusOptions"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Select status"
                      class="w-full"
                    />
                  </div>
                </div>

                <!-- Toggles -->
                <div class="col-12">
                  <div class="flex gap-4">
                    <div class="field-checkbox">
                      <Checkbox id="is_featured" v-model="formData.is_featured" :binary="true" />
                      <label for="is_featured" class="ml-2">Featured Article</label>
                    </div>

                    <div class="field-checkbox">
                      <Checkbox id="is_breaking" v-model="formData.is_breaking" :binary="true" />
                      <label for="is_breaking" class="ml-2">Breaking News</label>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>

        <!-- Actions -->
        <div class="col-12">
          <div class="flex gap-3 justify-content-end">
            <Button
              label="Cancel"
              icon="pi pi-times"
              severity="secondary"
              outlined
              @click="$emit('cancel')"
            />
            <Button
              label="Save as Draft"
              icon="pi pi-save"
              outlined
              @click="saveDraft"
              :loading="saving"
            />
            <Button label="Publish" icon="pi pi-check" type="submit" :loading="saving" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { uploadImage } from '@/utils/imageUpload';
import { ref, watch } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({}),
  },
  categories: {
    type: Array,
    default: () => [],
  },
  saving: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['submit', 'cancel']);

const languageFlags = ref({
  hasEnglish: false,
  hasTamil: false,
});

const formData = ref({
  // Sinhala (required)
  title_si: '',
  excerpt_si: '',
  content_si: '',
  // English (optional)
  title_en: '',
  excerpt_en: '',
  content_en: '',
  // Tamil (optional)
  title_ta: '',
  excerpt_ta: '',
  content_ta: '',
  // Legacy fields for backward compatibility
  title: '',
  excerpt: '',
  content: '',
  // Metadata
  featured_image: null,
  categories: [],
  youtube_url: '',
  status: 'draft',
  is_featured: false,
  is_breaking: false,
});

const imagePreview = ref(null);
const selectedImageFile = ref(null);
const errors = ref({});

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
];

// Initialize form with existing data
watch(
  () => props.initialData,
  (data) => {
    if (data && Object.keys(data).length > 0) {
      formData.value = {
        // Sinhala
        title_si: data.title_si || data.title || '',
        excerpt_si: data.excerpt_si || data.excerpt || '',
        content_si: data.content_si || data.content || '',
        // English
        title_en: data.title_en || '',
        excerpt_en: data.excerpt_en || '',
        content_en: data.content_en || '',
        // Tamil
        title_ta: data.title_ta || '',
        excerpt_ta: data.excerpt_ta || '',
        content_ta: data.content_ta || '',
        // Legacy
        title: data.title || data.title_si || '',
        excerpt: data.excerpt || data.excerpt_si || '',
        content: data.content || data.content_si || '',
        // Metadata
        featured_image: data.featured_image || null,
        categories: data.categories || [],
        youtube_url: data.youtube_url || '',
        status: data.status || 'draft',
        is_featured: data.is_featured || false,
        is_breaking: data.is_breaking || false,
      };

      // Set language flags based on existing content
      languageFlags.value.hasEnglish = !!(data.title_en || data.content_en);
      languageFlags.value.hasTamil = !!(data.title_ta || data.content_ta);

      if (data.featured_image) {
        imagePreview.value = data.featured_image;
      }
    }
  },
  { immediate: true }
);

const onImageSelect = (event) => {
  const file = event.files[0];
  if (file) {
    selectedImageFile.value = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  imagePreview.value = null;
  selectedImageFile.value = null;
  formData.value.featured_image = null;
};

const validateForm = () => {
  errors.value = {};

  if (!formData.value.title_si.trim()) {
    errors.value.title_si = 'Sinhala title is required';
  }

  if (!formData.value.content_si.trim()) {
    errors.value.content_si = 'Sinhala content is required';
  }

  if (!formData.value.categories || formData.value.categories.length === 0) {
    errors.value.categories = 'At least one category is required';
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  formData.value.status = 'published';
  await submitForm();
};

const saveDraft = async () => {
  if (!validateForm()) {
    return;
  }

  formData.value.status = 'draft';
  await submitForm();
};

const submitForm = async () => {
  const submitData = { ...formData.value };

  // Sync legacy fields with Sinhala (for backward compatibility)
  submitData.title = submitData.title_si;
  submitData.excerpt = submitData.excerpt_si;
  submitData.content = submitData.content_si;

  // Remove empty optional language fields to avoid sending null values
  if (!languageFlags.value.hasEnglish) {
    delete submitData.title_en;
    delete submitData.excerpt_en;
    delete submitData.content_en;
  }
  if (!languageFlags.value.hasTamil) {
    delete submitData.title_ta;
    delete submitData.excerpt_ta;
    delete submitData.content_ta;
  }

  // Handle image upload if new image selected
  if (selectedImageFile.value) {
    try {
      const uploadedUrl = await uploadImage(selectedImageFile.value, 'news');
      submitData.featured_image = uploadedUrl;
    } catch (error) {
      console.error('Image upload failed:', error);
      // Continue without image if upload fails
    }
  }

  emit('submit', submitData);
};
</script>

<style scoped>
.news-editor {
  max-width: 100%;
}

.field {
  margin-bottom: 1.5rem;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.image-upload {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image-preview {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.field-checkbox {
  display: flex;
  align-items: center;
}
</style>
