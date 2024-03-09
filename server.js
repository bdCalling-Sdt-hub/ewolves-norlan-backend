const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000
const app = express()
const userRoute = require("./routes/user.route")
const sliderRoute = require("./routes/slider.route")
const categoryRoute = require("./routes/category.routes")
const subscriptionRoute = require("./routes/subscription.routes")
const aboutRoute = require("./routes/about.routes");
const privacyRoute = require("./routes/privacy.routes")
const dbconection = require("./config/dbconection")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dburl = process.env.DB_URL

dbconection(dburl)

app.use("/api/auth/", userRoute);
app.use("/api/", sliderRoute);
app.use("/api/", categoryRoute);
app.use("/api/", subscriptionRoute);
app.use("/api/about/", aboutRoute);
app.use("/api/privacy/", privacyRoute)


app.use('/upload/image', express.static(__dirname + '/upload/image/'));

app.get("/",(req,res)=>{
    res.json({
        "message":"hello"
    })
});



app.use((err, req, res, next) => {
    //console.error("error tushar",err.message);
    res.status(500).json({ message: err.message });
});



const server = app.listen(port,"192.168.10.102",() => {
    console.log(`server running in ${port}`)
    console.log("ok all right everything")
});

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173",
        // credentials: true,
    },
});


// Socket.IO
io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);
});