// Configura JWT_SECRET antes de importar qualquer modulo que dependa de authConfig
process.env['JWT_SECRET'] = "test_jwt_secret_value_for_testing_only_1234567890";

import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import { app } from "../../../../shared/__test__/helpers/testApp.js";

describe("AuthenticateUserController (Integration)", () => {
    test("should authenticate the user and return 200 with token and user info", async () => {
        const email = "login_test@example.com";
        const password = "password123";

        // Cria o usuário para poder realizar o login
        await request(app)
            .post("/api/users")
            .send({
                name: "Login User",
                email,
                password,
            });

        // Realiza a chamada de login
        const response = await request(app)
            .post("/api/users/login")
            .send({
                email,
                password,
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(response.body.user.email).toBe(email);
        expect(response.body.user).not.toHaveProperty("passwordHash");
    });
});
