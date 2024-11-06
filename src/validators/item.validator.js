
function validateItemsRequired(items) {
  if (!items || items.length === 0) {
    return 'items is required';
  }
  return null;
}

function validateItemsMaxLength(items) {
  if (items.length > 5) {
    return 'items must be a maximum of 5';
  }
  return null;
}

function validateItemsUnique(items) {
  const uniqueItems = new Set(items);
  if (uniqueItems.size !== items.length) {
    return 'items cannot be repeated';
  }
  return null;
}

function validateItems(items) {
  const errors = [];

  const requiredError = validateItemsRequired(items);
  if (requiredError) errors.push(requiredError);

  const maxLengthError = validateItemsMaxLength(items);
  if (maxLengthError) errors.push(maxLengthError);

  const uniqueError = validateItemsUnique(items);
  if (uniqueError) errors.push(uniqueError);

  return errors;
}
module.exports = {
  validateItems,
  validateItemsRequired,
  validateItemsMaxLength,
  validateItemsUnique,
};