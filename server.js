import express from "express"
import dotenv from "dotenv"
import connectDb from "./src/db/db.js";
dotenv.config();
import multer from "multer"
import uploadFile from "./src/service/storage.service.js";
import Post from "./src/models/post.model.js";
import cors from "cors"



const app=express();
connectDb();
app.use(cors())

app.use(express.json());
const upload=multer({storage:multer.memoryStorage()})


app.post("/create-post", upload.single("image"), async (req, res) => {
  try {
    const { caption } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload to ImageKit
    const result = await uploadFile(req.file.buffer);

    // ✅ SAVE TO MONGODB
    const post = await Post.create({
      caption,
      imageUrl: result.url
    });

    return res.status(201).json({
      message: "Post created successfully",
      post
    });
  } catch (error) {
    console.error("❌ ERROR:", error);
    return res.status(500).json({ error: "Upload failed" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts
    });
  } catch (error) {
    console.error("❌ ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch posts"
    });
  }
});




app.listen(3000,()=>{
    console.log("server started at the port 3000")
})