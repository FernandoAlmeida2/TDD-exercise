import { Student } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import Joi from "joi";
import { UnprocessableEntity } from "../services/errors";
import studentService from "../services/student-services";

export async function getStudents(req: Request, res: Response) {
  try {
    const students = await studentService.getStudents();

    res.status(httpStatus.OK).send(students);
  } catch (error) {
    if (error.name === "NotFoundError") {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function pickStudent(req: Request, res: Response) {
  try {
    const student = await studentService.pickStudent();

    res.status(httpStatus.OK).send(student);
  } catch (error) {
    if (error.name === "NotFoundError") {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postStudent(req: Request, res: Response) {
  try {
    const { error } = Joi.object({ name: Joi.string().required() }).validate(
      req.body
    );
    if (error) {
      throw UnprocessableEntity();
    }

    const student = await studentService.postStudent(req.body.name);

    res.status(httpStatus.CREATED).send(student);
  } catch (error) {
    if (error.name === "UnprocessableEntity") {
      res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
      return;
    }
    if (error.name === "DuplicatedNameError") {
      res.sendStatus(httpStatus.CONFLICT);
      return;
    }
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
