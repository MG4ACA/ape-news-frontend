<template>
  <div class="user-manager">
    <!-- Header with Stats -->
    <div class="flex justify-content-between align-items-center mb-6">
      <h1 class="text-3xl font-bold m-0">Admin User Management</h1>
      <Button label="Add User" icon="pi pi-plus" @click="openCreateDialog" severity="success" />
    </div>

    <!-- Role Stats -->
    <div class="grid mb-6">
      <div class="col-12 md:col-4">
        <Card class="stat-card">
          <template #content>
            <div class="text-center">
              <div class="stat-number text-2xl font-bold text-primary">
                {{ usersStore.superAdminCount }}
              </div>
              <div class="text-sm text-color-secondary">Super Admins</div>
            </div>
          </template>
        </Card>
      </div>
      <div class="col-12 md:col-4">
        <Card class="stat-card">
          <template #content>
            <div class="text-center">
              <div class="stat-number text-2xl font-bold" style="color: var(--green-500)">
                {{ usersStore.editorCount }}
              </div>
              <div class="text-sm text-color-secondary">Editors</div>
            </div>
          </template>
        </Card>
      </div>
      <div class="col-12 md:col-4">
        <Card class="stat-card">
          <template #content>
            <div class="text-center">
              <div class="stat-number text-2xl font-bold" style="color: var(--orange-500)">
                {{ usersStore.moderatorCount }}
              </div>
              <div class="text-sm text-color-secondary">Moderators</div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Filters -->
    <Card class="mb-4">
      <template #content>
        <div class="grid">
          <div class="col-12 md:col-6">
            <label class="block mb-2 font-semibold">Filter by Role</label>
            <Dropdown
              v-model="localFilters.role"
              :options="roleOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="All Roles"
              @change="applyFilters"
            />
          </div>
          <div class="col-12 md:col-6">
            <label class="block mb-2 font-semibold">Sort Order</label>
            <Dropdown
              v-model="localFilters.sort_order"
              :options="orderOptions"
              optionLabel="label"
              optionValue="value"
              @change="applyFilters"
            />
          </div>
        </div>
        <Button
          label="Reset Filters"
          icon="pi pi-filter-slash"
          severity="secondary"
          @click="resetFiltersClick"
          class="mt-3"
        />
      </template>
    </Card>

    <!-- Users Table -->
    <LoadingSpinner v-if="usersStore.loading" message="Loading users..." />

    <div v-else class="card">
      <DataTable
        :value="usersStore.users"
        :loading="usersStore.loading"
        paginator
        :rows="20"
        :rowsPerPageOptions="[10, 20, 50]"
        :totalRecords="usersStore.totalRecords"
        :lazy="true"
        @page="onPage"
        stripedRows
        responsiveLayout="scroll"
        dataKey="id"
      >
        <!-- ID Column -->
        <Column field="id" header="ID" style="width: 80px">
          <template #body="{ data }">
            <span class="font-semibold">#{{ data.id }}</span>
          </template>
        </Column>

        <!-- User Info Column -->
        <Column field="full_name" header="User" style="width: 200px">
          <template #body="{ data }">
            <div class="flex align-items-center gap-2">
              <Avatar :label="data.full_name?.charAt(0)" shape="circle" />
              <div>
                <div class="font-semibold">{{ data.full_name }}</div>
                <div class="text-xs text-color-secondary">@{{ data.username }}</div>
              </div>
            </div>
          </template>
        </Column>

        <!-- Email Column -->
        <Column field="email" header="Email" style="width: 200px">
          <template #body="{ data }">
            <a :href="`mailto:${data.email}`" class="text-primary">{{ data.email }}</a>
          </template>
        </Column>

        <!-- Role Column -->
        <Column field="role" header="Role" style="width: 130px">
          <template #body="{ data }">
            <Tag
              :value="formatRole(data.role)"
              :severity="getRoleSeverity(data.role)"
              :icon="getRoleIcon(data.role)"
            />
          </template>
        </Column>

        <!-- Status Column -->
        <Column field="is_active" header="Status" style="width: 120px">
          <template #body="{ data }">
            <Tag
              :value="data.is_active ? 'Active' : 'Inactive'"
              :severity="data.is_active ? 'success' : 'danger'"
              :icon="data.is_active ? 'pi pi-check-circle' : 'pi pi-times-circle'"
            />
          </template>
        </Column>

        <!-- Created Date Column -->
        <Column field="created_at" header="Created" style="width: 150px">
          <template #body="{ data }">
            <div class="flex flex-column gap-1">
              <span>{{ formatDate(data.created_at) }}</span>
              <span class="text-xs text-color-secondary">{{ formatTime(data.created_at) }}</span>
            </div>
          </template>
        </Column>

        <!-- Actions Column -->
        <Column header="Actions" style="width: 150px" :frozen="true" alignFrozen="right">
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button
                icon="pi pi-pencil"
                severity="info"
                rounded
                text
                @click="editUser(data)"
                v-tooltip="'Edit'"
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                rounded
                text
                @click="deleteUserClick(data.id)"
                v-tooltip="'Delete'"
                :disabled="data.id === currentUserId"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- User Form Dialog -->
    <Dialog
      v-model:visible="formDialogVisible"
      :header="isEditMode ? 'Edit User' : 'Create New User'"
      :modal="true"
      :style="{ width: '50vw' }"
      @hide="closeFormDialog"
    >
      <form @submit.prevent="handleSubmit" class="grid gap-4">
        <!-- Full Name -->
        <div class="col-12">
          <label class="block mb-2 font-semibold">Full Name *</label>
          <InputText
            v-model="formData.full_name"
            placeholder="Enter full name"
            class="w-full"
            :disabled="submitting"
          />
          <small class="text-red-500" v-if="errors.full_name">{{ errors.full_name }}</small>
        </div>

        <!-- Username -->
        <div class="col-12">
          <label class="block mb-2 font-semibold">Username *</label>
          <InputText
            v-model="formData.username"
            placeholder="Enter username"
            class="w-full"
            :disabled="submitting || isEditMode"
          />
          <small class="text-red-500" v-if="errors.username">{{ errors.username }}</small>
        </div>

        <!-- Email -->
        <div class="col-12">
          <label class="block mb-2 font-semibold">Email *</label>
          <InputText
            v-model="formData.email"
            placeholder="Enter email"
            type="email"
            class="w-full"
            :disabled="submitting"
          />
          <small class="text-red-500" v-if="errors.email">{{ errors.email }}</small>
        </div>

        <!-- Password -->
        <div class="col-12">
          <label class="block mb-2 font-semibold">
            {{ isEditMode ? 'Password (leave blank to keep current)' : 'Password *' }}
          </label>
          <Password
            v-model="formData.password"
            placeholder="Enter password"
            class="w-full"
            :disabled="submitting"
            toggleMask
          />
          <small class="text-red-500" v-if="errors.password">{{ errors.password }}</small>
        </div>

        <!-- Role -->
        <div class="col-12">
          <label class="block mb-2 font-semibold">Role *</label>
          <Dropdown
            v-model="formData.role"
            :options="roleOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select role"
            :disabled="submitting"
          />
          <small class="text-red-500" v-if="errors.role">{{ errors.role }}</small>
        </div>

        <!-- Active Status -->
        <div class="col-12">
          <div class="flex align-items-center gap-2">
            <Checkbox v-model="formData.is_active" :binary="true" :disabled="submitting" />
            <label class="font-semibold">Active</label>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="col-12 flex gap-2 justify-content-end pt-2 border-top-1">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="closeFormDialog"
            :disabled="submitting"
          />
          <Button type="submit" :label="isEditMode ? 'Update' : 'Create'" :loading="submitting" />
        </div>
      </form>
    </Dialog>

    <!-- Confirmation Dialog -->
    <ConfirmDialog />

    <!-- Toast Messages -->
    <Toast />
  </div>
