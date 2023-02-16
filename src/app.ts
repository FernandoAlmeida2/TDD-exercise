import express from "express";
import "express-async-errors";
import studentRouter from "./routers/student-router";

const app = express();
app.use(express.json());

app.use(studentRouter);

export default app;