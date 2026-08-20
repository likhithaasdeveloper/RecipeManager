package com.recipe.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String cuisine;

    @Positive
    private Integer prepTime;

    @Positive
    private Integer servings;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    public Recipe() {
    }

    // Existing constructor - keeping this so your old code doesn't break
    public Recipe(String name, String cuisine, Integer prepTime, Integer servings) {
        this.name = name;
        this.cuisine = cuisine;
        this.prepTime = prepTime;
        this.servings = servings;
    }

    // New constructor with instructions
    public Recipe(
            String name,
            String cuisine,
            Integer prepTime,
            Integer servings,
            String instructions) {

        this.name = name;
        this.cuisine = cuisine;
        this.prepTime = prepTime;
        this.servings = servings;
        this.instructions = instructions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public Integer getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(Integer prepTime) {
        this.prepTime = prepTime;
    }

    public Integer getServings() {
        return servings;
    }

    public void setServings(Integer servings) {
        this.servings = servings;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }
}