</template>

<script setup>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { useAuthStore } from '@/stores/auth';
import { useUsersStore } from '@/stores/users';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Tag from 'primevue/tag';
import Toast from 'primevue/toast';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, reactive, ref } from 'vue';

const usersStore = useUsersStore();
const authStore = useAuthStore();
const toast = useToast();
const confirm = useConfirm();

const formDialogVisible = ref(false);
const isEditMode = ref(false);
const submitting = ref(false);
const editingUserId = ref(null);

const currentUserId = computed(() => authStore.user?.id);

const formData = reactive({
  full_name: '',
  username: '',
  email: '',
  password: '',
  role: 'editor',
  is_active: true,
});

const errors = reactive({
  full_name: '',
  username: '',
  email: '',
  password: '',
  role: '',
});

const localFilters = reactive({
  role: '',
  sort_by: 'created_at',
  sort_order: 'DESC',
});

const roleOptions = [
  { label: 'All Roles', value: '' },
  { label: 'Super Admin', value: 'super_admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Moderator', value: 'moderator' },
];

const orderOptions = [
  { label: 'Newest First', value: 'DESC' },
  { label: 'Oldest First', value: 'ASC' },
];

// Utilities
const formatRole = (role) => {
  const roleMap = {
    super_admin: 'Super Admin',
    editor: 'Editor',
    moderator: 'Moderator',
  };
  return roleMap[role] || role;
};

