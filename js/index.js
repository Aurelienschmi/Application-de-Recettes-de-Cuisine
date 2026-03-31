let allRecipes = [];
let filteredRecipes = [];
let isLoading = true;

// Au chargement du DOM, on charge les recettes et on setup les interactions
document.addEventListener("DOMContentLoaded", async () => {
  isLoading = true;
  await loadRecipes();
  setupSearch();
  setupFilters();
  isLoading = false;
});

//charge les recettes depuis l'API et affiche la grille
async function loadRecipes() {
  try {
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";
    ["filter-category", "filter-difficulty", "filter-time"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.selectedIndex = 0;
    });

    allRecipes = await getAllRecipes();
    filteredRecipes = [...allRecipes];
    populateFilters();
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
    if (count) count.textContent = "Aucune recette trouvée";
    grid.innerHTML = "<p>Aucune recette.</p>";
    return;
  }

  if (count) {
    count.innerHTML = `<strong>${filteredRecipes.length}</strong> recettes`;
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
      btn.classList.toggle("active");
      if (typeof updateFavCounter === "function") {
        updateFavCounter();
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
      <a href="detail.html?id=${recipe.id}">
        <div class="card-image-wrap">
          <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
          <br><span class="card-category">${recipe.cuisine || "Cuisine"}</span>
          <button class="btn-fav" data-id="${recipe.id}" title="Ajouter aux favoris"></button>
        </div>
      </a>
      <a href="detail.html?id=${recipe.id}" class="card-body">
        <h3 class="card-title">${recipe.name}</h3>
        <p class="card-desc">${tags}</p>
        <div class="card-meta">
          <span class="meta-item">${totalTime} min</span>
          <span class="meta-item">${recipe.servings} pers.</span>
          <span class="meta-item">${recipe.difficulty}</span>
          <span class="card-rating">
            <span class="stars">★</span> ${recipe.rating}
          </span>
        </div>
      </a>
      <div class="card-footer">
        <a href="detail.html?id=${recipe.id}" class="btn-voir">Voir la recette →</a>
      </div>
    </article>`;
}
//setup de la recherche
function setupSearch() {
  const input = document.getElementById("search-input");
  if (!input) return;
  input.addEventListener("input", () => applyFilters());
}

//setup des filtres de sélection
function setupFilters() {
  ["filter-category", "filter-difficulty", "filter-time"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", () => applyFilters());
  });
}

// Remplit le select des catégories en fonction des recettes chargées
function populateFilters() {
  const catSel = document.getElementById("filter-category");
  if (!catSel) return;

  const categories = [];
  allRecipes.forEach((r) => {
    if (r.cuisine && !categories.includes(r.cuisine)) {
      categories.push(r.cuisine);
    }
  });
  categories.sort();

  while (catSel.options.length > 1) {
    catSel.remove(1);
  }

  categories.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    catSel.appendChild(opt);
  });
}

// Applique les filtres de recherche et de sélection
function applyFilters() {
  if (isLoading) return;

  const input = document.getElementById("search-input");
  const searchQuery = input ? input.value.trim().toLowerCase() : "";

  const cat = document.getElementById("filter-category")?.value || "";
  const diff = document.getElementById("filter-difficulty")?.value || "";
  const time = document.getElementById("filter-time")?.value || "";

  filteredRecipes = allRecipes.filter((r) => {
    if (searchQuery !== "") {
      const inName = r.name && r.name.toLowerCase().includes(searchQuery);
      const inTags =
        r.tags && r.tags.join(" ").toLowerCase().includes(searchQuery);
      const inCuisine =
        r.cuisine && r.cuisine.toLowerCase().includes(searchQuery);
      if (!inName && !inTags && !inCuisine) return false;
    }

    if (cat !== "" && r.cuisine !== cat) return false;
    if (diff !== "" && r.difficulty !== diff) return false;

    if (time !== "") {
      const totalTime = (r.prepTimeMinutes || 0) + (r.cookTimeMinutes || 0);
      if (time === "30" && totalTime > 30) return false;
      if (time === "60" && totalTime > 60) return false;
      if (time === "90" && totalTime > 90) return false;
    }

    return true;
  });

  renderGrid();
}
