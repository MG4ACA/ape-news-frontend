import api from './api';

export const userService = {
  // Get user profile
  async getProfile() {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update user profile
  async updateProfile(userData) {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  // Get user bookmarks
  async getBookmarks() {
    const response = await api.get('/users/bookmarks');
    return response.data;
  },

  // Add bookmark
  async addBookmark(newsId) {
    const response = await api.post('/users/bookmarks', { news_id: newsId });
    return response.data;
  },

  // Remove bookmark
  async removeBookmark(newsId) {
    const response = await api.delete(`/users/bookmarks/${newsId}`);
    return response.data;
  },

  // Admin: Get all admin users
  async getAllAdminUsers(page = 1, limit = 20, filters = {}) {
    const params = {
      page,
      limit,
      ...filters,
    };
    const response = await api.get('/users/admin', { params });
    return response.data;
  },

  // Admin: Get user by ID
  async getAdminUserById(userId) {
    const response = await api.get(`/users/admin/${userId}`);
    return response.data;
  },

  // Admin: Create new admin user
  async createAdminUser(userData) {
    const response = await api.post('/users/admin', userData);
    return response.data;
  },

  // Admin: Update admin user
  async updateAdminUser(userId, userData) {
    const response = await api.put(`/users/admin/${userId}`, userData);
    return response.data;
  },

  // Admin: Delete admin user
  async deleteAdminUser(userId) {
    const response = await api.delete(`/users/admin/${userId}`);
    return response.data;
  },
};

export default userService;
