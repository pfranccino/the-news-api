import { Router } from 'express';
import { NewsController } from '../controllers/news.controller';

export function createNewsRoutes(newsController: NewsController): Router {
  const router = Router();

  // POST /api/news - Crear noticia
  router.post('/', newsController.createNews);

  // GET /api/news - Obtener todas las noticias
  router.get('/', newsController.getAllNews);

  return router;
}