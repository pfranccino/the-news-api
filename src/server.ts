import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

// Importar nuestros módulos
import { NewsService } from './services/news.service';
import { NewsController } from './controllers/news.controller';
import { createNewsRoutes } from './routes/news.routes';
import { createCategoryRoutes } from './routes/category.routes';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thenews';
const API_NAME = process.env.API_NAME || 'The News API2';

// Variable global para la conexión a la base de datos
let database: Db;

// ===== MIDDLEWARE =====
app.use(helmet()); // Seguridad HTTP headers
app.use(cors()); // Permitir requests cross-origin
app.use(express.json()); // Parsear JSON
app.use(express.urlencoded({ extended: true })); // Parsear form data

// ===== RUTAS DE SISTEMA =====

// Health check - Para verificar que la API funciona
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    api: API_NAME,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0',
    database: database ? 'connected' : 'disconnected'
  });
});

// Ruta principal - Información de la API
app.get('/', (req, res) => {
  res.json({ 
    message: `${API_NAME} funcionando! 📰`,
    version: '1.0.0',
    status: 'Ready for development',
    database: database ? 'MongoDB connected ✅' : 'MongoDB disconnected ❌',
    endpoints: {
      health: 'GET /health',
      news: {
        getAll: 'GET /api/news',
        create: 'POST /api/news'
      }
    },
    architecture: 'Modular (models → services → controllers → routes)'
  });
});

// ===== CONEXIÓN A MONGODB =====
async function connectToMongo(): Promise<MongoClient | null> {
  try {
    console.log('🔌 Conectando a MongoDB...');
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    database = client.db('thenews');
    
    // Verificar conexión
    await database.admin().ping();
    console.log('✅ Conectado a MongoDB exitosamente');
    
    return client;
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    console.log('⚠️ La API funcionará pero sin base de datos');
    return null;
  }
}

// ===== CONFIGURAR RUTAS =====
function setupRoutes(): void {
  if (!database) {
    console.log('⚠️ Base de datos no disponible, rutas de noticias deshabilitadas');
    return;
  }

  // Crear instancias de nuestros módulos
  const newsService = new NewsService(database);
  const newsController = new NewsController(newsService);
  const categoryService = new CategoryService(database);
  const categoryController = new CategoryController(categoryService)
  
  // Registrar rutas de noticias
  const newsRoutes = createNewsRoutes(newsController);
  const categoryRoutes = createCategoryRoutes(categoryController);
  app.use('/api/news', newsRoutes);
  app.use('/api/categories', categoryRoutes);
  
  console.log('📰 Rutas de noticias configuradas exitosamente');
}

// ===== INICIAR SERVIDOR =====
async function startServer() {
  // Conectar a MongoDB
  await connectToMongo();
  
  // Configurar rutas si la DB está disponible
  setupRoutes();
  
  // Iniciar servidor
  app.listen(PORT, () => {
    console.log('');
    console.log('🚀 ====================================');
    console.log(`   ${API_NAME} corriendo en puerto ${PORT}`);
    console.log('🚀 ====================================');
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV}`);
    console.log(`📊 Base de datos: ${database ? 'Conectada ✅' : 'Desconectada ❌'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`📋 API Info: http://localhost:${PORT}/`);
    if (database) {
      console.log(`📰 Crear noticia: POST http://localhost:${PORT}/api/news`);
      console.log(`📰 Ver noticias: GET http://localhost:${PORT}/api/news`);
    }
    console.log('🏗️ Arquitectura: Modular (models → services → controllers → routes)');
    console.log('');
  });
}

// Iniciar la aplicación
startServer().catch(console.error);