import { SaveCategoryDTO } from "../dtos/SaveCategoryDTO";
import { Category } from "../interfaces/ICategory";

export abstract class ICategoryRepository {
    abstract saveCategory(data: SaveCategoryDTO): Promise<Category>;
    abstract findById(id: string): Promise<Category | null>;
    abstract findByName(name: string): Promise<Category | null>;
    abstract findByUserAndName(userId: string, name: string): Promise<Category | null>;
    abstract findByUser(userId: string): Promise<Category[]>;
    abstract updateCategoryName(categoryId: string, newName: string): Promise<Category>;
    abstract deleteCategory(categoryId: string): Promise<boolean>
}