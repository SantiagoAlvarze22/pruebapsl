const { Schema, model } = require('mongoose');
const userSchema = require('./user.model');

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    //ahora va a ser referencia al user pero todo el objeto
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

//trigger antes de eliminar la nota
noteSchema.pre('deleteOne', { document: true }, async function () {
  await userSchema.updateMany({ $pull: { note: this._id } });
});

module.exports = model('note', noteSchema);
