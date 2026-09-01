const form = document.querySelector("#recommendation-form");
const cuisineSelect = document.querySelector("#cuisine");
const pricesContainer = document.querySelector("#prices");
const result = document.querySelector("#result");
const serviceStatus = document.querySelector("#service-status");

async function loadOptions() {
  const response = await fetch("/api/options");
  const options = await response.json();

  for (const cuisine of options.cuisines) {
    const option = document.createElement("option");
    option.value = cuisine;
    option.textContent = cuisine.charAt(0).toUpperCase() + cuisine.slice(1);
    cuisineSelect.appendChild(option);
  }

  options.prices.forEach((price, index) => {
    const label = document.createElement("label");
    label.className = "price-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "price";
    input.value = String(price.value);
    input.required = true;
    input.checked = index === 1;

    const span = document.createElement("span");
    span.textContent = price.label;

    label.append(input, span);
    pricesContainer.appendChild(label);
  });
}

async function checkHealth() {
  try {
    const response = await fetch("/health");
    if (!response.ok) throw new Error();

    serviceStatus.textContent = "● Servicio operativo";
    serviceStatus.className = "status-up";
  } catch {
    serviceStatus.textContent = "● Servicio no disponible";
    serviceStatus.className = "status-down";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const cuisine = data.get("cuisine");
  const price = data.get("price");

  result.innerHTML = "<p class='placeholder'>Buscando una buena opción…</p>";

  try {
    const response = await fetch(
      `/api/recommendations?cuisine=${encodeURIComponent(cuisine)}&price=${encodeURIComponent(price)}`
    );

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error ?? "No se pudo obtener una recomendación.");
    }

    const restaurant = body.recommendation;

    result.innerHTML = `
      <article class="restaurant">
        <div class="restaurant-topline">
          <span class="badge">${body.reason}</span>
          <span class="rating">★ ${restaurant.rating}</span>
        </div>
        <h2>${restaurant.name}</h2>
        <p>${restaurant.description}</p>
        <small>Recomendación generada por TasteMatch</small>
      </article>
    `;
  } catch (error) {
    result.innerHTML = `
      <div class="error">
        <strong>No hemos encontrado una opción.</strong>
        <p>${error.message}</p>
      </div>
    `;
  }
});

await loadOptions();
await checkHealth();
