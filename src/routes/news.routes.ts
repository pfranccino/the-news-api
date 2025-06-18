import { Router } from 'express';
import { NewsController } from '../controllers/news.controller';

export function createNewsRoutes(newsController: NewsController): Router {
  const router = Router();

  router.post('/', newsController.createNews);

  router.get('/', newsController.getAllNews);

  return router;
}