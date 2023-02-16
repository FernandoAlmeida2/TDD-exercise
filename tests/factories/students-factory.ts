import prisma from "../../src/config/database";
import { faker } from "@faker-js/faker";

export async function createStudent() {
  const data = generateStudent();
  return prisma.student.create({ data });
}

export function generateStudent() {
  return {
    name: faker.name.fullName()
  }
}