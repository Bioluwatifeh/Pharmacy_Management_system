exports.process = async (payment) => {
  return { status: 'ok', ...payment };
};
