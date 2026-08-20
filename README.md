# Recipe Manager

A full-stack Recipe Management application built with React and Spring Boot.

The application allows users to explore recipes, search and filter recipes, view recipe details, manage ingredients, add cooking instructions, and perform create, update, and delete operations.

---

## Project Overview

Recipe Manager is designed to provide a simple and user-friendly way to manage and explore recipes.

Each recipe contains basic information such as its name, cuisine, preparation time, servings, ingredients, and cooking instructions.

The application follows a client-server architecture where the React frontend communicates with the Spring Boot backend through REST APIs.

---

## Features

### Home Page

- Landing page for the application
- Navigation to explore recipes
- Option to add a new recipe

### Explore Recipes

- View available recipes
- Search recipes by name
- Filter recipes by cuisine
- Pagination for recipe results

### Recipe Details

Users can view:

- Recipe name
- Cuisine
- Preparation time
- Number of servings
- Ingredients
- Ingredient quantities and units
- Step-by-step cooking instructions

### Add Recipe

Users can create a new recipe by providing:

- Recipe name
- Cuisine
- Preparation time
- Servings
- Multiple ingredients
- Cooking instructions

### Recipe Management

Users can:

- Create recipes
- View recipes
- Edit recipes
- Delete recipes

### Ingredient Management

Users can:

- Add ingredients while creating a recipe
- Add ingredients to an existing recipe
- Edit ingredients
- Delete ingredients
- View ingredients associated with a recipe

### Cooking Instructions

Recipes can contain step-by-step instructions for preparing the dish.

The instructions are displayed as numbered steps on the recipe details page.

---

## Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend

- Java
- Spring Boot
- Spring Data JPA
- REST APIs
- Jakarta Validation

### Testing

- JUnit 5
- Mockito

### Tools

- Git
- GitHub
- VS Code

---

## Project Architecture

The application follows a client-server architecture.

```text
                    +----------------------+
                    |      React.js        |
                    |      Frontend        |
                    +----------+-----------+
                               |
                               | REST API
                               |
                               v
                    +----------------------+
                    |    Spring Boot       |
                    |      Backend         |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |      Service Layer   |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |   Repository Layer   |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |      Database        |
                    +----------------------+

## Data Model

The application currently contains two main entities.

### Recipe

| Field | Type | Description |
|---|---|---|
| id | Long | Unique identifier |
| name | String | Name of the recipe |
| cuisine | String | Cuisine type |
| prepTime | Integer | Preparation time in minutes |
| servings | Integer | Number of servings |
| instructions | String | Step-by-step cooking instructions |

### Ingredient

| Field | Type | Description |
|---|---|---|
| id | Long | Unique identifier |
| name | String | Ingredient name |
| quantity | Integer | Required quantity |
| unit | String | Unit of measurement |
| recipe | Recipe | Recipe associated with the ingredient |

### Relationship

One recipe can have multiple ingredients.

```text
Recipe 1  ───────────  * Ingredient


## How to run

1. Run the Backend
cd backend
./mvnw spring-boot:run

2.Run the Frontend
Open another terminal:
cd frontend
npm install
npm run dev
