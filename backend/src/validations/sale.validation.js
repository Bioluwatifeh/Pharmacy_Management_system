exports.validateSale = (data) => {
  // TODO: use a validation library like Joi
  if (!data || !Array.isArray(data.items)) throw new Error('Invalid sale');
  return true;
};
