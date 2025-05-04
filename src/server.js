const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const conn = require("./config/db");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await conn();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server : ", error);
  }
};

startServer();
