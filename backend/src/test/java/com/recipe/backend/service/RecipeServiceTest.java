package com.recipe.backend.service;

import com.recipe.backend.entity.Recipe;
import com.recipe.backend.repository.RecipeRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RecipeServiceTest {

    @Mock
    private RecipeRepository recipeRepository;

    @InjectMocks
    private RecipeService recipeService;

    private Recipe recipe;

    @BeforeEach
    void setUp() {
        recipe = new Recipe(
                "Pasta",
                "Italian",
                25,
                2
        );

        recipe.setId(1L);
    }

    // =========================
    // CREATE RECIPE
    // =========================

    @Test
    void createRecipe_shouldSaveRecipe() {

        when(recipeRepository.save(recipe))
                .thenReturn(recipe);

        Recipe result = recipeService.createRecipe(recipe);

        assertNotNull(result);
        assertEquals("Pasta", result.getName());
        assertEquals("Italian", result.getCuisine());

        verify(recipeRepository).save(recipe);
    }

    // =========================
    // GET RECIPE BY ID
    // =========================

    @Test
    void getRecipeById_shouldReturnRecipe() {

        when(recipeRepository.findById(1L))
                .thenReturn(Optional.of(recipe));

        Optional<Recipe> result =
                recipeService.getRecipeById(1L);

        assertTrue(result.isPresent());
        assertEquals("Pasta", result.get().getName());

        verify(recipeRepository).findById(1L);
    }

    // =========================
    // GET RECIPE BY ID - NOT FOUND
    // =========================

    @Test
    void getRecipeById_shouldReturnEmptyWhenNotFound() {

        when(recipeRepository.findById(99L))
                .thenReturn(Optional.empty());

        Optional<Recipe> result =
                recipeService.getRecipeById(99L);

        assertTrue(result.isEmpty());

        verify(recipeRepository).findById(99L);
    }

    // =========================
    // GET ALL RECIPES
    // =========================

    @Test
    void getRecipes_shouldReturnAllRecipes() {

        PageRequest pageable = PageRequest.of(0, 5);

        Page<Recipe> page =
                new PageImpl<>(List.of(recipe));

        when(recipeRepository.findAll(pageable))
                .thenReturn(page);

        Page<Recipe> result =
                recipeService.getRecipes(0, 5, "");

        assertEquals(1, result.getTotalElements());
        assertEquals("Pasta", result.getContent().get(0).getName());

        verify(recipeRepository).findAll(pageable);
    }

    // =========================
    // FILTER BY CUISINE
    // =========================

    @Test
    void getRecipes_shouldFilterByCuisine() {

        PageRequest pageable = PageRequest.of(0, 5);

        Page<Recipe> page =
                new PageImpl<>(List.of(recipe));

        when(recipeRepository.findByCuisineIgnoreCase(
                "Italian",
                pageable
        )).thenReturn(page);

        Page<Recipe> result =
                recipeService.getRecipes(0, 5, "Italian");

        assertEquals(1, result.getTotalElements());
        assertEquals(
                "Italian",
                result.getContent().get(0).getCuisine()
        );

        verify(recipeRepository)
                .findByCuisineIgnoreCase("Italian", pageable);
    }

    // =========================
    // UPDATE RECIPE
    // =========================

    @Test
    void updateRecipe_shouldUpdateRecipe() {

        Recipe updatedRecipe = new Recipe(
                "Updated Pasta",
                "Italian",
                30,
                4
        );

        when(recipeRepository.save(updatedRecipe))
                .thenReturn(updatedRecipe);

        Recipe result =
                recipeService.updateRecipe(1L, updatedRecipe);

        assertEquals(1L, result.getId());
        assertEquals("Updated Pasta", result.getName());
        assertEquals(30, result.getPrepTime());

        verify(recipeRepository).save(updatedRecipe);
    }

    // =========================
    // DELETE RECIPE
    // =========================

    @Test
    void deleteRecipe_shouldDeleteExistingRecipe() {

        when(recipeRepository.existsById(1L))
                .thenReturn(true);

        boolean result =
                recipeService.deleteRecipe(1L);

        assertTrue(result);

        verify(recipeRepository).existsById(1L);
        verify(recipeRepository).deleteById(1L);
    }

    // =========================
    // DELETE NON-EXISTING RECIPE
    // =========================

    @Test
    void deleteRecipe_shouldReturnFalseWhenRecipeDoesNotExist() {

        when(recipeRepository.existsById(99L))
                .thenReturn(false);

        boolean result =
                recipeService.deleteRecipe(99L);

        assertFalse(result);

        verify(recipeRepository).existsById(99L);

        verify(recipeRepository, never())
                .deleteById(99L);
    }
}