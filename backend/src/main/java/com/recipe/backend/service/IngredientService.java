package com.recipe.backend.service;

import com.recipe.backend.dto.IngredientResponse;
import com.recipe.backend.entity.Ingredient;
import com.recipe.backend.repository.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class IngredientService {

    private final IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public List<IngredientResponse> getAllIngredients() {
        return ingredientRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public Optional<IngredientResponse> getIngredientById(Long id) {
        return ingredientRepository.findById(id)
                .map(this::toResponse);
    }

    public IngredientResponse createIngredient(Ingredient ingredient) {
        Ingredient savedIngredient = ingredientRepository.save(ingredient);
        return toResponse(savedIngredient);
    }

    public IngredientResponse updateIngredient(Long id, Ingredient ingredient) {
        ingredient.setId(id);

        Ingredient updatedIngredient = ingredientRepository.save(ingredient);
        return toResponse(updatedIngredient);
    }

    public boolean deleteIngredient(Long id) {
        if (!ingredientRepository.existsById(id)) {
            return false;
        }

        ingredientRepository.deleteById(id);
        return true;
    }

    public List<IngredientResponse> getIngredientsByRecipeId(Long recipeId) {
        return ingredientRepository.findByRecipeId(recipeId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private IngredientResponse toResponse(Ingredient ingredient) {
        return new IngredientResponse(
                ingredient.getId(),
                ingredient.getName(),
                ingredient.getQuantity(),
                ingredient.getUnit()
        );
    }
}