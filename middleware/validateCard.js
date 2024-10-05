const { body, validationResult } = require("express-validator");
const Card = require("../models/card-schema.js"); // Adjust the path as necessary

const validateUpdateCard = [
  body().custom((_value, { req }) => {
    const cardSchemaFields = Object.keys(Card.schema.paths);
    const receivedFields = Object.keys(req.body);
    const invalidFields = receivedFields.filter(
      (field) => !cardSchemaFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new Error(`Invalid field(s): ${invalidFields.join(", ")}`);
    }
    return true;
  }),
  body("bank_name")
    .optional()
    .isString()
    .withMessage("Bank name must be a string"),
  body("card_number")
    .optional()
    .isString()
    .withMessage("Card number must be a string"),
  body("expiry_date")
    .optional()
    .isString()
    .withMessage("Expiry date must be a string"),
  body("phone_number")
    .optional()
    .isString()
    .withMessage("Phone number must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateUpdateCard;
