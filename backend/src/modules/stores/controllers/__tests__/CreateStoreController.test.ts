// Configura JWT_SECRET antes de importar qualquer modulo que dependa de authConfig
process.env['JWT_SECRET'] = "test_jwt_secret_value_for_testing_only_1234567890";

import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import { app } from "../../../../shared/__test__/helpers/testApp.js";

describe("CreateStoreController (Integration)", () => {
    test("should create a store and return 201 with store data", async () => {
        const email = "store_owner@example.com";
        const password = "password123";

        // 1. Cadastra o usuário dono da loja
        await request(app)
            .post("/api/users")
            .send({
                name: "Store Owner",
                email,
                password,
            });

        // 2. Realiza o login para obter o Token JWT
        const authResponse = await request(app)
            .post("/api/users/login")
            .send({
                email,
                password,
            });

        const token = authResponse.body.token;

        // 3. Cria a loja passando o cabeçalho de autorização
        const response = await request(app)
            .post("/api/stores")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Supermercado Zona Sul",
                googlePlaceId: "google-place-id-123",
                address: "Avenida Atlântica, 100",
                city: "Rio de Janeiro",
                province: "RJ",
                postalCode: "22021-001",
                country: "Brasil",
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Store Created Successfully");
        expect(response.body.store).toHaveProperty("id");
        expect(response.body.store.name).toBe("Supermercado Zona Sul");
        expect(response.body.store.city).toBe("Rio de Janeiro");
    });
});
