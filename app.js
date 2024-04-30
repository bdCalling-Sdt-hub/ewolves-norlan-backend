const express = require("express");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/user.routes");
const bannerRoute = require("./routes/banner.routes");
const categoryRoute = require("./routes/category.routes");
const subscriptionRoute = require("./routes/subscription.routes");
const aboutRoute = require("./routes/about.routes");
const privacyRoute = require("./routes/privacy.routes");
const termsRoute = require("./routes/terms.routes");
const gigRouter = require("./routes/gig.routes");
const videoRouter = require("./routes/video.routes");
const dealRouter = require("./routes/deal.routes");
const chatRouter = require("./routes/chat.routes");
const highlightRouter = require("./routes/highlight.routes");
const eventRouter = require("./routes/event.routes");
const fagRouter = require("./routes/faq.routes");
const communityRoutes = require("./routes/community.routes");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const paymentRoutes = require("./routes/payment.routes");

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", userRoute);
app.use("/api/banner", bannerRoute);
app.use("/api/category/", categoryRoute);
app.use("/api", subscriptionRoute);
app.use("/api/about", aboutRoute);
app.use("/api/privacy", privacyRoute);
app.use("/api/gig", gigRouter);
app.use("/api/highlight", highlightRouter);
app.use("/api/terms-and-condition/", termsRoute);
app.use("/api/video/", videoRouter);
app.use("/api/deal/", dealRouter);
app.use("/api/terms-and-condition", termsRoute);
app.use("/api/video", videoRouter);
app.use("/api/chat/", chatRouter);
app.use("/api/event/", eventRouter);
app.use("/api/faq/", fagRouter);
app.use("/api/community", communityRoutes);
app.use("/api/payment", paymentRoutes);

//image get
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Happy to see you Dear!");
});

//global error handler
app.use(globalErrorHandler);

module.exports = app;
