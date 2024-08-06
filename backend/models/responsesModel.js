const mongoose = require('mongoose');
// const responseschema = new mongoose.Schema({
//     index: {
//       type: Number,
//       required: true,
//     },
//     value: {
//       type: String,
//       required: true,
//     },
//   });
const responseSchema = new mongoose.Schema(
  {
    form: {
    type: mongoose.Schema.ObjectId,
    ref: "form",
    required: [true, "Response must belong to a form"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    responses:{
      type: [mongoose.Schema.Types.Mixed], 
      default: [] 
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Responses = mongoose.model('Responses', responseSchema);
module.exports = Responses;