const getRoleSeverity = (role) => {
  const severityMap = {
    super_admin: 'danger',
    editor: 'info',
    moderator: 'warning',
  };
  return severityMap[role] || 'info';
};

const getRoleIcon = (role) => {
  const iconMap = {
    super_admin: 'pi pi-crown',
    editor: 'pi pi-pencil',
    moderator: 'pi pi-shield',
  };
  return iconMap[role] || '';
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatTime = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Form validation
const validateForm = () => {
  errors.full_name = '';
  errors.username = '';
  errors.email = '';
  errors.password = '';
  errors.role = '';

  if (!formData.full_name?.trim()) {
    errors.full_name = 'Full name is required';
  }

  if (!isEditMode.value && !formData.username?.trim()) {
    errors.username = 'Username is required';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (!isEditMode.value && !formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password && formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!formData.role) {
    errors.role = 'Role is required';
  }

  return !Object.values(errors).some((e) => e);
};

// Dialog Actions
const openCreateDialog = () => {
  isEditMode.value = false;
  editingUserId.value = null;
  formData.full_name = '';
  formData.username = '';
  formData.email = '';
  formData.password = '';
  formData.role = 'editor';
  formData.is_active = true;
  formDialogVisible.value = true;
};

const editUser = (user) => {
  isEditMode.value = true;
  editingUserId.value = user.id;
  formData.full_name = user.full_name;
  formData.username = user.username;
  formData.email = user.email;
  formData.password = '';
  formData.role = user.role;
  formData.is_active = user.is_active;
  formDialogVisible.value = true;
};

const closeFormDialog = () => {
  formDialogVisible.value = false;
  isEditMode.value = false;
  editingUserId.value = null;
};

// Submit handler
const handleSubmit = async () => {
  if (!validateForm()) return;

  submitting.value = true;

  try {
    const submitData = {
      full_name: formData.full_name,
      email: formData.email,
      role: formData.role,
      is_active: formData.is_active,
    };

    if (!isEditMode.value) {
      submitData.username = formData.username;
      submitData.password = formData.password;
    } else if (formData.password) {
      submitData.password = formData.password;
    }

    if (isEditMode.value) {
      await usersStore.updateUser(editingUserId.value, submitData);
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User updated successfully',
        life: 3000,
      });
    } else {
      await usersStore.createUser(submitData);
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User created successfully',
        life: 3000,
      });
    }

    closeFormDialog();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response?.data?.message || 'Operation failed',
      life: 3000,
    });
  } finally {
    submitting.value = false;
  }
};

// Delete handler
const deleteUserClick = (userId) => {
  confirm.require({
    message: 'Are you sure you want to delete this user? This action cannot be undone.',
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await usersStore.deleteUser(userId);
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted successfully',
          life: 3000,
        });
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: error.response?.data?.message || 'Failed to delete user',
          life: 3000,
        });
      }
    },
  });
};

// Filter Actions
const onPage = (event) => {
  usersStore.fetchUsers(event.page + 1);
};

const applyFilters = () => {
  usersStore.setFilters(localFilters);
  usersStore.fetchUsers(1);
};

const resetFiltersClick = () => {
  localFilters.role = '';
  localFilters.sort_by = 'created_at';
  localFilters.sort_order = 'DESC';
  usersStore.resetFilters();
  usersStore.fetchUsers(1);
};

// Initialization
onMounted(() => {
  usersStore.fetchUsers(1);
});
</script>

<style scoped>
.user-manager {
  @apply w-full;
}

.stat-card {
  height: 100%;
}

.stat-number {
  color: var(--primary-color);
}
</style>
