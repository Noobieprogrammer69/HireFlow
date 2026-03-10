require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const connectDB = require("./config/db")

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const jobRoutes = require("./routes/jobRoutes")
const applicationRoutes = require("./routes/applicationRoutes")
const savedJobRoutes = require("./routes/savedJobRoutes")
const analyticsRoutes = require("./routes/analyticsRoutes")
const chatRoutes = require("./routes/chatRoutes")

const app = express()
const fs = require("fs");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)

connectDB()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running")
})

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/jobs", jobRoutes)
app.use("/api/applications", applicationRoutes)
app.use("/api/save-jobs", savedJobRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use("/api/chat", chatRoutes)

const uploadsPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

const PORT = process.env.PORT || 5000

const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/Message");

const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://hireflow-frontend.onrender.com"
]

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

let onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("user_online", (userId) => {
    onlineUsers[userId] = socket.id;
    io.emit("online_users", Object.keys(onlineUsers));
  });

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send_message", async (data) => {
    const message = await Message.create({
      roomId: data.roomId,
      sender: data.sender,
      text: data.text,
    });

    io.to(data.roomId).emit("receive_message", message);

    io.to(data.roomId).emit("new_notification", {
      roomId: data.roomId,
      text: data.text,
    });
  });

  socket.on("disconnect", () => {
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    }

    io.emit("online_users", Object.keys(onlineUsers));
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
