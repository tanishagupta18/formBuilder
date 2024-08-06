const mongoose = require("mongoose");
const contentschema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  input_type: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
});
const formSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Form can not be empty!"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "Folder must belong to a user"],
    },
    folder: {
      type: mongoose.Schema.ObjectId,
      ref: "Folder",
      default: null,
    },
    content: [contentschema],
    theme: {
      type: String,
      default: "light",
      enum: {
        values: ["light", "dark", "tat_blue"],
      },
    },
    responseCount: {
      type: Number,
      default:0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//Virtual Populate
formSchema.virtual('responses', {
  ref: 'Responses',
  foreignField: 'form',
  localField: '_id',
});
const Form = mongoose.model("Form", formSchema);
module.exports = Form;
