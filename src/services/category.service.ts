import {Db , ObjectId} from 'mongodb';
import { 
  Category, 
  CategoryWithId, 
  CreateCategoryRequest, 
  UpdateCategoryRequest 
} from '../models';

export class CategoryService {
    private db : Db;
    private collection = "category";

    constructor(database : Db){
        this.db = database
    }

    async createCategory(categoryData : CreateCategoryRequest) : Promise<CategoryWithId>{

        const slug = this.generateSlug(categoryData.name)
        const existingCategory = await this.db.collection(this.collection).findOne({slug});

        if (existingCategory) {
            throw new Error(`Ya existe una categoría con el nombre "${categoryData.name}"`);
        }

        const category : Category = {
            name : categoryData.name.trim(),
            slug :  slug,
            description : categoryData.description?.trim(),
            color : categoryData?.color || '#6B7280',
            createdAt : new Date(),
            updatedAt : new Date()
        };

        const result = await this.db.collection(this.collection).insertOne(category)

        return {
            _id :result.insertedId,
            ...category
        };
    }

    async getAllCategories() : Promise<CategoryWithId[]>{
        const categories = await this.db.collection(this.collection)
        .find({})
        .sort({name : 1})
        .toArray() as CategoryWithId[];

        return categories
    }
    
    private generateSlug(text: string): string {
    return text
    .toLowerCase()                    
    .normalize('NFD')                 
    .replace(/[\u0300-\u036f]/g, '')  
    .replace(/[^a-z0-9\s-]/g, '')     
    .trim()                           
    .replace(/\s+/g, '-')             
    .replace(/-+/g, '-')              
    .replace(/^-|-$/g, '');           
}
}