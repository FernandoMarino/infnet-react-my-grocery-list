import express from "express"

import cors from "cors"
import morgan from "morgan"

const PORT: number = 3000;

const app = express();

app.use(express.json())
app.use(cors())
app.use(morgan("combined"))

app.listen(PORT, () => {
    console.log(`Dev server running at port ${PORT}`);    
})