import express from "express";
import cors from "cors";

import parserRouter from "./routes/parser";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
	res.send("Hello world");
});

app.use("/parser", parserRouter);

app.listen(3000, () => {
	console.log("Server listening on port 3000");
});
