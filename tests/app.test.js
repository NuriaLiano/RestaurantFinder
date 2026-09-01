import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";

async function startTestServer() {
  const app = createApp();

  const server = await new Promise((resolve) => {
    const instance = app.listen(0, "127.0.0.1", () => resolve(instance));
  });

  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  return {
    baseUrl,
    close: () =>
      new Promise((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve()))
      )
  };
}

test("GET /health devuelve estado UP", async () => {
  const server = await startTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, "UP");
    assert.equal(body.service, "tastematch");
    assert.equal(body.version, "1.0.0");
  } finally {
    await server.close();
  }
});

test("GET /api/recommendations devuelve restaurante compatible", async () => {
  const server = await startTestServer();

  try {
    const response = await fetch(
      `${server.baseUrl}/api/recommendations?cuisine=italiana&price=2`
    );
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.recommendation.cuisine, "italiana");
    assert.equal(body.recommendation.price, 2);
  } finally {
    await server.close();
  }
});

test("GET /api/recommendations valida los parámetros", async () => {
  const server = await startTestServer();

  try {
    const response = await fetch(
      `${server.baseUrl}/api/recommendations?cuisine=italiana`
    );

    assert.equal(response.status, 400);
  } finally {
    await server.close();
  }
});

test("GET /api/recommendations devuelve 404 si no hay coincidencias", async () => {
  const server = await startTestServer();

  try {
    const response = await fetch(
      `${server.baseUrl}/api/recommendations?cuisine=italiana&price=1`
    );

    assert.equal(response.status, 404);
  } finally {
    await server.close();
  }
});
