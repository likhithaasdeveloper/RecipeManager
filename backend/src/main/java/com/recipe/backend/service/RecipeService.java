package com.recipe.backend.service;

import com.recipe.backend.entity.Recipe;
import com.recipe.backend.repository.RecipeRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public Page<Recipe> getRecipes(int page, int size, String cuisine) {

        Pageable pageable = PageRequest.of(page, size);

        if (cuisine != null && !cuisine.isBlank()) {
            return recipeRepository.findByCuisineIgnoreCase(cuisine, pageable);
        }

        return recipeRepository.findAll(pageable);
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