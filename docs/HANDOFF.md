# Handoff de Desarrollo a DevOps

## Producto

**TasteMatch 1.0.0**

## Responsable de Desarrollo

Equipo TasteMatch Development

## Situación

La versión 1.0.0 ha superado las pruebas del equipo de Desarrollo.

En los equipos de Desarrollo la aplicación se ejecuta con:

```bash
npm install
npm test
npm start
```

## Requisitos conocidos

| Requisito | Valor |
|---|---|
| Runtime | Node.js >= 22 |
| Gestor de paquetes | npm |
| Puerto por defecto | 3000 |
| Health check | `/health` |
| Persistencia | No |
| Base de datos | No en v1.0.0 |

## Objetivo solicitado a DevOps

Queremos que la aplicación pueda ejecutarse de forma **reproducible** fuera del equipo de Desarrollo.

No se ha definido todavía cómo debe resolverse.

## Criterios de aceptación de la entrega

- Los tests siguen funcionando.
- La aplicación puede arrancar.
- `/health` devuelve HTTP 200.
- Otro entorno debe poder ejecutar la misma versión con el menor número posible de pasos manuales.
