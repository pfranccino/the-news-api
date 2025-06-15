```markdown
# The News API 📰

> API REST para gestión de noticias desarrollada con Node.js, TypeScript y MongoDB.

## 🚀 Características

- ✅ **Arquitectura modular**: Separación clara entre models, services, controllers y routes
- ✅ **TypeScript**: Tipado estático para mayor robustez
- ✅ **MongoDB**: Base de datos NoSQL sin ORM
- ✅ **Docker/Podman**: Desarrollo en contenedores
- ✅ **Hot Reload**: Desarrollo ágil con nodemon
- ✅ **Express 5.x**: Framework web moderno

## 🏗️ Arquitectura

```
src/
├── models/           # Tipos e interfaces TypeScript
│   ├── entities/     # Entidades principales (News, User, Category)
│   ├── requests/     # DTOs para requests
│   └── responses/    # DTOs para responses
├── services/         # Lógica de base de datos
├── controllers/      # Manejo de requests HTTP
├── routes/           # Definición de endpoints
└── server.ts         # Configuración del servidor
```

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | 22 LTS | Runtime |
| TypeScript | 5.7+ | Lenguaje |
| Express.js | 5.x | Framework web |
| MongoDB | 7+ | Base de datos |
| Podman | Latest | Contenedores |
| Axios | 1.7+ | Cliente HTTP |
| Seneca | 3.x | Microservicios |

## 📋 Requisitos

- **Opción 1**: Node.js 22+ y MongoDB 7+
- **Opción 2**: Podman/Docker

## 🚀 Instalación y uso

### 🐳 Con Podman (Recomendado - PC limpio)

```bash
# Clonar repositorio
git clone https://github.com/pfranccino/the-news-api.git
cd the-news-api

# Levantar servicios
cd docker
podman-compose up --build
```

### 💻 Desarrollo local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar en desarrollo
npm run dev
```

## 🌐 API Endpoints

### 🔧 Sistema
- `GET /` - Información de la API
- `GET /health` - Health check

### 📰 Noticias
- `GET /api/news` - Listar noticias (con filtros y paginación)
- `POST /api/news` - Crear nueva noticia
- `GET /api/news/:id` - Obtener noticia por ID
- `PUT /api/news/:id` - Actualizar noticia
- `DELETE /api/news/:id` - Eliminar noticia
- `GET /api/news/slug/:slug` - Obtener por slug
- `GET /api/news/categories` - Obtener categorías
- `GET /api/news/stats` - Estadísticas generales

## 📊 Servicios en desarrollo

Una vez ejecutando, accede a:

- 🌐 **API**: http://localhost:3000
- 🗄️ **MongoDB UI**: http://localhost:8081 (admin/admin)
- ✅ **Health Check**: http://localhost:3000/health

## ⚡ Scripts disponibles

```bash
npm run dev          # Desarrollo con hot reload
npm run build        # Compilar TypeScript
npm run start        # Ejecutar versión compilada
npm run docker:dev   # Levantar con Podman
npm run docker:down  # Parar contenedores
npm run docker:logs  # Ver logs de la API
```

## 🔐 Variables de entorno

```bash
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://mongo:27017/thenews
API_NAME=The News API
API_VERSION=1.0.0
```

## 🧪 Ejemplos de uso

### Crear una noticia
```bash
curl -X POST http://localhost:3000/api/news \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi primera noticia",
    "content": "Contenido de la noticia con arquitectura modular...",
    "author": "Francisco",
    "category": "Tecnología",
    "tags": ["nodejs", "typescript", "api"]
  }'
```

### Listar noticias con filtros
```bash
curl "http://localhost:3000/api/news?limit=5&category=Tecnología&published=true"
```

### Obtener estadísticas
```bash
curl http://localhost:3000/api/news/stats
```

## 🏛️ Principios de arquitectura

Este proyecto implementa **Clean Architecture** con:

- 📋 **Models**: Contratos y tipos TypeScript
- 🔧 **Services**: Lógica de negocio y acceso a datos
- 🎮 **Controllers**: Manejo de HTTP requests/responses
- 🛣️ **Routes**: Configuración de endpoints REST

### Flujo de datos
```
Request → Route → Controller → Service → MongoDB → Response
```

## 🎯 Características técnicas

- 🔒 **Type Safety**: 100% TypeScript
- 📦 **Modular**: Fácil de escalar y mantener
- 🚀 **Performance**: Consultas optimizadas con MongoDB
- 🔍 **Búsqueda**: Text search en título y contenido
- 📄 **Paginación**: Límites y offsets configurables
- 📊 **Estadísticas**: Métricas en tiempo real
- 🏷️ **SEO**: URLs amigables con slugs

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## ✨ Autor

**[Paul Franccino Ayala (@pfranccino)](https://github.com/pfranccino)**

---

⭐ **¡Dale una estrella si te gusta el proyecto!** ⭐
```
