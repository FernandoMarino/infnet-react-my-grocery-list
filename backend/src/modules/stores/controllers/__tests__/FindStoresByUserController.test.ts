// Configura JWT_SECRET antes de importar qualquer modulo que dependa de authConfig
process.env['JWT_SECRET'] = "test_jwt_secret_value_for_testing_only_1234567890";

import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import { app } from "../../../../shared/__test__/helpers/testApp.js";

describe("FindStoresByUserController (Integration)", () => {
    test("should retrieve stores for a user and return 200", async () => {
        const email = "find_stores_user@example.com";
        const password = "password123";

        // 1. Cadastra o usuário
        await request(app)
            .post("/api/users")
            .send({
                name: "Find Stores User",
                email,
                password,
            });

        // 2. Faz login para obter o Token JWT
        const authResponse = await request(app)
            .post("/api/users/login")
            .send({
                email,
                password,
            });

        const token = authResponse.body.token;

        // 3. Cadastra uma loja vinculada ao usuário logado
        await request(app)
            .post("/api/stores")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Mercadinho Niterói",
                city: "Niterói",
            });

        // 4. Executa a requisição de busca das lojas do usuário
        const response = await request(app)
            .get("/api/stores")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Stores retrieved successfully");
        expect(response.body.stores).toBeInstanceOf(Array);
        expect(response.body.stores.length).toBeGreaterThan(0);
        expect(response.body.stores).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "Mercadinho Niterói",
                    city: "Niterói",
                }),
            ])
        );
    });
});
