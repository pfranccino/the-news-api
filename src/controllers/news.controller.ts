import { Request, Response } from 'express';
import { NewsService } from '../services/news.service';

export class NewsController {
 private newsService: NewsService;

 constructor(newsService: NewsService) {
   this.newsService = newsService;
 }

 createNews = async (req: Request, res: Response): Promise<void> => {
   try {
     // 1. Extraer datos del body
     const { title, content, author, category, tags } = req.body;
     
     // 2. Validación básica
     if (!title || !content) {
       res.status(400).json({
         success: false,
         error: "Título y contenido son requeridos"
       });
       return;
     }
     
     // 3. Llamar al service
     const newArticle = await this.newsService.createNews({
       title,
       content, 
       author,
       category,
       tags
     });
     
     // 4. Responder éxito
     res.status(201).json({
       success: true,
       data: newArticle,
       message: "Noticia creada exitosamente"
     });
     
   } catch (error) {
     console.error('Error creando noticia:', error);
     res.status(500).json({
       success: false,
       error: "Error interno del servidor"
     });
   }
 };

 getAllNews = async (req: Request, res: Response): Promise<void> => {
   try {
     // 1. Extraer query parameters
     const { limit, skip, category, author, published, search } = req.query;
     
     // 2. Llamar al service con filtros
     const { news, total } = await this.newsService.getAllNews({
       limit: limit ? Number(limit) : undefined,
       skip: skip ? Number(skip) : undefined,
       category: category as string,
       author: author as string,
       published: published ? published === 'true' : undefined,
       search: search as string
     });
     
     // 3. Responder con datos y paginación
     res.status(200).json({
       success: true,
       data: news,
       pagination: {
         total,
         count: news.length,
         limit: Number(limit) || 10,
         skip: Number(skip) || 0,
         hasMore: (Number(skip) || 0) + news.length < total
       }
     });
     
   } catch (error) {
     console.error('Error obteniendo noticias:', error);
     res.status(500).json({
       success: false,
       error: "Error interno del servidor"
     });
   }
 };
}