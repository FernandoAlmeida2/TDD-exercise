import prisma from "../config/database";

async function findMany() {
  return prisma.student.findMany();
}

async function findFirst() {
  return prisma.student.findFirst();
}

async function findByName(name: string) {
  return prisma.student.findFirst({
    where: {
      name,
    },
  });
}

async function createStudent(name: string) {
  await prisma.student.create({
    data: {
      name,
    },
  });
}

const studentRepository = {
  findMany,
  findFirst,
  findByName,
  createStudent,
};

export default studentRepository;
