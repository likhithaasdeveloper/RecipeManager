package com.recipe.backend.controller;

import com.recipe.backend.entity.Ingredient;
import com.recipe.backend.service.IngredientService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {

    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping
    public List<Ingredient> getAllIngredients() {
        return ingredientService.getAllIngredients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingredient> getIngredientById(@PathVariable Long id) {

        Optional<Ingredient> ingredient =
                ingredientService.getIngredientById(id);

        if (ingredient.isPresent()) {
            return ResponseEntity.ok(ingredient.get());
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Ingredient> createIngredient(
            @Valid @RequestBody Ingredient ingredient) {

        return ResponseEntity.ok(
                ingredientService.createIngredient(ingredient)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ingredient> updateIngredient(
            @PathVariable Long id,
            @Valid @RequestBody Ingredient ingredient) {

        if (ingredientService.getIngredientById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                ingredientService.updateIngredient(id, ingredient)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable Long id) {

        if (ingredientService.deleteIngredient(id)) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/recipe/{recipeId}")
    public List<Ingredient> getIngredientsByRecipeId(
            @PathVariable Long recipeId) {

        return ingredientService.getIngredientsByRecipeId(recipeId);
    }
}