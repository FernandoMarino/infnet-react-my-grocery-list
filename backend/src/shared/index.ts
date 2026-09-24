import app from "./server";
import { connectDB } from "./config/mongo_database";

const PORT: number = 3000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Dev server running at port ${PORT}`);
    });
}

startServer();
