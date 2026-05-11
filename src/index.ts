import express, { Request, Response }  from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import mongoose, { ConnectOptions, MongooseOptions } from "mongoose";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";

import { prisma } from "./prisma";


import userAuthRoute from "./features/contributors/auth/auth.route";
import organizerAuthRoute from "./features/organizer/auth/auth.route";
import organizerCampaignRoute from "./features/organizer/campaign/campaign.route";

import AdminAuthRoute from "./features/admin/auth/auth.route";

// import { ISendMessageRequest } from "./shared/types/interfaces/requests/general/meassge.request";
// import { sendMessage } from "./shared/services/websocket/message.socket";


dotenv.config();


const router = express.Router();
const app = express();

// Create HTTP server
// const server = http.createServer(app);


// Initialize Socket.io
// const io = new SocketIOServer(server, {
//   cors: {
//     origin: "*", // Allow all origins
//     methods: ["GET", "POST"]
//   }
// });

// Make io accessible globally
// declare global {
//   var io: SocketIOServer;
// }
// global.io = io;



app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(
//     cors({
//       origin: "*",
//     })
// );

const allowedOrigins = [
  "http://localhost:3000", 
  "http://localhost:3001", ,
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // If cookies are used
  })
);

app.use("/api/v1/user", [userAuthRoute,]);
app.use("/api/v1/organizer", [organizerAuthRoute, organizerCampaignRoute]);
app.use("/api/v1/admin", [AdminAuthRoute]);



// io.on("connection", (socket) => {
//   console.log(`New client connected: ${socket.id}`);
  
//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log(`Client disconnected: ${socket.id}`);
//   });
  
//   // Example of a custom event
//   socket.on("send_message", async (data: ISendMessageRequest) => {
//     console.log(`Received message: ${data}`);
//     await sendMessage(data)
//   });
// });


// const MONGODB_URI = process.env.MONGODB_URI as string;
// (async () => {
//     try {
//       mongoose.connect(MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       } as ConnectOptions);
//       console.log("Connected To Database - Initial Connection");
//     } catch (err) {
//       console.log(
//         `Initial Distribution API Database connection error occurred -`,
//         err
//       );
//     }
// })();
  
app.use(
    "/",
    router.get("/", (req, res) => {
      res.json("Hello");
    })
);

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// server.listen(port, () => {
//   console.log(`🚀 Server is running on http://localhost:${port}`);
//   console.log(`🔌 WebSocket server is running`);
// });