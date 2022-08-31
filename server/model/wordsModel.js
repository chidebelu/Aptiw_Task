import mongoose from "mongoose";

const wordModel = mongoose.Schema(
  {
    word: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Word = mongoose.model('Word', wordModel);

export default Word