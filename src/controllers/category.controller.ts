import { Request, Response } from "express";
import { CategoryService } from "@/services/category.service";
import { error } from "console";


export class  CategoryController {
    private categoryService : CategoryService;
    
    constructor(service : CategoryService){
        this.categoryService = service
    }

    createCategory = async(req : Request , resp : Response) : Promise<void> => {
        try {
            const {name, slug,description,color} = req.body

            if(!name){
                resp.status(400).json({
                    success : false,
                    error : 'Nombre y Slug son requeridos'
                })
                return;
            }

            const newCategory = await this.categoryService.createCategory({
                name,
                description,
                color
            });

            resp.status(201).json({
                success : true,
                data : newCategory,
                message : "Categoria creada exitosamente"
            })
        }catch (error){
            console.error("Error al crear una categoria",error)
            resp.status(500).json({
                success : false,
                error : "Error interno del servicio "
            })
        }
    }
}