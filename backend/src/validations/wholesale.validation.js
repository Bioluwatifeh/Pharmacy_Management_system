exports.validateWholesale = (data) => {
  if (!data || !data.customerId) throw new Error('Invalid wholesale order');
  return true;
};
