import * as dotenv from "dotenv";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const user = process.env["MONGODB_USERNAME"];
        const pass = process.env["MONGODB_PASSWORD"];
        const url = process.env["MONGODB_URL"] || "localhost";
        const port = process.env["MONGODB_PORT"] || "localhost";
        const dbName = process.env["MONGODB_DATABASE"] || "test";

        const uri = `mongodb://${user}:${pass}@${url}:${port}`;

        await mongoose.connect(uri, {
            dbName,
        });
        console.log(`MongoDB ${url}:${port} conectado com sucesso ao banco ${dbName}`);
        
    } catch (error) {
        console.error(error);
        
    }
};
