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
/*
searchRecipes("chicken").then((recipes) => {
  console.log(recipes);
});
getRecipeById(5).then((recipe) => {
  console.log(recipe);
});*/

//resultat type getAllRecipes():
/* {
    id: 5,
    name: 'Mango Salsa Chicken',
    ingredients: [
      'Chicken thighs',
      'Mango, diced',
      'Red onion, finely chopped',
      'Cilantro, chopped',
      'Lime juice',
      'Jalapeño, minced',
      'Salt and pepper to taste',
      'Cooked rice for serving'
    ],
    instructions: [
      'Season chicken thighs with salt and pepper.',
      'Grill or bake chicken until fully cooked.',
      'In a bowl, combine diced mango, chopped red onion, cilantro, minced jalapeño, and lime juice.',
      'Dice the cooked chicken and mix it with the mango salsa.',
      'Serve over cooked rice.'
    ],
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    servings: 3,
    difficulty: 'Easy',
    cuisine: 'Mexican',
    caloriesPerServing: 380,
    tags: [ 'Chicken', 'Salsa' ],
    userId: 26,
    image: 'https://cdn.dummyjson.com/recipe-images/5.webp',
    rating: 4.9,
    reviewCount: 63,
    mealType: [ 'Dinner' ]
  },*/
