# TasteMatch

TasteMatch es una pequeña aplicación web de recomendación de restaurantes.

> **Estado del proyecto:** Desarrollo ha terminado la versión `1.0.0` y entrega el código al equipo DevOps.

## Qué hace la aplicación

El usuario selecciona:

- un tipo de cocina;
- un rango de precio.

TasteMatch devuelve una recomendación de restaurante compatible con esas preferencias.

## Requisitos entregados por Desarrollo

- Node.js 22 o superior
- npm

## Puesta en marcha en el entorno de Desarrollo

```bash
npm install
npm test
npm start
```

La aplicación escucha por defecto en:

```text
http://localhost:3000
```

Se puede modificar el puerto mediante la variable de entorno:

```text
PORT
```

Ejemplo:

```bash
PORT=4000 npm start
```

## Endpoints

### Aplicación web

```text
GET /
```

### Health check

```text
GET /health
```

Ejemplo de respuesta:

```json
{
  "status": "UP",
  "service": "tastematch",
  "version": "1.0.0"
}
```

### API de recomendación

```text
GET /api/recommendations?cuisine=italiana&price=2
```

## Tests

```bash
npm test
```

## Información para Operaciones

La aplicación:

- no necesita base de datos en esta versión;
- no escribe datos persistentes en disco;
- utiliza el puerto `3000` por defecto;
- necesita Node.js 22;
- debe responder correctamente en `/health`.

La siguiente evolución funcional prevista añadirá persistencia de datos.

---

El equipo de Desarrollo considera terminada esta versión.
