const asyncHandler = require("express-async-handler");

const subscribeUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(404);
    throw new Error("Name and email are required");
  }

  res.status(200).json({ message: `Subscription successful for ` });
});
module.exports = { subscribeUser };
