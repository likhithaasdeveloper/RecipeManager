package com.recipe.manager.repository;

import com.recipe.manager.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByStatus(String status);
    List<Recipe> findByCreatorEmail(String creatorEmail);
}