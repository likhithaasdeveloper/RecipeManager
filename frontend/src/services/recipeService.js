// src/services/recipeService.js
import API from './api';

// Initial mock recipes list for Day 3 demonstration
let mockRecipes = [
  {
    id: 1,
    title: 'Classic Garlic Butter Pasta',
    description: 'Rich creamy Alfredo sauce infused with roasted garlic and fresh basil leaves.',
  },
  {
    id: 2,
    title: 'Avocado Sourdough Toast',
    description: 'Crispy sourdough topped with smashed avocado, poached eggs, and chili flakes.',
  },
];

export const recipeService = {
  // Fetch recipes (Simulating network latency with setTimeout)
  getAllRecipes: async () => {
    try {
      // Try hitting the backend API first if available
      const response = await API.get('/recipes');
      return response.data;
    } catch (error) {
      // Fallback: Return mock recipes so the dashboard loads cleanly
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockRecipes);
        }, 500); // 500ms delay to showcase loading state
      });
    }
  },

  // Delete recipe (Admin action)
  deleteRecipe: async (id) => {
    try {
      const response = await API.delete(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      // Fallback: Remove item locally from mock storage
      mockRecipes = mockRecipes.filter((item) => item.id !== id);
      return { success: true };
    }
  },
};