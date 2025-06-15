import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thenews';
const API_NAME = process.env.API_NAME || 'The News API';

// Variable global para la conexión a la base de datos
let database: Db;

// ===== MIDDLEWARE =====
app.use(helmet()); // Seguridad HTTP headers
app.use(cors()); // Permitir requests cross-origin
app.use(express.json()); // Parsear JSON
app.use(express.urlencoded({ extended: true })); // Parsear form data

// ===== RUTAS BÁSICAS =====

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
    message: `${API_NAME} funcionand! 📰`,
    version: '1.0.0',
    status: 'Ready for development',
    database: database ? 'MongoDB connected ✅' : 'MongoDB disconnected ❌',
    nextSteps: [
      'Crear endpoint POST /api/news',
      'Crear endpoint GET /api/news', 
      'Agregar validaciones',
      'Implementar filtros y paginación'
    ]
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
    // No hacer exit para que puedas ver la API funcionando
    return null;
  }
}

// ===== INICIAR SERVIDOR =====
async function startServer() {
  await connectToMongo();
  
  app.listen(PORT, () => {
    console.log(`🚀 ${API_NAME} corriendo en puerto ${PORT}`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV}`);
    console.log(`📰 API lista para desarrollo!`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`📋 Info de la API: http://localhost:${PORT}/`);
    console.log('');
    console.log('💡 Próximo paso: Agregar endpoints de noticias');
  });
}

// Iniciar la aplicación
startServer().catch(console.error);