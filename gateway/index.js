const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", proxy("http://localhost:8001"));
app.use("/books", proxy("http://localhost:8002"));
app.use("/sales", proxy("http://localhost:8003"));
app.use("/feedbacks", proxy("http://localhost:8004"));

app.use((req,res,next) => {
  return res.json({
    'message' : "API Gateway for Book Store Report"
  })
})
app.listen(8000, () => {
  console.log("Gateway is listening on port 8000");
});
