export interface Item {
    id: string;
    name: string;
    categoryId: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}