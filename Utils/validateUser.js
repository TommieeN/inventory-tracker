const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validateUser = (inputData) => {
  const errors = {};
  if (
    !inputData.name ||
    typeof inputData.name !== "string" ||
    inputData.name.trim().length === 0
  ) {
    errors.name = "Name is required and cannot be empty";
  }

  if (
    !inputData.email ||
    typeof inputData.email !== "string" ||
    !emailRegex.test(inputData.email) ||
    inputData.email.trim().length === 0
  ) {
    errors.email = "A valid email is required";
  }

  if (
    !inputData.password ||
    typeof inputData.password !== "string" ||
    inputData.password.trim().length === 0
  ) {
    errors.password = "Password is required and cannot be empty";
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

module.exports = { validateUser };