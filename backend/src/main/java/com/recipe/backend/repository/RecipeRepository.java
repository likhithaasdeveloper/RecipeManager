package com.recipe.backend.repository;

import com.recipe.backend.entity.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Page<Recipe> findByCuisineIgnoreCase(String cuisine, Pageable pageable);
}