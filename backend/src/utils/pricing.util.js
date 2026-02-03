exports.calculatePrice = (items) => {
  return items.reduce((acc, i) => acc + (i.price || 0) * (i.qty || 1), 0);
};
