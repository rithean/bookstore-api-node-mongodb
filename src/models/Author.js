const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    bio: {
      type: String,
      required: false,
    },
    birthdate: {
      type: Date,
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
    versionKey: false,
    timestamps: false,
  }
);

authorSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

authorSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

authorSchema.pre("updateOne", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

authorSchema.pre("findByIdAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model("Author", authorSchema);
