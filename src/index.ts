import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import path from "path";

require("dotenv").config();

const app = express();

app.use(cors({ credentials: true }));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// Serve static files (HLS segments and playlists)
app.use("/videos", express.static(path.join(__dirname, "videos")));

// Endpoint to serve the master playlist
app.get("/stream", (req, res) => {
  res.sendFile(path.join(__dirname, "videos", "outputs", "index.m3u8"));
});

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

const start: Function = async (): Promise<void> => {
  try {
    server.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("some server error occured");
    console.log(error);
  }
};
start();
