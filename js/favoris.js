// récupérer les favoris
function getFavorites() {
  const data = localStorage.getItem("favoris");
  if (!data) return [];
  return JSON.parse(data);
}

// sauvegarder les favoris
function saveFavorites(favoris) {
  localStorage.setItem("favoris", JSON.stringify(favoris));
}

// basculer favoris
function toggleFavorite(id) {
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    // retirer
    favorites = favorites.filter(favId => favId !== id);
  } else {
    // ajouter
    favorites.push(id);
  }
  saveFavorites(favorites);
}

// vérifier si une recette est dans les favoris
function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.includes(id);
}