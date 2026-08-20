package com.recipe.backend.service;

import com.recipe.backend.dto.IngredientResponse;
import com.recipe.backend.entity.Ingredient;
import com.recipe.backend.entity.Recipe;
import com.recipe.backend.repository.IngredientRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class IngredientServiceTest {

    @Mock
    private IngredientRepository ingredientRepository;

    @InjectMocks
    private IngredientService ingredientService;

    private Recipe recipe;
    private Ingredient ingredient;

    @BeforeEach
    void setUp() {

        recipe = new Recipe(
                "Pasta",
                "Italian",
                25,
                2
        );

        recipe.setId(1L);

        ingredient = new Ingredient(
                "Tomato",
                3,
                "pieces",
                recipe
        );

        ingredient.setId(1L);
    }

    // =========================
    // CREATE INGREDIENT
    // =========================

    @Test
    void createIngredient_shouldSaveIngredient() {

        when(ingredientRepository.save(ingredient))
                .thenReturn(ingredient);

        IngredientResponse result =
                ingredientService.createIngredient(ingredient);

        assertNotNull(result);
        assertEquals("Tomato", result.getName());
        assertEquals(3, result.getQuantity());
        assertEquals("pieces", result.getUnit());

        verify(ingredientRepository).save(ingredient);
    }

    // =========================
    // GET INGREDIENT BY ID
    // =========================

    @Test
    void getIngredientById_shouldReturnIngredient() {

        when(ingredientRepository.findById(1L))
                .thenReturn(Optional.of(ingredient));

        Optional<IngredientResponse> result =
                ingredientService.getIngredientById(1L);

        assertTrue(result.isPresent());
        assertEquals("Tomato", result.get().getName());

        verify(ingredientRepository).findById(1L);
    }

    // =========================
    // GET INGREDIENT BY ID
    // NOT FOUND
    // =========================

    @Test
    void getIngredientById_shouldReturnEmptyWhenNotFound() {

        when(ingredientRepository.findById(99L))
                .thenReturn(Optional.empty());

        Optional<IngredientResponse> result =
                ingredientService.getIngredientById(99L);

        assertTrue(result.isEmpty());

        verify(ingredientRepository).findById(99L);
    }

    // =========================
    // GET ALL INGREDIENTS
    // =========================

    @Test
    void getAllIngredients_shouldReturnIngredients() {

        when(ingredientRepository.findAll())
                .thenReturn(List.of(ingredient));

        List<IngredientResponse> result =
                ingredientService.getAllIngredients();

        assertEquals(1, result.size());
        assertEquals("Tomato", result.get(0).getName());

        verify(ingredientRepository).findAll();
    }

    // =========================
    // GET INGREDIENTS BY RECIPE
    // =========================

    @Test
    void getIngredientsByRecipeId_shouldReturnIngredients() {

        when(ingredientRepository.findByRecipeId(1L))
                .thenReturn(List.of(ingredient));

        List<IngredientResponse> result =
                ingredientService.getIngredientsByRecipeId(1L);

        assertEquals(1, result.size());
        assertEquals("Tomato", result.get(0).getName());

        verify(ingredientRepository)
                .findByRecipeId(1L);
    }

    // =========================
    // UPDATE INGREDIENT
    // =========================

    @Test
    void updateIngredient_shouldUpdateIngredient() {

        Ingredient updatedIngredient =
                new Ingredient(
                        "Cherry Tomato",
                        5,
                        "pieces",
                        recipe
                );

        when(ingredientRepository.save(updatedIngredient))
                .thenReturn(updatedIngredient);

        IngredientResponse result =
                ingredientService.updateIngredient(
                        1L,
                        updatedIngredient
                );

        assertEquals(1L, updatedIngredient.getId());
        assertEquals("Cherry Tomato", result.getName());
        assertEquals(5, result.getQuantity());

        verify(ingredientRepository)
                .save(updatedIngredient);
    }

    // =========================
    // DELETE INGREDIENT
    // =========================

    @Test
    void deleteIngredient_shouldDeleteExistingIngredient() {

        when(ingredientRepository.existsById(1L))
                .thenReturn(true);

        boolean result =
                ingredientService.deleteIngredient(1L);

        assertTrue(result);

        verify(ingredientRepository)
                .existsById(1L);

        verify(ingredientRepository)
                .deleteById(1L);
    }

    // =========================
    // DELETE NON-EXISTING INGREDIENT
    // =========================

    @Test
    void deleteIngredient_shouldReturnFalseWhenIngredientDoesNotExist() {

        when(ingredientRepository.existsById(99L))
                .thenReturn(false);

        boolean result =
                ingredientService.deleteIngredient(99L);

        assertFalse(result);

        verify(ingredientRepository)
                .existsById(99L);

        verify(ingredientRepository, never())
                .deleteById(99L);
    }
}