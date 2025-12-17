const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv").config();
const axios = require("axios");

const MAILER_LITE_URL = process.env.NODE_MAILER_LITE_URL;
const MAILER_LITE_GROUP_ID = process.env.NODE_MAILER_LITE_GROUP_ID;
const MAILER_LITE_TOKEN = process.env.NODE_MAILER_LITE_TOKEN;

const subscribeUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(404);
    throw new Error("Name and email are required");
  }

  const requestData = {
    email: email,
    fields: {
      name: name,
    },
    groups: [MAILER_LITE_GROUP_ID],
  };
  try {
    await axios.post(MAILER_LITE_URL, requestData, {
      headers: {
        Authorization: `Bearer ${MAILER_LITE_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.info("calling mailer lite");
    res.status(200).json({
      success: true,
      message: "User subscribed successfully",
    });
    console.info("response received from mailer lite");
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500);
    throw new Error("Subscription failed");
  }
});

module.exports = { subscribeUser };
