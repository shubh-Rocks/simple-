import express from "express";

const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "ok",
    success: true,
  });
});

app.listen(3000, () => {
  console.log("server is running in port:3000");
});
