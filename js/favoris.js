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
  const numId = Number(id);

  if (favorites.some((favId) => Number(favId) === numId)) {
    // retirer
    favorites = favorites.filter((favId) => Number(favId) !== numId);
  } else {
    // ajouter
    favorites.push(numId);
  }
  saveFavorites(favorites);
}

// vérifier si une recette est dans les favoris
function isFavorite(id) {
  const favorites = getFavorites();
  const numId = Number(id);
  return favorites.includes(numId);
}
