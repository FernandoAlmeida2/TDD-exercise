import { ApplicationError } from "../protocols/applicationError";

export function duplicatedNameError(): ApplicationError {
  return {
    name: "DuplicatedNameError",
    message: "There is already a student with given name!",
  };
}

export function notFoundError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "There is no student registered!",
  };
}

export function UnprocessableEntity(): ApplicationError {
    return {
      name: "UnprocessableEntity",
      message: "Body invalid",
    };
  }