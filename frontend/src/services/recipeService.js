import API from './api';

export const recipeService = {
  getApprovedRecipes: async () => {
    const response = await API.get('/recipes');
    return response.data;
  },

  getPendingRecipes: async () => {
    const response = await API.get('/recipes/pending');
    return response.data;
  },

  getMyRecipes: async (email) => {
    const response = await API.get(`/recipes/my-recipes?email=${email}`);
    return response.data;
  },

  createRecipe: async (recipeData) => {
    const response = await API.post('/recipes', recipeData);
    return response.data;
  },

  updateRecipe: async (id, recipeData) => {
    const response = await API.put(`/recipes/${id}`, recipeData);
    return response.data;
  },

  approveRecipe: async (id) => {
    const response = await API.put(`/recipes/${id}/approve`);
    return response.data;
  },

  rejectRecipe: async (id) => {
    const response = await API.put(`/recipes/${id}/reject`);
    return response.data;
  },

  deleteRecipe: async (id) => {
    const response = await API.delete(`/recipes/${id}`);
    return response.data;
  }
};