package com.recipe.backend.service;

import com.recipe.backend.entity.Recipe;
import com.recipe.backend.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> getRecipeById(Long id) {
        return recipeRepository.findById(id);
    }

    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public Recipe updateRecipe(Long id, Recipe recipe) {
    recipe.setId(id);
    return recipeRepository.save(recipe);
}

    public boolean deleteRecipe(Long id) {
    if (!recipeRepository.existsById(id)) {
        return false;
    }

    recipeRepository.deleteById(id);
    return true;
}
}