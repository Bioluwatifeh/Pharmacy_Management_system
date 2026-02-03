exports.validateMedicine = (data) => {
  if (!data || !data.name) throw new Error('Invalid medicine');
  return true;
};
