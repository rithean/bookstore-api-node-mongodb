const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");
const authorRoutes = require("./routes/author.routes");
const genreRoutes = require("./routes/genre.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
