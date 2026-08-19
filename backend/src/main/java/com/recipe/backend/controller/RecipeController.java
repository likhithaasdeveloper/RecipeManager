package com.recipe.backend.controller;

import com.recipe.backend.entity.Recipe;
import com.recipe.backend.service.RecipeService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {

    Optional<Recipe> recipe = recipeService.getRecipeById(id);

    if (recipe.isPresent()) {
        return ResponseEntity.ok(recipe.get());
    }

    return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Long id, @RequestBody Recipe recipe) {
    return recipeService.updateRecipe(id, recipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
    boolean deleted = recipeService.deleteRecipe(id);

    if (deleted) {
        return ResponseEntity.noContent().build();
    }

    return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        return recipeService.createRecipe(recipe);
}
}