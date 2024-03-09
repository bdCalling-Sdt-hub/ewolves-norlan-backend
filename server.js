const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const userRoute = require("./routes/user.route");
const sliderRoute = require("./routes/slider.route");
const categoryRoute = require("./routes/category.routes");
const subscriptionRoute = require("./routes/subscription.routes");
const aboutRoute = require("./routes/about.routes");
const privacyRoute = require("./routes/privacy.routes");
const termsRoute = require("./routes/terms.routes");
const gigRouter = require("./routes/gig.route");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const dbConnection = require("./config/db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const dbUrl = process.env.DB_URL;
dbConnection(dbUrl);

app.use("/api/auth/", userRoute);
app.use("/api/", sliderRoute);
app.use("/api/", categoryRoute);
app.use("/api/", subscriptionRoute);
app.use("/api/about/", aboutRoute);
app.use("/api/privacy/", privacyRoute);
app.use("/api/gig/", gigRouter);
app.use("/api/terms-and-condition/", termsRoute);

//image get
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    message: "hello",
  });
});

const server = app.listen(port, "192.168.10.16", () => {
  console.log(`server running in ${port}`);
  console.log("ok all right everything");
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    // credentials: true,
  },
});

// Socket.IO
io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);
});

//global error handler
app.use(globalErrorHandler);
