const express = require("express");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/user.route");
const sliderRoute = require("./routes/slider.route");
const categoryRoute = require("./routes/category.routes");
const subscriptionRoute = require("./routes/subscription.routes");
const aboutRoute = require("./routes/about.routes");
const privacyRoute = require("./routes/privacy.routes");
const termsRoute = require("./routes/terms.routes");
const gigRouter = require("./routes/gig.route");
const videoRouter = require("./routes/video.routes");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth/", userRoute);
app.use("/api/", sliderRoute);
app.use("/api/", categoryRoute);
app.use("/api/", subscriptionRoute);
app.use("/api/about/", aboutRoute);
app.use("/api/privacy/", privacyRoute);
app.use("/api/gig/", gigRouter);
app.use("/api/terms-and-condition/", termsRoute);
app.use("/api/video/", videoRouter);

//image get
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Happy to see you Dear!");
});

//global error handler
app.use(globalErrorHandler);

module.exports = app;
