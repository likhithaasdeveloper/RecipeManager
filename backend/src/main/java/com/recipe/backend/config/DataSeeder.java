package com.recipe.backend.config;

import com.recipe.backend.entity.Ingredient;
import com.recipe.backend.entity.Recipe;
import com.recipe.backend.repository.IngredientRepository;
import com.recipe.backend.repository.RecipeRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(
            RecipeRepository recipeRepository,
            IngredientRepository ingredientRepository) {

        return args -> {

            // Prevent duplicate seeding
            if (recipeRepository.count() > 0) {
                return;
            }

            // =========================
            // 1. PASTA
            // =========================

            Recipe pasta = recipeRepository.save(
                    new Recipe("Pasta", "Italian", 25, 2));

            ingredientRepository.save(new Ingredient("Pasta", 200, "grams", pasta));
            ingredientRepository.save(new Ingredient("Tomato", 3, "pieces", pasta));
            ingredientRepository.save(new Ingredient("Garlic", 4, "cloves", pasta));
            ingredientRepository.save(new Ingredient("Onion", 1, "piece", pasta));
            ingredientRepository.save(new Ingredient("Olive Oil", 2, "tablespoons", pasta));
            ingredientRepository.save(new Ingredient("Basil", 10, "leaves", pasta));
            ingredientRepository.save(new Ingredient("Parmesan Cheese", 50, "grams", pasta));


            // =========================
            // 2. PANEER BUTTER MASALA
            // =========================

            Recipe paneer = recipeRepository.save(
                    new Recipe("Paneer Butter Masala", "Indian", 40, 4));

            ingredientRepository.save(new Ingredient("Paneer", 250, "grams", paneer));
            ingredientRepository.save(new Ingredient("Tomato", 3, "pieces", paneer));
            ingredientRepository.save(new Ingredient("Onion", 2, "pieces", paneer));
            ingredientRepository.save(new Ingredient("Butter", 3, "tablespoons", paneer));
            ingredientRepository.save(new Ingredient("Cream", 100, "ml", paneer));
            ingredientRepository.save(new Ingredient("Ginger Garlic Paste", 1, "tablespoon", paneer));
            ingredientRepository.save(new Ingredient("Garam Masala", 1, "teaspoon", paneer));


            // =========================
            // 3. PIZZA
            // =========================

            Recipe pizza = recipeRepository.save(
                    new Recipe("Pizza", "Italian", 35, 3));

            ingredientRepository.save(new Ingredient("Pizza Dough", 1, "base", pizza));
            ingredientRepository.save(new Ingredient("Tomato Sauce", 100, "grams", pizza));
            ingredientRepository.save(new Ingredient("Mozzarella Cheese", 200, "grams", pizza));
            ingredientRepository.save(new Ingredient("Onion", 1, "piece", pizza));
            ingredientRepository.save(new Ingredient("Capsicum", 1, "piece", pizza));
            ingredientRepository.save(new Ingredient("Olives", 50, "grams", pizza));
            ingredientRepository.save(new Ingredient("Oregano", 1, "teaspoon", pizza));


            // =========================
            // 4. BIRYANI
            // =========================

            Recipe biryani = recipeRepository.save(
                    new Recipe("Chicken Biryani", "Indian", 60, 4));

            ingredientRepository.save(new Ingredient("Basmati Rice", 300, "grams", biryani));
            ingredientRepository.save(new Ingredient("Chicken", 500, "grams", biryani));
            ingredientRepository.save(new Ingredient("Onion", 2, "pieces", biryani));
            ingredientRepository.save(new Ingredient("Tomato", 2, "pieces", biryani));
            ingredientRepository.save(new Ingredient("Yogurt", 150, "grams", biryani));
            ingredientRepository.save(new Ingredient("Biryani Masala", 2, "tablespoons", biryani));
            ingredientRepository.save(new Ingredient("Mint Leaves", 15, "leaves", biryani));


            // =========================
            // 5. BURGER
            // =========================

            Recipe burger = recipeRepository.save(
                    new Recipe("Classic Burger", "American", 25, 2));

            ingredientRepository.save(new Ingredient("Burger Bun", 2, "pieces", burger));
            ingredientRepository.save(new Ingredient("Beef Patty", 2, "pieces", burger));
            ingredientRepository.save(new Ingredient("Cheese", 2, "slices", burger));
            ingredientRepository.save(new Ingredient("Lettuce", 50, "grams", burger));
            ingredientRepository.save(new Ingredient("Tomato", 1, "piece", burger));
            ingredientRepository.save(new Ingredient("Onion", 1, "piece", burger));
            ingredientRepository.save(new Ingredient("Mayonnaise", 2, "tablespoons", burger));


            // =========================
            // 6. FRIED RICE
            // =========================

            Recipe friedRice = recipeRepository.save(
                    new Recipe("Vegetable Fried Rice", "Chinese", 25, 2));

            ingredientRepository.save(new Ingredient("Rice", 250, "grams", friedRice));
            ingredientRepository.save(new Ingredient("Carrot", 1, "piece", friedRice));
            ingredientRepository.save(new Ingredient("Capsicum", 1, "piece", friedRice));
            ingredientRepository.save(new Ingredient("Green Peas", 100, "grams", friedRice));
            ingredientRepository.save(new Ingredient("Spring Onion", 2, "pieces", friedRice));
            ingredientRepository.save(new Ingredient("Soy Sauce", 2, "tablespoons", friedRice));
            ingredientRepository.save(new Ingredient("Garlic", 3, "cloves", friedRice));


            // =========================
            // 7. TACOS
            // =========================

            Recipe tacos = recipeRepository.save(
                    new Recipe("Chicken Tacos", "Mexican", 30, 3));

            ingredientRepository.save(new Ingredient("Tortilla", 6, "pieces", tacos));
            ingredientRepository.save(new Ingredient("Chicken", 300, "grams", tacos));
            ingredientRepository.save(new Ingredient("Tomato", 2, "pieces", tacos));
            ingredientRepository.save(new Ingredient("Lettuce", 100, "grams", tacos));
            ingredientRepository.save(new Ingredient("Cheese", 100, "grams", tacos));
            ingredientRepository.save(new Ingredient("Onion", 1, "piece", tacos));
            ingredientRepository.save(new Ingredient("Sour Cream", 100, "grams", tacos));


            // =========================
            // 8. PANCAKES
            // =========================

            Recipe pancakes = recipeRepository.save(
                    new Recipe("Pancakes", "American", 20, 4));

            ingredientRepository.save(new Ingredient("Flour", 200, "grams", pancakes));
            ingredientRepository.save(new Ingredient("Milk", 250, "ml", pancakes));
            ingredientRepository.save(new Ingredient("Eggs", 2, "pieces", pancakes));
            ingredientRepository.save(new Ingredient("Sugar", 2, "tablespoons", pancakes));
            ingredientRepository.save(new Ingredient("Butter", 2, "tablespoons", pancakes));
            ingredientRepository.save(new Ingredient("Baking Powder", 1, "teaspoon", pancakes));
            ingredientRepository.save(new Ingredient("Maple Syrup", 3, "tablespoons", pancakes));


            // =========================
            // 9. RAMEN
            // =========================

            Recipe ramen = recipeRepository.save(
                    new Recipe("Chicken Ramen", "Japanese", 45, 2));

            ingredientRepository.save(new Ingredient("Ramen Noodles", 200, "grams", ramen));
            ingredientRepository.save(new Ingredient("Chicken", 200, "grams", ramen));
            ingredientRepository.save(new Ingredient("Eggs", 2, "pieces", ramen));
            ingredientRepository.save(new Ingredient("Spring Onion", 2, "pieces", ramen));
            ingredientRepository.save(new Ingredient("Mushrooms", 100, "grams", ramen));
            ingredientRepository.save(new Ingredient("Soy Sauce", 2, "tablespoons", ramen));
            ingredientRepository.save(new Ingredient("Chicken Stock", 500, "ml", ramen));


            // =========================
            // 10. GREEK SALAD
            // =========================

            Recipe salad = recipeRepository.save(
                    new Recipe("Greek Salad", "Greek", 15, 2));

            ingredientRepository.save(new Ingredient("Cucumber", 1, "piece", salad));
            ingredientRepository.save(new Ingredient("Tomato", 2, "pieces", salad));
            ingredientRepository.save(new Ingredient("Feta Cheese", 100, "grams", salad));
            ingredientRepository.save(new Ingredient("Olives", 50, "grams", salad));
            ingredientRepository.save(new Ingredient("Onion", 1, "piece", salad));
            ingredientRepository.save(new Ingredient("Olive Oil", 2, "tablespoons", salad));
            ingredientRepository.save(new Ingredient("Oregano", 1, "teaspoon", salad));


            System.out.println("======================================");
            System.out.println("DATA SEEDING COMPLETED");
            System.out.println("10 recipes created");
            System.out.println("70 ingredients created");
            System.out.println("======================================");
        };
    }
}