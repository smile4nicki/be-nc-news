const mongoose = require("mongoose");
const { Schema } = mongoose;

const TopicSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    lowercase: true,
    required: false,
    unique: true
  }
});

module.exports = mongoose.model("topics", TopicSchema);
