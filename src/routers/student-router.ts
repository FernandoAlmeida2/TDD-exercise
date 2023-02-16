import {
  getStudents,
  pickStudent,
  postStudent,
} from "../controllers/student-controller";
import { Router } from "express";

const studentRouter = Router();

studentRouter
  .get("/students", getStudents)
  .get("/students/pick", pickStudent)
  .post("/students", postStudent);

export default studentRouter;
