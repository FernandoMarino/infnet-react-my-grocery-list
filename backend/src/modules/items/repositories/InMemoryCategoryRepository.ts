import { randomUUID } from "crypto";
import { SaveCategoryDTO } from "../dtos/SaveCategoryDTO";
import { Category } from "../entities/Category";
import { ICategoryRepository } from "./ICategoryRepository";

export class InMemoryCategoryRepository extends ICategoryRepository {

    private categories: Category[] = 
    [
    {
        id: "cat-produce-01",
        name: "Produce", // Hortifrúti (Frutas e Vegetais)
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "cat-dairy-02",
        name: "Dairy & Eggs", // Laticínios e Ovos
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "cat-bakery-03",
        name: "Bakery", // Padaria e Confeitaria
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "cat-meat-04",
        name: "Meat & Seafood", // Carnes e Frutos do Mar
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "cat-pantry-05",
        name: "Pantry", // Mercearia / Itens de Prateleira
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "cat-beverages-06",
        name: "Beverages", // Bebidas
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    ];

    async saveCategory(data: SaveCategoryDTO): Promise<Category> {

        const creationDate = new Date()

        const newCategory: Category = {
            id: randomUUID(),
            name: data.name,
            userId: data.userId ?? null,
            createdAt: creationDate,
            updatedAt: creationDate
        };

        this.categories.push(newCategory)

        return newCategory;
    }

    async findById(id: string): Promise<Category | null> {
        return this.categories.find(cat => cat.id === id) ?? null        
    }

    async findByName(name: string): Promise<Category | null> {
        return this.categories.find(cat => cat.name.toLowerCase() === name.toLowerCase() && cat.userId === null ) ?? null        
    }

    async findByUserAndName(userId: string, name: string): Promise<Category | null> {
        return this.categories.find(cat => cat.name.toLowerCase() === name.toLowerCase() && cat.userId === userId ) ?? null      
    }

    async findByUser(userId: string): Promise<Category[]> {
        return this.categories.filter(cat => cat.userId === userId || cat.userId === null)
    }

    async deleteCategory(categoryId: string): Promise<boolean> {
        const categoryIndex = this.categories.findIndex(cat => cat.id === categoryId)

        if (categoryIndex === -1) return false

        this.categories.splice(categoryIndex, 1)

        return true
    }

    async updateCategoryName(categoryId: string, newName: string): Promise<Category> {
        const updateDate = new Date()
        
        const category = this.categories.find(cat => cat.id === categoryId)!

        category.name = newName;
        category.updatedAt = updateDate;

        return category
    }
}