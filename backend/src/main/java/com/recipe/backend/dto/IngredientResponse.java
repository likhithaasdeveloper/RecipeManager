package com.recipe.backend.dto;

public class IngredientResponse {

    private Long id;
    private String name;
    private Integer quantity;
    private String unit;

    public IngredientResponse() {
    }

    public IngredientResponse(Long id, String name, Integer quantity, String unit) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public String getUnit() {
        return unit;
    }
}