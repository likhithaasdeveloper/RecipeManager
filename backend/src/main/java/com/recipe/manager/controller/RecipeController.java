package com.recipe.manager.controller;

import com.recipe.manager.model.Recipe;
import com.recipe.manager.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:5173")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping
    public List<Recipe> getApprovedRecipes() {
        return recipeRepository.findByStatus("APPROVED");
    }

    @GetMapping("/pending")
    public List<Recipe> getPendingRecipes() {
        return recipeRepository.findByStatus("PENDING");
    }

    @GetMapping("/my-recipes")
    public List<Recipe> getMyRecipes(@RequestParam String email) {
        return recipeRepository.findByCreatorEmail(email);
    }

    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        recipe.setStatus("PENDING");
        return recipeRepository.save(recipe);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable Long id, @RequestBody Recipe updatedData) {
        return recipeRepository.findById(id).map(recipe -> {
            recipe.setTitle(updatedData.getTitle());
            recipe.setDescription(updatedData.getDescription());
            recipe.setIngredients(updatedData.getIngredients());
            recipe.setCuisine(updatedData.getCuisine());
            return ResponseEntity.ok(recipeRepository.save(recipe));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Recipe> approveRecipe(@PathVariable Long id) {
        return recipeRepository.findById(id).map(recipe -> {
            recipe.setStatus("APPROVED");
            return ResponseEntity.ok(recipeRepository.save(recipe));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Recipe> rejectRecipe(@PathVariable Long id) {
    return recipeRepository.findById(id).map(recipe -> {
        recipe.setStatus("REJECTED");
        return ResponseEntity.ok(recipeRepository.save(recipe));
    }).orElse(ResponseEntity.notFound().build());
}

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecipe(@PathVariable Long id) {
        recipeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}