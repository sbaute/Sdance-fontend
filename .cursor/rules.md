# 🧠 Reglas Frontend - Angular

## 🏗️ Arquitectura
- Usar arquitectura basada en features (feature-based structure)
- Separar por módulos o carpetas funcionales (students, auth, etc.)
- Mantener separación entre:
  - components (UI)
  - services (lógica y HTTP)
  - models (interfaces)
- Evitar estructuras planas o desordenadas

## 🧩 Componentes
- Componentes pequeños y reutilizables
- Separar:
  - componentes presentacionales (UI)
  - componentes contenedores (lógica)
- No poner lógica compleja en el HTML
- Evitar código duplicado

## 🧠 TypeScript
- Tipar TODO (no usar `any`)
- Usar interfaces o types para modelos
- Nombres claros y en inglés
- Métodos cortos y claros

## 📡 HTTP / API
- Centralizar llamadas HTTP en services
- NO hacer llamadas HTTP en componentes directamente
- Usar environment para URLs base
- Manejar errores con catchError

## 🔐 Autenticación (JWT)
- Usar interceptor para agregar token automáticamente
- No manejar tokens manualmente en cada request
- Manejar expiración de sesión

## ⚠️ Manejo de errores
- Manejar errores globalmente (interceptor o servicio)
- Mostrar mensajes amigables al usuario
- No hacer console.log innecesarios

## 🧾 Formularios
- Usar Reactive Forms
- Validar formularios correctamente
- NO usar atributo disabled en HTML (usar TS)
- Centralizar validaciones

## 🔄 Estado y lógica
- Mantener lógica en servicios, no en componentes
- Evitar lógica duplicada entre componentes

## 🎨 UI / Estilos
- Mantener consistencia visual
- Usar clases reutilizables
- Evitar estilos inline

## 📁 Organización
- Agrupar por features:
  - /students
  - /auth
  - /shared
- Tener carpeta shared para:
  - componentes reutilizables
  - pipes
  - utilidades

## 🔁 RxJS
- Usar operadores correctamente (map, switchMap, catchError)
- Evitar suscripciones innecesarias
- Desuscribirse cuando sea necesario

## 🚫 Evitar
- Uso de `any`
- Lógica en templates HTML
- HTTP directo en componentes
- Componentes gigantes
- Código duplicado

## ✅ Buenas prácticas generales
- Código limpio y mantenible
- Explicar lógica compleja si no es obvia
- Priorizar claridad sobre “magia”
- Mantener consistencia en todo el proyecto