import studentRepository from "../repositories/students-repository";
import { duplicatedNameError, notFoundError } from "./errors";

async function getStudents() {
  const students = await studentRepository.findMany();
  if (students.length === 0) {
    throw notFoundError();
  }
  return students;
}

async function pickStudent() {
  const student = await studentRepository.findFirst();
  if (!student) {
    throw notFoundError();
  }

  return student;
}

async function postStudent(name: string) {
  const alreadyExists = await studentRepository.findByName(name);
  if (alreadyExists) {
    throw duplicatedNameError();
  }

  await studentRepository.createStudent(name);
}

const studentService = {
  getStudents,
  pickStudent,
  postStudent,
};

export default studentService;
