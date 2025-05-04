const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

genreSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

genreSchema.pre("findOneAndUpdate", function (next) {
  this.set({
    updatedAt: Date.now(),
  });
  next();
});

genreSchema.pre("updateOne", function (next) {
  this.set({
    updatedAt: Date.now(),
  });
  next();
});

genreSchema.pre("findByIdAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model("Genre", genreSchema);
