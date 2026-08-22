import { describe, expect, test } from "@jest/globals";
import { StoreService } from "../StoreService.js";
import { InMemoryStoreRepository } from "../../repositories/InMemoryStoreRepository.js";
import { InMemoryUserStoreRepository } from "../../repositories/InMemoryUserStoreRepository.js";
import { AppError } from "../../../../shared/errors/AppError.js";

describe("StoreService", () => {
    test("should be able to create a new store and associate it to a user", async () => {
        const storeRepository = new InMemoryStoreRepository();
        const userStoreRepository = new InMemoryUserStoreRepository();
        const storeService = new StoreService(storeRepository, userStoreRepository);

        const store = await storeService.createStore(
            {
                name: "My Awesome Grocery Store",
                googlePlaceId: "google-place-id-abc",
                address: "123 Main St",
                city: "Vancouver",
                province: "BC",
                postalCode: "V6B 2T4",
                country: "Canada",
            },
            "user-uuid-123"
        );

        expect(store).toHaveProperty("id");
        expect(store.name).toBe("My Awesome Grocery Store");

        // Verifica se a associação no repositório de junção foi criada
        const userStore = await userStoreRepository.findByUserAndStore("user-uuid-123", store.id);
        expect(userStore).not.toBeNull();
        expect(userStore?.userId).toBe("user-uuid-123");
        expect(userStore?.storeId).toBe(store.id);
    });

    test("should associate an existing store (by name) to a new user if it already exists", async () => {
        const storeRepository = new InMemoryStoreRepository();
        const userStoreRepository = new InMemoryUserStoreRepository();
        const storeService = new StoreService(storeRepository, userStoreRepository);

        // Pré-salva uma loja no repositório
        const existingStore = await storeRepository.saveStore({
            name: "Supermarket",
        });

        // Tenta criar uma loja com o mesmo nome para outro usuário
        const store = await storeService.createStore(
            { name: "Supermarket" },
            "another-user-uuid"
        );

        // Deve retornar a mesma loja existente, mas criar associação para o novo usuário
        expect(store.id).toBe(existingStore.id);

        const userStore = await userStoreRepository.findByUserAndStore("another-user-uuid", existingStore.id);
        expect(userStore).not.toBeNull();
    });

    test("should throw an AppError if trying to register a store that is already associated with the user", async () => {
        const storeRepository = new InMemoryStoreRepository();
        const userStoreRepository = new InMemoryUserStoreRepository();
        const storeService = new StoreService(storeRepository, userStoreRepository);

        // Cadastra uma loja
        const store = await storeService.createStore(
            { name: "Unique Store" },
            "user-1"
        );

        // Tenta cadastrar a mesma loja para o mesmo usuário de novo
        await expect(
            storeService.createStore({ name: "Unique Store" }, "user-1")
        ).rejects.toBeInstanceOf(AppError);

        try {
            await storeService.createStore({ name: "Unique Store" }, "user-1");
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            const appError = error as AppError;
            expect(appError.statusCode).toBe(409);
            expect(appError.message).toBe("Store already registered for this user");
        }
    });

    test("should return and list all stores registered for a specific user", async () => {
        const storeRepository = new InMemoryStoreRepository();
        const userStoreRepository = new InMemoryUserStoreRepository();
        const storeService = new StoreService(storeRepository, userStoreRepository);

        // Cadastra duas lojas para o usuario 1
        const store1 = await storeService.createStore({ name: "Store 1" }, "user-1");
        const store2 = await storeService.createStore({ name: "Store 2" }, "user-1");

        // Cadastra uma loja para o usuario 2
        await storeService.createStore({ name: "Store 3" }, "user-2");

        const user1Stores = await storeService.findStoresByUser("user-1");

        expect(user1Stores.length).toBe(2);
        expect(user1Stores).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: store1.id }),
                expect.objectContaining({ id: store2.id }),
            ])
        );
    });

    test("should throw AppError 404 when trying to list stores for a user with no registered stores", async () => {
        const storeRepository = new InMemoryStoreRepository();
        const userStoreRepository = new InMemoryUserStoreRepository();
        const storeService = new StoreService(storeRepository, userStoreRepository);

        await expect(
            storeService.findStoresByUser("user-with-no-stores")
        ).rejects.toBeInstanceOf(AppError);

        try {
            await storeService.findStoresByUser("user-with-no-stores");
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            const appError = error as AppError;
            expect(appError.statusCode).toBe(404);
            expect(appError.message).toBe("This user has no stores registered");
        }
    });

    test("should be able to delete a store association", async () => {
        const storeRepository = new InMemoryStoreRepository();
        const userStoreRepository = new InMemoryUserStoreRepository();
        const storeService = new StoreService(storeRepository, userStoreRepository);

        const store = await storeService.createStore({ name: "To Be Deleted Store" }, "user-1");

        const result = await storeService.deleteStoreService({
            userId: "user-1",
            storeId: store.id,
        });

        expect(result).toBe(true);

        // A associação deve ter sido deletada
        const userStore = await userStoreRepository.findByUserAndStore("user-1", store.id);
        expect(userStore).toBeNull();
    });

    test("should throw AppError 404 when trying to delete an association that does not exist", async () => {
        const storeRepository = new InMemoryStoreRepository();
        const userStoreRepository = new InMemoryUserStoreRepository();
        const storeService = new StoreService(storeRepository, userStoreRepository);

        await expect(
            storeService.deleteStoreService({
                userId: "user-1",
                storeId: "non-existent-store",
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    test("should be able to update store info if associated with the user", async () => {
        const storeRepository = new InMemoryStoreRepository();
        const userStoreRepository = new InMemoryUserStoreRepository();
        const storeService = new StoreService(storeRepository, userStoreRepository);

        const store = await storeService.createStore({ name: "Mercadinho do Bairro", city: "Rio de Janeiro" }, "user-1");

        const updatedStore = await storeService.updateStore({
            storeId: store.id,
            userId: "user-1",
            name: "Supermercado Guanabara",
            city: "Niterói",
        });

        expect(updatedStore.name).toBe("Supermercado Guanabara");
        expect(updatedStore.city).toBe("Niterói");
    });

    test("should throw AppError 404 when trying to update a store not associated with the user", async () => {
        const storeRepository = new InMemoryStoreRepository();
        const userStoreRepository = new InMemoryUserStoreRepository();
        const storeService = new StoreService(storeRepository, userStoreRepository);

        const store = await storeService.createStore({ name: "Some Store" }, "user-1");

        await expect(
            storeService.updateStore({
                storeId: store.id,
                userId: "user-2", // Usuário diferente
                name: "New Name",
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
