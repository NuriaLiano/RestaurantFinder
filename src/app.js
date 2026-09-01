import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import restaurants from "./data/restaurants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "..", "public")));

  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "UP",
      service: "tastematch",
      version: "1.0.0"
    });
  });

  app.get("/api/options", (_req, res) => {
    const cuisines = [...new Set(restaurants.map((restaurant) => restaurant.cuisine))]
      .sort();

    res.json({
      cuisines,
      prices: [
        { value: 1, label: "€" },
        { value: 2, label: "€€" },
        { value: 3, label: "€€€" }
      ]
    });
  });

  app.get("/api/recommendations", (req, res) => {
    const cuisine = String(req.query.cuisine ?? "").trim().toLowerCase();
    const price = Number(req.query.price);

    if (!cuisine || !Number.isInteger(price) || price < 1 || price > 3) {
      return res.status(400).json({
        error: "Debes indicar cuisine y price (1, 2 o 3)."
      });
    }

    const matches = restaurants.filter(
      (restaurant) =>
        restaurant.cuisine === cuisine && restaurant.price === price
    );

    if (matches.length === 0) {
      return res.status(404).json({
        error: "No tenemos una recomendación para esos filtros."
      });
    }

    // Elegimos uno de los compatibles para que la demo no devuelva siempre el mismo.
    const recommendation = matches[Math.floor(Math.random() * matches.length)];

    return res.json({
      recommendation,
      reason: `${recommendation.cuisine} · ${"€".repeat(recommendation.price)}`
    });
  });

  return app;
}
