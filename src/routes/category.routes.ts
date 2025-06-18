import { Router } from "express";
import { CategoryController } from "@/controllers/category.controller";

export function createCategoryRoutes( controller : CategoryController) : Router {
    const router = Router();

    router.post('/' , controller.createCategory)

    return router;
}