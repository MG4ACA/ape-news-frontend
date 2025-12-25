import api from './api';

export const newsService = {
  // Get all published news with pagination
  async getNews(params = {}) {
    const response = await api.get('/news', { params });
    return response.data;
  },

  // Get all news for admin (includes drafts)
  async getAdminNews(params = {}) {
    const response = await api.get('/news/admin/all', { params });
    return response.data;
  },

  // Get single news article by ID
  async getNewsById(id) {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },

  // Get featured news
  async getFeaturedNews(limit = 5, language = null) {
    const params = { limit, is_featured: true };
    if (language) params.language = language;
    const response = await api.get('/news', { params });
    return response.data;
  },

  // Get breaking news
  async getBreakingNews(limit = 3, language = null) {
    const params = { limit, is_breaking: true };
    if (language) params.language = language;
    const response = await api.get('/news', { params });
    return response.data;
  },

  // Get news by category
  async getNewsByCategory(categoryId, params = {}) {
    const response = await api.get(`/news/category/${categoryId}`, { params });
    return response.data;
  },

  // Search news
  async searchNews(query, params = {}) {
    const response = await api.get('/news', {
      params: { search: query, ...params },
    });
    return response.data;
  },

  // Get related news
  async getRelatedNews(id, limit = 4, language = null) {
    const params = { limit };
    if (language) params.language = language;
    const response = await api.get(`/news/${id}/related`, { params });
    return response.data;
  },

  // Create news (Admin only)
  async createNews(newsData) {
    const response = await api.post('/news', newsData);
    return response.data;
  },

  // Update news (Admin only)
  async updateNews(id, newsData) {
    const response = await api.put(`/news/${id}`, newsData);
    return response.data;
  },

  // Delete news (Admin only)
  async deleteNews(id) {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  },

  // Toggle news status (Admin only)
  async toggleNewsStatus(id, status) {
    const response = await api.patch(`/news/${id}/status`, { status });
    return response.data;
  },
};

export default newsService;
