import express from "express";
import { validateBody } from "../../../shared/middlewares/validateBody.js";
import CreateUserSchema from "../schemas/CreateUserSchema.js";
import AuthenticateUserSchema from "../schemas/AuthenticateUserSchema.js";
import { makeCreateUserController } from "../factories/makeCreateUserController.js";
import { makeGetUserController } from "../factories/makeGetUserController.js";
import { makeAuthenticateUserController } from "../factories/makeAuthenticateUserController.js";

const router = express.Router();

router.post(
    "/",
    validateBody(CreateUserSchema),
    makeCreateUserController().handle,
);
router.get("/", makeGetUserController().handle);
router.post(
    "/login",
    validateBody(AuthenticateUserSchema),
    makeAuthenticateUserController().handle,
);

export default router;
