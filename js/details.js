const params = new URLSearchParams(window.location.search);
const id = params.get("id");

//retourner les resultats de la recette dans le DOM
getRecipeById(id).then((recipe) => {
    // Remplir les resultats avec les details de la recette
    document.querySelector(".titre-recette").textContent = recipe.name;
    document.querySelector(".image-recette").innerHTML = `<img src="${recipe.image}" alt="${recipe.name}">`;
    document.querySelector(".description").textContent = `Prep Time: ${recipe.prepTimeMinutes} minutes | Cook Time: ${recipe.cookTimeMinutes} minutes | Servings: ${recipe.servings} | Difficulty: ${recipe.difficulty} | Cuisine: ${recipe.cuisine} | Calories per Serving: ${recipe.caloriesPerServing}`;
    document.querySelector(".ingredient-recette").textContent = `Ingredients: ${recipe.ingredients.join(", ")}`;
    document.querySelector(".instructions-recette").textContent = `Instructions: ${recipe.instructions.join(" ")}`;
    document.querySelector(".tags").textContent = `Tags: ${recipe.tags.join(", ")}`
});

// gestion du favoris
const btnFav = document.querySelector(".fav");

function updateFavButton() {
  const icon = btnFav.querySelector(".icon-fav");
  const text = btnFav.querySelector(".text");

  if (isFavorite(id)) {
    icon.src = "./assets/heart-solid-full.svg";
  } else {
    icon.src = "./assets/heart-regular-full.svg";
  }
}

// afficher état initial
updateFavButton();

// clic
btnFav.addEventListener("click", () => {
  toggleFavorite(id);

  updateFavButton();
})