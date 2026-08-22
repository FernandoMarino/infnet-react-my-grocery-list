import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import { app } from "../../../../shared/__test__/helpers/testApp.js";

describe("CreateUserController (Integration)", () => {
    test("should create a user and return 201 with success message", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({
                name: "John Supertest",
                email: "supertest@example.com",
                password: "password123",
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "User Created Successfully");
        expect(response.body.user).toHaveProperty("id");
        expect(response.body.user.name).toBe("John Supertest");
        expect(response.body.user.email).toBe("supertest@example.com");
        expect(response.body.user).not.toHaveProperty("passwordHash");
    });
});
