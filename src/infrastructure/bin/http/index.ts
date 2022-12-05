import express from "express";
import bodyParser from "body-parser";
import { shortUrlRouter } from "./routes";

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (_, res) => {
	res.status(200).send("v1.0.0");
});

app.use("/api/shorturl", shortUrlRouter);

app.listen(port, () => console.log(`Running on port ${port}`));
