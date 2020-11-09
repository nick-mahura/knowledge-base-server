const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subSectionId: {
    type: String,
    required: true,
  },
  links: {
    type: Array,
  },
});

module.exports = model("Article", schema);
