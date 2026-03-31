//meme fonctionnement que index.js mais
//avec un chargement initial différent (filtrer les recettes pour n'afficher que les favoris)

let allRecipes = [];
let filteredRecipes = [];

// Au chargement du DOM, on charge les recettes et on setup les interactions
document.addEventListener("DOMContentLoaded", async () => {
  await loadRecipes();
});

//charge les recettes depuis l'API et affiche la grille
async function loadRecipes() {
  try {
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";

    const fetchRecipes = await getAllRecipes();
    allRecipes = [];
    //on ne garde que les recettes qui sont dans les favoris
    fetchRecipes.forEach((r) => {
      if (isFavorite(r.id)) {
        allRecipes.push(r);
      }
    });

    filteredRecipes = [...allRecipes];
    renderGrid();
  } catch (error) {
    console.error("Erreur lors du chargement des recettes :", error);
  }
}

// Affiche les recettes dans la grille en fonction du tableau filtré
function renderGrid() {
  const grid = document.getElementById("recipes-grid");
  const count = document.getElementById("results-count");

  if (!grid) return;

  if (filteredRecipes.length === 0) {
    if (count) count.textContent = "Aucun favori trouvé";
    grid.innerHTML = "<p>Aucun favori.</p>";
    return;
  }

  if (count) {
    count.innerHTML = `<strong>${filteredRecipes.length}</strong> favoris`;
  }

  let gridHTML = "";
  filteredRecipes.forEach((recipe) => {
    gridHTML += buildCard(recipe);
  });
  grid.innerHTML = gridHTML;

  grid.querySelectorAll(".btn-fav").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      let id = Number(btn.getAttribute("data-id"));

      if (typeof toggleFavorite === "function") {
        toggleFavorite(id);
        allRecipes = allRecipes.filter((r) => r.id !== id);
        applyFilters();
      }
    });
  });
}

// Construit le HTML d'une carte de recette à partir des données de la recette
function buildCard(recipe) {
  const totalTime =
    (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);
  const tags =
    recipe.tags && Array.isArray(recipe.tags) ? recipe.tags.join(", ") : "";

  return `
    <article class="recipe-card">
      <a href="details.html?id=${recipe.id}">
        <div class="card-image-wrap">
          <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
        </div>
      </a>
      <a href="details.html?id=${recipe.id}" class="card-body">
        <h3 class="card-title">${recipe.name}</h3>
        <p class="card-desc">${tags}</p>
        <div class="card-meta">
          <span class="meta-item"> ${totalTime} min</span>
          <span class="meta-item"> ${recipe.servings} pers.</span>
          <span class="meta-item"> ${recipe.difficulty}</span>
          <span class="card-rating">
            <span class="stars">★</span> ${recipe.rating}
          </span>
        </div>
      </a>
      <div class="card-footer">
        <a href="details.html?id=${recipe.id}" class="btn-voir">Voir la recette →</a>
      </div>
    </article>`;
}

// Applique le filtre de recherche
function applyFilters() {
  const input = document.getElementById("search-input");
  const searchQuery = input ? input.value.trim().toLowerCase() : "";

  filteredRecipes = allRecipes.filter((r) => {
    if (searchQuery !== "") {
      const inName = r.name && r.name.toLowerCase().includes(searchQuery);
      const inTags =
        r.tags && r.tags.join(" ").toLowerCase().includes(searchQuery);
      const inCuisine =
        r.cuisine && r.cuisine.toLowerCase().includes(searchQuery);
      if (!inName && !inTags && !inCuisine) return false;
    }
    return true;
  });

  renderGrid();
}

const input = document.getElementById("search-input");
if (input) {
  input.addEventListener("input", () => applyFilters());
}
