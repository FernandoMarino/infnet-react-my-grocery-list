import { CreateShoppingListDTO } from "../dtos/CreateShoppingListDTO";
import { IShoppingItemDTO } from "../dtos/IShoppingItemDTO";
import { IShoppingListDTO } from "../dtos/IShoppingListDTO";
import { ShoppingListModel } from "../model/ShoppingListModel";
import { IShoppingListRepository } from "./IShoppingListRepository";

export class ShoppingListRepositoryMongoDB implements IShoppingListRepository {
    private toItemDTO(item: any): IShoppingItemDTO {
        return {
            _id: item._id.toString(),
            name: item.name,
            quantity: item.quantity,
            unitOfMeasure: item.unitOfMeasure,
            checked: item.checked,
        };
    }

    private toDTO(doc: any): IShoppingListDTO {
        return {
            _id: doc._id.toString(),
            userId: doc.userId.toString(),
            title: doc.title,
            items: (doc.items ?? []).map((item: any) => this.toItemDTO(item)),
        };
    }

    async createList(data: CreateShoppingListDTO): Promise<IShoppingListDTO> {
        const newList = new ShoppingListModel(data);
        await newList.save();

        return this.toDTO(newList);
    }

    async getLists(userId: string): Promise<IShoppingListDTO[]> {
        console.log("Repo", userId);

        const lists = await ShoppingListModel.find({ userId: userId }).lean();

        return lists.map((list) => this.toDTO(list));
    }

    async getListById(listId: string): Promise<IShoppingListDTO | null> {
        const list = await ShoppingListModel.findById(listId);

        return list ? this.toDTO(list) : null;
    }

    async deleteList(listId: string): Promise<IShoppingListDTO | null> {
        const deletedList = await ShoppingListModel.findByIdAndDelete(listId);

        return deletedList ? this.toDTO(deletedList) : null;
    }

    async insertItem(
        listId: string,
        item: IShoppingItemDTO,
    ): Promise<IShoppingListDTO | null> {
        const cleanName = item.name.trim();

        const updatedList = await ShoppingListModel.findOneAndUpdate(
            {
                _id: listId,
                "items.name": {
                    $not: new RegExp(`^${cleanName}`),
                },
            },
            { $push: { items: { ...item, name: cleanName } } },
            { returnDocument: "after" },
        ).lean();

        return updatedList ? this.toDTO(updatedList) : null;
    }

    async updateItem(
        listId: string,
        itemId: string,
        item: Partial<IShoppingItemDTO>,
    ): Promise<IShoppingItemDTO | null> {
        const updateFields: Record<string, unknown> = {};

        if (item.name !== undefined) updateFields["items.$.name"] = item.name;
        if (item.quantity !== undefined)
            updateFields["items.$.quantity"] = item.quantity;
        if (item.unitOfMeasure !== undefined)
            updateFields["items.$.unitOfMeasure"] = item.unitOfMeasure;
        if (item.checked !== undefined)
            updateFields["items.$.checked"] = item.checked;

        const updatedList = await ShoppingListModel.findOneAndUpdate(
            { _id: listId, "items._id": itemId },
            { $set: updateFields },
            { returnDocument: "after" },
        ).lean();

        if (!updatedList) return null;

        return (
            this.toDTO(updatedList).items?.find((i) => i._id === itemId) ?? null
        );
    }

    async getItems(listId: string): Promise<IShoppingItemDTO[]> {
        const list = await ShoppingListModel.findById(listId, {
            items: 1,
        }).lean();

        if (!list) return [];

        return list.items.map((item) => this.toItemDTO(item));
    }

    async removeItem(
        listId: string,
        itemId: string,
    ): Promise<IShoppingListDTO | null> {
        const updatedList = await ShoppingListModel.findOneAndUpdate(
            { _id: listId, "items._id": itemId },
            { $pull: { items: { _id: itemId } } },
            { returnDocument: "after" },
        ).lean();

        return updatedList ? this.toDTO(updatedList) : null;
    }

}
