import userService from '@/services/userService';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUsersStore = defineStore('users', () => {
  // State
  const users = ref([]);
  const loading = ref(false);
  const totalRecords = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(20);
  const filters = ref({
    role: '',
    sort_by: 'created_at',
    sort_order: 'DESC',
  });

  // Getters
  const superAdminCount = computed(
    () => users.value.filter((u) => u.role === 'super_admin').length
  );
  const editorCount = computed(() => users.value.filter((u) => u.role === 'editor').length);
  const moderatorCount = computed(() => users.value.filter((u) => u.role === 'moderator').length);

  // Actions
  const fetchUsers = async (page = 1) => {
    loading.value = true;
    try {
      const result = await userService.getAllAdminUsers(page, pageSize.value, {
        role: filters.value.role,
        sort_by: filters.value.sort_by,
        sort_order: filters.value.sort_order,
      });

      users.value = result.data || [];
      totalRecords.value = result.pagination?.total || 0;
      currentPage.value = page;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const createUser = async (userData) => {
    try {
      const result = await userService.createAdminUser(userData);
      users.value.unshift(result.data);
      totalRecords.value++;
      return result;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      const result = await userService.updateAdminUser(userId, userData);
      const index = users.value.findIndex((u) => u.id === userId);
      if (index !== -1) {
        users.value[index] = result.data;
      }
      return result;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await userService.deleteAdminUser(userId);
      const index = users.value.findIndex((u) => u.id === userId);
      if (index !== -1) {
        users.value.splice(index, 1);
        if (totalRecords.value > 0) totalRecords.value--;
      }
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters };
    currentPage.value = 1;
  };

  const resetFilters = () => {
    filters.value = {
      role: '',
      sort_by: 'created_at',
      sort_order: 'DESC',
    };
    currentPage.value = 1;
  };

  return {
    // State
    users,
    loading,
    totalRecords,
    currentPage,
    pageSize,
    filters,

    // Getters
    superAdminCount,
    editorCount,
    moderatorCount,

    // Actions
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    setFilters,
    resetFilters,
  };
});
