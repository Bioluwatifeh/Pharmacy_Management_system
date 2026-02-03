exports.getAll = async (req, res) => {
  res.json({ message: 'Return list of users' });
};

exports.getById = async (req, res) => {
  res.json({ message: `Return user ${req.params.id}` });
};
