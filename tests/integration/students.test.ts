import app from "../../src/app";
import prisma from "../../src/config/database";
import httpStatus from "http-status";
import supertest from "supertest";
import { createStudent, generateStudent } from "../factories/students-factory";

const api = supertest(app);

beforeEach(async () => {
  await prisma.student.deleteMany();
});

describe("GET /students", () => {
  it("should return all students", async () => {
    await createStudent();
    await createStudent();

    const result = await api.get("/students");
    const { status, body } = result;
    expect(status).toBe(httpStatus.OK);
    expect(body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String)
      })
    ]))
  })

  it("should return a student", async () => {
    await createStudent();

    const result = await api.get("/students/pick");
    const { status, body } = result;
    expect(status).toBe(httpStatus.OK);
    expect(body).toEqual({
      id: expect.any(Number),
      name: expect.any(String)
    })
  });

  it("should return 404 with no students are registered", async () => {
    const result = await api.get("/students/pick");
    const { status, body } = result;

    expect(status).toBe(httpStatus.NOT_FOUND);
  });

  it("should return 404 with no students are registered", async () => {
    const result = await api.get("/students");
    const { status } = result;

    expect(status).toBe(httpStatus.NOT_FOUND);
  });
});

describe("POST /students", () => {
  it("should create a student", async () => {
    const body = generateStudent();
    const result = await api.post("/students").send(body);
    const { status } = result;

    expect(status).toBe(httpStatus.CREATED);
    const student = await prisma.student.findFirst({
      where: {
        name: body.name
      }
    });

    expect(student).toEqual({
      id: expect.any(Number),
      name: body.name
    })
  });

  it("should return 409 when trying to create two students with the same name", async () => {
    const student = await createStudent();
    const { status } = await api.post("/students").send({ name: student.name });
    expect(status).toBe(httpStatus.CONFLICT);
  })

  it("should return 422 when trying to create a student with data missing", async () => {
    const { status } = await api.post("/students").send({});
    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  })
})