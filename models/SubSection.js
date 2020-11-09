const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  articles: {
    type: Array,
  },
});

module.exports = model("SubSection", schema);
