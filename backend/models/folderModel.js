const mongoose = require('mongoose');
const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Folder can not be empty!'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, 'Folder must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Folder = mongoose.model('Folder', folderSchema);
module.exports = Folder;
