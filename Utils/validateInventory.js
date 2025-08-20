const validateInventory = (inputData) => {
  const errors = {};

  if (!inputData.name || inputData.name.trim().length === 0) {
    errors.name = "Please input a name for the product";
  }

  if (!inputData.category || inputData.category.trim().length === 0) {
    errors.category = "Please input a category for the product";
  }

  if (
    typeof inputData.quantity !== "number" ||
    inputData.quantity < 0
  ) {
    errors.quantity = "Please input a valid quantity";
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

module.exports = { validateInventory };
