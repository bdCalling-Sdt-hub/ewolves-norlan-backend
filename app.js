const express = require("express");
const cors = require("cors");
const app = express();
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const { UserRoutes } = require("./routes/user.routes");
const { BannerRoutes } = require("./routes/banner.routes");
const { CategoryRoutes } = require("./routes/category.routes");
const { SubscriptionRoutes } = require("./routes/subscription.routes");
const { AboutRoutes } = require("./routes/about.routes");
const { PrivacyRoutes } = require("./routes/privacy.routes");
const { GigRoutes } = require("./routes/gig.routes");
const { HighlightRoutes } = require("./routes/highlight.routes");
const { TermsRoutes } = require("./routes/terms.routes");
const { VideoRoutes } = require("./routes/video.routes");
const { ChatRoutes } = require("./routes/chat.routes");
const { EventRoutes } = require("./routes/event.routes");
const { FaqRoutes } = require("./routes/faq.routes");
const { CommunityRoutes } = require("./routes/community.routes");
const { PaymentRoutes } = require("./routes/payment.routes");
const { NotificationRoutes } = require("./routes/notification.routes");
const { OrderRoutes } = require("./routes/order.routes");
const { SubCategoryRoutes } = require("./routes/subCategory.routes");

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", UserRoutes);
app.use("/api/banner", BannerRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api", SubscriptionRoutes);
app.use("/api/about", AboutRoutes);
app.use("/api/privacy", PrivacyRoutes);
app.use("/api/gig", GigRoutes);
app.use("/api/highlight", HighlightRoutes);
app.use("/api/terms-and-condition", TermsRoutes);
app.use("/api/video", VideoRoutes);
app.use("/api/chat", ChatRoutes);
app.use("/api/event", EventRoutes);
app.use("/api/faq", FaqRoutes);
app.use("/api/community", CommunityRoutes);
app.use("/api/payment", PaymentRoutes);
app.use("/api/notification", NotificationRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/subCategory", SubCategoryRoutes);

//image get
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Happy to see you Dear!");
});

//global error handler
app.use(globalErrorHandler);

module.exports = app;
