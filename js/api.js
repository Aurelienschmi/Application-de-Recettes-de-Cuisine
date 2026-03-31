//fonction vue dans le cours
async function getAllRecipes() {
  const res = await fetch("https://dummyjson.com/recipes?limit=50");
  const data = await res.json();
  return data.recipes;
}

//recherche toutes les recettes par mot-clé
async function searchRecipes(query) {
  const res = await fetch(
    `https://dummyjson.com/recipes/search?q=${encodeURIComponent(query)}`,
  );
  const data = await res.json();
  return data.recipes;
}

//recherche une recette par son id
async function getRecipeById(id) {
  const res = await fetch(`https://dummyjson.com/recipes/${id}`);
  return res.json();
}
