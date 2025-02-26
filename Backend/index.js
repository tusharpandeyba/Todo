const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");  // ✅ Import cors
const connectDB = require("./config/database");
const authRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());  // ✅ Enable CORS for all origins

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
